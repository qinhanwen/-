function MyPromise(exector) {
    var self = this;
    self.status = 'pending';
    self.value = '';

    //存放成功或失败回调数组
    self.successCB = [];
    self.errorCB = [];

    function resolve(value) {
        if (self.status == 'pending') {
            self.status = 'resolved';
            self.value = value;
            self.successCB.forEach(function (cb) {
                cb();
            })
        }
    }

    function reject(value) {
        if (self.status == 'pending') {
            self.status = 'rejected';
            self.value = value;
            self.errorCB.forEach(function (cb) {
                cb();
            })
        }
    }
    exector(resolve, reject);
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const self = this;
    return new MyPromise(function (resolve, reject) {
        if (self.status == 'resolved') {
            if (typeof onFulfilled == "function") {
                let result = onFulfilled(self.value);
                if (result instanceof MyPromise) {
                    result.then(resolve,reject);
                } else {
                    resolve(result);
                }
            } else {
                resolve(self.value);
            }
        }

        if (self.status == 'rejected') {
            if (typeof onFulfilled == "function") {
                let result = reject(onRejected(self.value));
                if(result instanceof MyPromise){
                    result.then(resolve,reject);
                }else{
                    reject(onRejected(self.value));
                }
            } else {
                reject(self.value);
            }
        }

        if (self.status == 'pending') {
            self.successCB.push(function () {
                if (typeof onFulfilled == "function") {
                    let result = onFulfilled(self.value);
                    if (result instanceof MyPromise) {
                        result.then(resolve,reject);
                    } else {
                        resolve(result);
                    }
                } else {
                    resolve(self.value);
                }
            })
            self.errorCB.push(function () {
                if (typeof onFulfilled == "function") {
                    let result = reject(onRejected(self.value));
                    if(result instanceof MyPromise){
                        result.then(resolve,reject);
                    }else{
                        reject(onRejected(self.value));
                    }
                } else {
                    reject(self.value);
                }
            })
        }
    })
}
new Promise((resolve)=>{
    setTimeout(()=>{
        resolve();
    },1000)
}).then((data)=>{
    return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(2000);
            },2000)
        })
}).then((data)=>{
    console.log(data);
})