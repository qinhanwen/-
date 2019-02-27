var obj = {
    name: 'qinhanwen',
    getName(){
        console.log('name1'+this.name);
    }
}
var obj1 = {
    name:'啦啦啦',
    __proto__:obj,
    getName(){
        console.log('name2'+this.name);
        super.getName();
    }
};
obj1.getName();