function _ajax(proxy = {}) {
  window._ahrealxhr = XMLHttpRequest;
  XMLHttpRequest = function() {
    this.xhr = new window._ahrealxhr();

    // TODO  这步遍历的目的是什么？
    for (var attr in this.xhr) {
      var type = '';
      try {
        type = typeof this.xhr[attr];
      } catch (e) {
        console.log(e);
      }
      if (type === 'function') {
        this[attr] = hookfun(attr);
      } else {
        Object.defineProperty(this, attr, {
          get: getFactory(attr),
          set: setFactory(attr)
        });
      }
    }
  };

  /**
   *
   * @param {*} fun
   */
  function hookfun(fun) {
    return function() {
      // 比如当你调用 xmlHttp.open 的时候，
      var args = [].slice.call(arguments);

      // 如果 proxy 存在 open 的时候，直接调用，当返回值为 true 的时候，可以不去调用 xhr 上的 open 方法
      if (proxy[fun] && proxy[fun].call(this, args, this.xhr)) {
        return;
      }

      // 如果上面返回值不为 true，就去调用 xmlHttp.open 方法
      return this.xhr[fun].apply(this.xhr, args);
    };
  }

  /**
   *
   * @param {*} attr
   */
  function getFactory(attr) {
    return function() {
      // 这里是劫持你的取值操作，比如你取 xmlHttp.readyState 的时候
      var v = this.hasOwnProperty(attr + '_')
        ? this[attr + '_']
        : this.xhr[attr];

      // 这里去取 proxy 是否设置了取某个值的回调
      var attrGetterHook = (proxy[attr] || {})['getter'];

      // 如果设置了取某个值的回调，可以调用来改变它的值，否则返回原值
      return (attrGetterHook && attrGetterHook(v, this)) || v;
    };
  }

  /**
   *
   * @param {*} attr
   */
  function setFactory(attr) {
    return function(v) {
      // 这个方法被触发的时候，是设置值的时候，比如  xmlHttp.onreadystatechange = xxx
      var xhr = this.xhr;
      var that = this;
      var hook = proxy[attr];
      if (typeof hook === 'function') {
        // 如果 proxy 里设置了这个方法
        xhr[attr] = function() {
          // 在调用这个属性的方法的时候，会先触发你 proxy 设置的， 然后再调用业务自己设置的 v 回调，也就是  xmlHttp.onreadystatechange = xxx 里的 xxx
          proxy[attr](that) || v.apply(xhr, arguments);
        };
      } else {
        // 走到这里说明不是方法，比如设置 xmlHttp.withCredentials = true 的时候，
        var attrSetterHook = (hook || {})['setter'];
        v = (attrSetterHook && attrSetterHook(v, that)) || v;
        try {
          // 就直接帮我们设置 xhr.withCredentials = true
          xhr[attr] = v;
        } catch (e) {
          this[attr + '_'] = v;
        }
      }
    };
  }
}

_ajax({
  onreadystatechange: function(xhr) {
    if (xhr.readyState === 4) {
      console.log('调用了重写的onreadystatechange');
    }
  },
  open: function() {
    console.log('调用open');
  }
});
