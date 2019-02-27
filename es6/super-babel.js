'use strict';

var _obj;

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};

var obj = {
    name: 'qinhanwen',
    getName: function getName() {
        console.log('name1' + this.name);
    }
};
var obj1 = _obj = {
    name: '啦啦啦',
    __proto__: obj,
    getName: function getName() {
        console.log('name2' + this.name);
        _get(_obj.__proto__ || Object.getPrototypeOf(_obj), 'getName', this).call(this);
    }
};