// //////////////////////////////////////////////////////////////////
// Generics ========================================================
// ////////////////////////////////////////////////////////////////

// Gives ability for a system component to work with a variety of types 
// rather than a single one.

// Using 'any' is generic but we lose the information about what that type
// was when the function returns. If we passed in a number, the only
// information we have is that any type could be returned.

// So, we need a way of capturing the type of the argument in such
// a way that we can also use it to denote what is being returned.
function identity<T>(arg: T): T {
  return arg;
}
// 'T' will capture a range of types. Unlike 'any', it doesn't lose
// any information 

// Once we've written the generic identity function, we can invoke in two ways:
let output = identity<string>('myString');  // output will be 'string'
// here we explicitly set 'T' to be 'string'

let output2 = identity('myString');  // type of output will be 'string'
// doing this way is more common and it lets the compiler automatically
// set the value of T for us based on the type of argument we pass in

// Working with Generic Type Variables ================================

// when you use generics, the compiler enforces that you use any generically
// typed parameters in the body of the function as if they could be any
// and all types:
function loggingIdentity<T>(arg: T): T {
  return arg.length;  // Error: T doesn't have .length
  // because 'T' could be anything, not just a string;
}

function loggingIdentity2<T>(arg: T): T | number {
  if (typeof arg === 'string') {
    return arg.length;
  }
  return arg;
}

function loggingIdentity3<T>(arg: T[]): T[] {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}

// Generic Types ======================================================

// Let's create generic interfaces

let functionGeneric = function<W>(what: W): W {
  return what;
};

let arrowGeneric = <U>(what: U): U => {
  return what;
};

interface GenericIdentityFunction {
  <T>(arg: T): T;
}

let interfaceTest: GenericIdentityFunction = functionGeneric;

// Generic Classes ===================================================

// a generic class has a similar shape to a generic interface.
// Generic classses have a generic type parameter list in angle brackets, <>
// following the name of the class.

class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x: string, y: string) { return x + y; };

// Generic Constraints ==============================================

// If you want your generics to be more restricted in what gets passed,
// we can restrict the generic like this, using an interface to 
// describe the constraint:

interface Lengthwise {
  length: number;
}

function loggingIdentity4<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now 'T' must agree to the contract set by interface, 'Lengthwise'
  return arg;
}

// because it's now constrained, it will no longer work over any and all types:
loggingIdentity4(3);  // Amount of type '3' is not assignable to parameter of type 'Lengthwise'
loggingIdentity4({ length: 10, value: 3});

// Using Type Parameters in Generic Constraints =======================

// You can declare a type parameter that is constrained by another
// type parameter.
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let xy = { a: 1, b: 2, c: 3, d: 4 };

getProperty(xy, 'a');
getProperty(xy, 'm'); // Error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'

// Using Class Types in Generics ========================================

// .... ?