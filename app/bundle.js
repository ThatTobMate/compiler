// bundle.js

(function () {
  var modules = {}
  var uninitializedModules = {}

  uninitializedModules['baz'] = function (module, exports) {
    console.log('intensity intensifies!')
    module.exports = function () {
      console.log('baz')
    }
  }

  modules['bar'] = wrap(function (module, exports) {
    module.exports = function () {
      getModule('baz')()
    }
  })

  wrap(function (module, exports) {
    var bar = getModule('bar')

    setTimeout(bar, 1000)
  })

  function getModule (key) {
    if (modules[key]) {
      return modules[key]
    }
    if (uninitializedModules[key]) {
      modules[key] = wrap(uninitializedModules[key])
      delete uninitializedModules[key]
      return modules[key]
    }
    throw new Error('module not found!')
  }

  function wrap (fn) {
    var module = {
      exports: {}
    }
    fn(module, module.exports)
    return module.exports
  }
}())