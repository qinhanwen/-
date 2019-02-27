function getFood(){
    console.log(this.food)
}
var cat = {
    food:'fish'
}

var getFood1 = getFood.bind();
getFood1();//fish
console.log(cat);//{ food: 'fish' }