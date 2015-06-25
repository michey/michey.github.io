var extern = function(Class, Parent) {
  var __ExtendLink = function() {}
  __ExtendLink.prototype = Parent.prototype;
  Class.prototype = new __ExtendLink();
  Class.prototype.constructor = Class;
}


var ns = {};


ns.SimpleCounter = function(num) {
  this.__num = num;
};

ns.SimpleCounter.prototype.inc = function() {
  return ++this.__num;
};

ns.SimpleCounter.prototype.dec = function() {
  return --this.__num;
};


ns.ResetableCounter = function(num) {
  ns.SimpleCounter.call(this, num);
  this.__initNum = num;
}

extern(ns.ResetableCounter, ns.SimpleCounter);

ns.ResetableCounter.prototype.reset = function() {
  this.__num = this.__initNum;
  return this.__num;
}




