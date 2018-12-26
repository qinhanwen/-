function Promise(exector) {
    var self = this;
    self.status = 'pending';
    self.value = '';

    self.successCB = [];
    self.errorCB = [];

    function resolve(value) {
        if (self.status == 'pending') {
            self.status = 'resolved';
            self.value = value;
            console.log('resolved');
            self.successCB.forEach(function(cb){
                cb();
            })
        }
    }

    function reject(value) {
        if (self.status == 'pending') {
            self.status = 'rejected';
            self.value = value;
            console.log('rejected');
            self.errorCB.forEach(function(cb){
                cb();
            })
        }
    }
    exector(resolve, reject);
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    const self = this;
    let promise2 = new Promise(function(resolve,reject){
        if (this.status === 'resolved') {
            console.log(this);
        }
    })
    if (this.status == 'resolved') {
        onFulfilled(self.value);
    }

    if (this.status == 'rejected') {
        onRejected(self.value);
    }

    if (this.status == 'pending') {
        this.successCB.push(function () {
            onFulfilled(self.value);
        })
        this.errorCB.push(function () {
            onRejected(self.value);
        })
    }
    return promise2;
}

new Promise(function (resolve, reject) {
    console.log(1);
    setTimeout(function () {
        resolve('resolve');
    }, 2000);
})
.then(function (data) { console.log(data) }, function (err) { console.log(err) })
// .then(function (data) { console.log(data) }, function (err) { console.log(err) });
//打印出
//1
//resolved