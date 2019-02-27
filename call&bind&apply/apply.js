Function.prototype.myApply = function () {
    var ctx = arguments[0] || window;
    var args = [...arguments].slice(1)[0];
    var obj = Object(ctx);
    obj.fn = this;
    obj.fn(...args);
    delete obj.fn;
}
function Parent(a,b,c){
    this.a = a;
    this.b = b;
    this.c = c;
}

function Child(a,b,c,d){
    Parent.myApply(null,[a,b,c]);
    this.d = d;
}

var child = new Child(1,2,3,4);
console.log(child);//{a: 1, b: 2, c: 3, d: 4}