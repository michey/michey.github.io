var SIMPLE_COUNTERS = 1000;
var RESETABLE_COUNTERS = 1000;
var DEC_COUNT = 100;
var INC_COUNT = 100;

var counter_simple = [];
var counter_resetable = [];

var repeaterBuilder = function(callback, count) {
  return function(subParam) {
    for(var i = 0; i < count; i++) {
      callback(subParam)
    }
  }
};


var Inc = function(counter) {
  counter.inc();
};

var Dec = function(counter) {
  counter.dec();
};

var Reset = function(counter) {
  counter.reset();
};

function runBench() {
  counter_simple = [];
  console.time('all');
  console.time('simple');
  console.time('instantiate');
  for(var i = 1; i < SIMPLE_COUNTERS; i++) {
    counter_simple.push(new ns.SimpleCounter(i))
  }
  console.timeEnd('instantiate');
  console.time('inc');
  counter_simple.forEach(repeaterBuilder(Inc, INC_COUNT));
  console.timeEnd('inc');
  console.time('dec');
  counter_simple.forEach(repeaterBuilder(Dec, DEC_COUNT));
  console.timeEnd('dec');
  console.timeEnd('simple');
  console.time('resetable');
  console.time('instantiate2');
  counter_resetable = [];
  for(var i = 1; i < RESETABLE_COUNTERS; i++) {
    counter_resetable.push(new ns.ResetableCounter(i))
  }
  console.timeEnd('instantiate2');
  console.time('inc');
  counter_resetable.forEach(repeaterBuilder(Inc, INC_COUNT));
  console.timeEnd('inc');
  console.time('dec');
  counter_resetable.forEach(repeaterBuilder(Dec, DEC_COUNT));
  console.timeEnd('dec');
  console.time('reset');
  counter_resetable.forEach(Reset);
  console.timeEnd('reset');
  console.timeEnd('resetable');
  console.timeEnd('all');
}