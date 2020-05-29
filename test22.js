var a = /** @class */ (function () {
    function a() {
    }
    a.prototype.getname = function () {
    };
    a.prototype.mounted = function () {
    };
    Object.defineProperty(a.prototype, "name", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    return a;
}());
Object.getOwnPropertyNames(a).forEach(function (key) {
    var descriptor = Object.getOwnPropertyDescriptor(a.prototype, key);
    console.log(descriptor);
});
