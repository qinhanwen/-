let books = ['JavaScript','Node'];
function * read(books) {
    for (let i = 0; i < books.length; i++) { 
        yield books[i];
    }
}
let it = read(books);
let it1 = it.next();
console.log(it1);
let it2 = it.next();
console.log(it2);
let it3 = it.next();
console.log(it3);