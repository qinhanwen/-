console.log(1);
setTimeout(function(){
    console.log(2);
},0)
new Promise(function(resolve,reject){
    resolve();
}).then(function(){
    console.log(3);
})
console.log(4);