var EventEmitter = require('events');
var util = require('util');

function Greetr() {
  this.greeting = 'Hello World!';
}

// Anything objects created from Greetr will have access to EventEmitter
util.inherits(Greetr, EventEmitter);

Greetr.prototype.greet = function() {
  console.log(this.greeting);
  this.emit('greet');
}

var greeter1 = new Greetr();

greeter1.on('greet', () => {
  console.log('Someone greeted!');
});

greeter1.greet();
