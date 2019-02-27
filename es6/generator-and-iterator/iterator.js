let books = ['JavaScript','Node'];
function read(books){
    let index = 0;
    return {
        next(){
            return index<books.length?{value:books[index++],done:false}:{value:undefined,done:true}
        },
    }
}
let it = read(books);
let it1 = it.next();
console.log(it1);
let it2 = it.next();
console.log(it2);
let it3 = it.next();
console.log(it3);