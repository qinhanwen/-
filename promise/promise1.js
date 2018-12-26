function Promise(exector) {
    var self = this;
    self.status = 'pending';
    self.value = '';
    function resolve(value) {
        if (self.status == 'pending') {
            self.status = 'resolved';
            self.value = value;
            console.log('resolved');
        }
    }

    function reject(value) {
        if (self.status == 'pending') {
            self.status = 'rejected';
            self.value = value;
            console.log('rejected');
        }
    }
    exector(resolve, reject);
}

//然后调用
new Promise(function (resolve, reject) {
    console.log(1);
    resolve('resolve');
})