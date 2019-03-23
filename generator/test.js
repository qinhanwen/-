var arr = [1,2,3];
function *test(){
    yield* arr
    yield 5
}
var g = test();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());