import { observable, autorun, action } from 'mobx';

var person = observable({
  // 可观察的属性
  name: 'John',
  age: 42,
  showAge: false,

  // 计算后的属性
  get labelText() {
    return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
  },

  // action
  setAge: action(function(age) {
    this.age = age;
  })
});
// autorun 函数是来运行状态后更新后引发的 reaction
autorun(() => console.log(person['labelText']));

person.name = 'Dave';
// 输出: 'Dave'
