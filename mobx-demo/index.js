const { observable, autorun, action } = require("mobx");

var person = observable({
  // 可观察的属性
  name: "John",

  // 计算后的属性
  get labelText() {
    return this.name;
  }
});
// autorun 函数是来运行状态后更新后引发的 reaction
autorun(() => {
  console.log(person["labelText"]);
});

person.name = "Dave";
// 输出: 'Dave'
