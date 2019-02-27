"use strict";

var _createClass = function () {
    function defineProperties(target, props) {//这个方法做的事情，其实就是在Constructor上绑定原型链的属性，和私有属性
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {//为了保证调用方式是以构造函数方式调用
        throw new TypeError("Cannot call a class as a function");
    }
}

var Parent = function () {
    function Parent(name) {
        _classCallCheck(this, Parent);

        this.name = name;
    }

    _createClass(Parent, [{
        key: "getName",
        value: function getName() {
            console.log(this.name);
        }
    }]);

    return Parent;
}();