Object.prototype.setPrototypeOf = function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
}
var obj = {
    name: 'qinhanwen',
    age: 25
}
var obj1 = {};
var obj2 = Object.setPrototypeOf(obj1, obj);
console.log(obj1);//{}
console.log(obj1.name, obj1.age);//qinhanwen 25
console.log(obj2.name, obj2.age);//qinhanwen 25