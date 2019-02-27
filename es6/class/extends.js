class Parent{
    constructor(name){
        this.name = name
    }
    getName(){
        console.log(this.name);
    }
	static getAge(){//私有属性
    }
}

class Child extends Parent{
    constructor(name,age){
        super(name);
        this.age = age;
    }
    getAge(){
        console.log(this.age);
    }
}

var child = new Child('qinhanwen',25);
child.getName();

