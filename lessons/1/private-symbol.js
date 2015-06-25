var Person = (function() {
  var nameSymbol = Symbol('name');

  function Person(name) {
    this[nameSymbol] = name;
  }

  Person.prototype.getName = function() {
    return this[nameSymbol];
  };

  return Person;
}());
