// Array.prototype.filter = function (cb, ctx) {
//     if (typeof cb !== 'function') throw new Error(cb + ' is not a function');
//     var newArray = [];
//     var len = this.length;
//     for (var i = 0; i < len; i++) {
//         var item = this[i];
//         if (cb.call(ctx, item, i, this)) {
//             newArray.push(item);
//         }
//     }
//     return newArray;
// }

var arr = [1, 2, 3];
var obj = {
    arr1: []
}
var newArr = arr.filter(function (item, index, array) {
    array[index] = 0;
    this.arr1.push(item);
    return item > 2;
}, obj);
console.log(newArr);

