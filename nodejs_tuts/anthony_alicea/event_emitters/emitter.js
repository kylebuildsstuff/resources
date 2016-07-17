// function Emitter() {
//   this.events = {};
// }
//
// // ...the prototype of any object created with this function constructor...
// Emitter.prototype.on = function(type, listener) {
//   this.events[type] = this.events[type] || [];
//   this.events[type].push(listener);
// }


class Emitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    this.events[type]= this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type) {
    if (this.events[type]) {
      this.events[type].forEach(function(listener) {
        listener();
      });
    }
  }
}

export default Emitter;
