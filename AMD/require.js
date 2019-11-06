let factories = {};
function define(moduleName, dependencies, factory) {
    
    factories[moduleName] = factory;
}
function require(modules, cb) {
    let module = modules.map(item => {
        let fn = factories[item];
        return fn();
    })
    cb.apply(null,module);
}

define('age', ['name'], function (name) {
    return name+'25';
})

require(['age'], function (age) {
    console.log(name, age);
})