Array.prototype.map = function (cb, ctx) {
    if (typeof cb !== 'function') throw new Error(cb + ' is not a function');
    var newArray = [];
    var len = this.length;
    for (var i = 0; i < len; i++) {
        var result = cb.call(ctx, this[i], i, this);
        newArray[i] = result;
    }
    return newArray;
}

var arr = [1, 2, 3];
var obj = {
    arr1: []
}
var newArr = arr.map(function (item, index, array) {
    item = 1;
    this.arr1.push(item);
    return item * 2;
}, obj);
console.log(arr);
console.log(obj);
console.log(newArr);

