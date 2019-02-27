// Array.prototype.forEach = function (cb, ctx) {
//     if (typeof cb !== 'function') throw new Error(cb + ' is not a function');
//     var len = this.length;
//     for (var i = 0; i < len; i++) {
//         cb.call(ctx, this[i], i, this);
//     }
// }

var arr = [1, 2, 3];
var obj = {
    arr1: []
}
arr.forEach(function (item, index, array) {
    // array[index] = 0;
    item = 1;
    this.arr1.push(item);
}, obj);
console.log(arr);
console.log(obj);

