function Foo() {
  this[100] = 'test-100';
  this[1] = 'test-1';
  this['B'] = 'bar-B';
  this[50] = 'test-50';
  this[9] = 'test-9';
  this[8] = 'test-8';
  this[3] = 'test-3';
  this[5] = 'test-5';
  this['A'] = 'bar-A';
  this['C'] = 'bar-C';
}
var bar = new Foo();

for (key in bar) {
  console.log(`index:${key} value:${bar[key]}`);
}
// index:1 value:test-1
// index:3 value:test-3
// index:5 value:test-5
// index:8 value:test-8
// index:9 value:test-9
// index:50 value:test-50
// index:100 value:test-100
// index:B value:bar-B
// index:A value:bar-A
// index:C value:bar-C
