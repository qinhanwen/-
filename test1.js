let i = 0;
let date = new Date().getTime();
function fetch(url) {
  i++;
  return new Promise(resolve => {
    const delay = i > 3 ? i * 1000 : 1000;
    setTimeout(() => {
      console.log(url, new Date().getTime() - date);
      // console.log(url, delay);
      resolve();
    }, delay);
  });
}

var url = ['1', '2', '3', '4', '5', '6', 7, 8];
function execute(array, limit = 5) {
  let i = 0;
  for (; i < limit; i++) {
    dispatch(i);
  }
  function dispatch(j) {
    if (j > array.length - 1) return;
    fetch(array[j]).then(() => dispatch(i >= j ? i++ : ++j));
  }
}

execute(url);
