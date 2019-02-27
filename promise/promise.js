function Promise1(exector) {
    var self = this;
    self.status = 'pending';
    self.value = '';

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

Promise1.prototype.then = function (onFulfilled, onRejected) {
    const self = this;
    return new Promise1(function (resolve, reject) {
        if (self.status == 'resolved') {
            if (typeof onFulfilled == "function") {
                resolve(onFulfilled(self.value));
            } else {
                resolve(self.value);
            }
        }

        if (self.status == 'rejected') {
            if (typeof onFulfilled == "function") {
                reject(onRejected(self.value));
            } else {
                reject(self.value);
            }
        }

        if (self.status == 'pending') {
            self.successCB.push(function () {
                if (typeof onFulfilled == "function") {
                    resolve(onFulfilled(self.value));
                } else {
                    resolve(self.value);
                }
            })
            self.errorCB.push(function () {
                if (typeof onFulfilled == "function") {
                    reject(onRejected(self.value));
                } else {
                    reject(self.value);
                }
            })
        }
    })
}
new Promise1(function (resolve, reject) {
    console.log(1);
    setTimeout(function () {
        resolve('resolve');
    }, 2000);
})
.then(function (data) { console.log(data);return '有返回值';})
.then(function (data) { console.log(data);})
