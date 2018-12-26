alert('start')

setTimeout( function () {
  alert('setTimeout')
}, 0 )

Promise.resolve().then(function() {
  alert('promise1');
}).then(function() {
  alert('promise2');
});

alert('end')