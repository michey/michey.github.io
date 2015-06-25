var extern = function(Class, Parent) {
  var __ExtendLink = function() {}
  __ExtendLink.prototype = Parent.prototype;
  Class.prototype = new __ExtendLink();
  Class.prototype.constructor = Class;
};


var ns = {};


ns.SimpleCounter = function(num) {

  this.__num = num;

  this.inc = function() {
    return ++this.__num;
  };

  this.dec = function() {
    return --this.__num;
  };
};

ns.ResetableCounter = function(num) {
  ns.SimpleCounter.call(this, num);

  this.__initNum = num;

  this.reset = function() {
    this.__num = this.__initNum;
    return this.__num;
  }
};

extern(ns.ResetableCounter, ns.SimpleCounter);