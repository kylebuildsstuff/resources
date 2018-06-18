// ==============================================================
// Interfaces ===================================================
// ==============================================================

// TS's core principle is that type-checking focuses on the shape
// that values have. This is often called 'duck typing'.

// In TS, interfaces fill the role of naming these types
// Interfaces are also great for defining contracts within your code
// and contracts with code outside of your project.

// Interfaces are a thin layer of help that help you interact with whatever
// the interface is interfacing with.

// noun: a surface regarded as the common boundary of two bodies
// a common boundary between systems

// First Example ===============================================
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);

// only the 'shape' matters. We don't care what object as long as the shape matches,
// that it has a property of 'label', that has a string value

// Optional Properties =========================================

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: 'black' });

// note how width was omitted and everything was still OK because it was optional.

// Readonly properties =============================================

// Some properties should only be modifiable when an object is first created
// you can specify this by putting 'readonly' before the name of the property

interface Point {
  readonly x: number;
  y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5;  // Cannot assign to 'x' because it is a constant or read only value

// can also make ReadonlyArrays

let anArray: number[] = [1, 2, 3, 4];
let readOnlyArray: ReadonlyArray<number> = anArray;

// but you can turn a readonlyarray back to a normal array with a type assertion
anArray = readOnlyArray as number[];

// Function Types ===================================================

// In addition to describing an object with properties, interfaces can also
// describe function types.

// To describe a function type with an interface:
// give the interface a call signature.

interface SearchFunc {
  (source: string, subString: string): boolean;
}
// "It's a function that takes in these two params and returns this..."

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1;
};

// feels kind of redundant if you already type the parameters and return.
// But maybe if you have multiple functions that have the same interface, 
// then it's cool.

// Indexable Types ===================================================

// Similarly to how we can use interfaces to describe function types,
// we can also describe types that we can 'index into' like a[10], or 
// ageMap["daniel"].

// Indexable types have an 'index signature' that describes the types
// we can use to index into the object, along with the 
// corresponding return types when indexing.

// The only two types of supported index signatures are string and number
// and you can't mix and match them.
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred'];

let myStr: string = myArray[0];
myArray[2] = 'what';
myArray[3] = 5;  // type 5 is not assignable to type 'string'

// String index signatures are a powerful way to describe dictionaries.
// But they also enforce that ALL properties match their return type.
// because a string index declares that obj.property is also available as obj['property']
interface NumberDictionary {
  [index: string]: number;
  length: number;
  name: string;  // error, the type of 'name' is not a subtype of the indexer
}

// You can also make index signatures read only
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

// Class Types ======================================================

// One of the most common uses of interfaces in languages like C# and Java
// is explicitly enforcing that a class meets a particular contract,
// which is also possible in TypeScript.

interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;  // this is how to describe methods in classes
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { this.what = 'what'; }  // 'what' does not exist on type 'Clock'
}

// Extending Interfaces

// just like classes and inheritance, interfaces can extend each other
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

// let square = <Square> {};
let square = {} as Square;
square.color = 'blue';
square.sideLength = 10;
square.color = 1;  // 1 is not assignable as 'string';

interface PenStroke {
  penWidth: number;
}

// Interfaces can extend multiple interfaces to create a combination of all the interfaces.
interface WhatWhatCombination extends Shape, PenStroke {
  sup: number;
}

// Hybrid Types =======================================================
// Objects sometime work as a combination of multiple types due to 
// JS's dynamic and flexible nature

// This example shows an object that acts as both a function and an object, with additional properties
interface Counter {
  (start: number): string;  // function
  interval?: number;  // property
  reset?(): void;  // method;
}

function getCounter(): Counter {
  let counter = (function (start: number) { return 'sup'; }) as Counter;
  counter.interval = 123;
  counter.reset = function() { return undefined; };
  return counter;
}
// Note that 'counter' must follow 
// the contract set by the interface, Counter, now, but not the other way around

let cWhats = getCounter();
cWhats(10);
cWhats.reset();  // Object is possibly undefined
cWhats.interval = 5.0;

// Interfaces Extending Classes ========================================

// When an interface type extends a class type it inherits the members of the
// class but not their implementations, including private and protected
// members of a base class.

// ... ?