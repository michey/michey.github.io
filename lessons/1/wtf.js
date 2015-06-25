/**
 * Moron style code!!!!
 *
 * ISimpleCounter -
 *  - dec return num
 *  - inc return num
 *  IResettableCounter -
 *  @inherits ISimpleCounter
 *  - reset return num
 */


var ns = {};

ns.SimpleCounter = function(num) {
  return {
    '__num': num,
    'dec' : function() {
      return ++this.__num;
    },
    'inc' : function() {
      return --this.__num;
    }
  }
};

ns.ResetableCounter = function(num) {
  var restorableNum = num;
  return Object.defineProperty(
      ns.SimpleCounter(num),
      'reset',
      {value: function() {
        this.__num = restorableNum;
        return this.__num;
      }})
};