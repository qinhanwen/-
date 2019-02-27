Array.prototype.reduce = function (cb, initialValue) {
    if (typeof cb !== 'function') throw new Error(cb + ' is not a function');
    var total = initialValue || 0;
    var len = this.length;
    for (var i = 0; i < len; i++) { 
       total = cb.call(null,total,this[i],i,this);
    }
    return total;
}

var arr = [1, 2, 3];
var totalNum = arr.reduce(function (total, currentValue, index, arr) {
    console.log(total);
    console.log(currentValue);
    console.log(index);
    console.log(arr);
    return total + currentValue;
}, 1)
console.log(totalNum);