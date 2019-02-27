Function.prototype.myBind = function () {
    var ctx = arguments[0] || window;
    var fn = this;
    return function () {
        ctx.fn = fn;
        ctx.fn();
        delete ctx.fn;
    }
}
function getFood(){
    console.log(this.food)
}
var cat = {
    food:'fish'
}

var getFood1 = getFood.bind();
getFood1();//fish
console.log(cat);//{ food: 'fish' }