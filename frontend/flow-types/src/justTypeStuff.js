// @flow

// ////////////////////////////////////////////////////////////////////
// Mixed Types ====================================================
// ////////////////////////////////////////////////////////////////////

// https://flow.org/en/docs/types/

// NOTE This file covers notes and examples from 'Primitive Types' to 'Type Aliases'
// Primitive
// Literal
// Mixed
// Any
// Maybe
// Variable
// Function
// Object
// Array
// Tuple
// Class
// Type Aliases


var thing: number = Math.random();
thing.toLowercase();
// We could use a group of different possible types
function stringifyBasicValue(value: string | number | boolean) {
  return '' + value; // errors because value cannot be coerced to boolean. Need to put it like String(value)
}

stringifyBasicValue(5);
stringifyBasicValue('what');
stringifyBasicValue(false);
stringifyBasicValue(); // error

// or maybe a type based on another type
// the return type will be the same as the type of whatever value is passed into the function
function identity<T>(value: T): T { // The 'T' in this case is arbitrary and could be anything like ABC because it's just a name
  return value;
}

identity(4);
identity('what');
identity(false);

function identity(value: T): T { // errors because no <T>...'identifier T. Could not resolve name...'
  return value;
}

// besides a single type (primitive or literal), we can have a group of types,
// a type based on another type, and an arbitrary type that could be anything
function getTypeOf(value: mixed): string {
  return typeof value;
}

getTypeOf(5);
getTypeOf('what');
getTypeOf(true);
getTypeOf({});
getTypeOf([]);
// there would also be no errors if ': mixed' was taken out

// mixed will accept any type of value
// but when using a value of a mixed type, you must figure out what the actual type is or you get an error
function stringify(value: mixed) {
  return "" + value; // error: This type cannot be used in an addition because it is unknown whether it behaves like a number or string
}

stringify('what');

function stringify(value: mixed) {
  if (typeof value === 'string') { // the equality check for strings, Flow knows the value can only be a string in the if statement
    // this is called refinement, the ability for a static type checker to be able
    // to tell that the value inside the if statement must be of type string
    return '' + value;
  } else {
    return '';
  }
}

// ////////////////////////////////////////////////////
// Any Types =========================================
// ////////////////////////////////////////////////////

// This is a way to opt-out of using the type checker
// using 'any' is unsafe and should be avoided when possible
function add(one: any, two: any): number {
  return one + two;
}

add(1, 2);
add('1', '2');
add({}, []);

function deepObject(object: any) {
  return object.foo.what.bar.so.this.is.a.thing.that.works.fine.with.flow.with.no.errors;
}

deepObject();
deepObject({});

// //////////////////////////////////////////////////////
// Function Types ====================================
// //////////////////////////////////////////////////

// this
// don't have to type annoytate 'this' because Flow will check whatever context you call the function with
function method() {
  return this;
}

var num: number = method.call(42);
var str: string = method.call(42); // error: incompatible with string

// Sometimes you need a type that accepts arbitrary functions, so use () => mixed:
function method2(func: () => mixed) {
  return func;
}

method2(); // error
method2(5); // error
method2(true); // error
method2(() => 5);
method2((what) => () => 'haha');

// try not to use : Function either because it is unsafe and should be avoided like : any
function method3(func: Function) {
  func(1, 2);
  func('2', '1');
  func({}, []);
}

// ////////////////////////////////////////////////////////
// Object Types ===========================================
// ///////////////////////////////////////////////////////

var obj1: { foo?: ?boolean } = { foo: true, sup: 'aaa' }; // but note that at object creation type, I was able to add an unspecified property
obj1.what = 'asdas'; // error
obj1.ab = 'nnope'; // error: // Sealed objects will know all of the properties you declared but you cannot add new properties to them

// Sealed Objects
// creating an object with its properties, you create a sealed object
// Sealed objects will know all of the properties you declared but you cannot add new properties to them
var obj = {
  foo: 1,
  bar: true,
  baz: 'three',
};

var foo: number = obj.foo;
var bar: boolean = obj.bar;
var baz: null = obj.baz; // error: string is incompatible with null
var baz: number = obj.baz; // error: string is incompatible with number
var bat: string = obj.bat // error: bat not found in object literal

// Unsealed objects
// When you create an object without any properties, you create an unsealed object type
// Unsealed objects will allow you to add new properties

// NOTE With unsealed objects, the type must be explictly set for each property

var unsealed = {};
unsealed.foo = 1;
unsealed.bar = true;
// unsealed.what: number = 5; // error at the colon: unexpected token. Must reassign type on another line
unsealed.what = 5;
var string: string = unsealed.what; // error (string uncompatible with number)
var number: number = unsealed.what;

// They will also infer the type of property when set
var num: number = unsealed.foo;
// sometimes flow will be smart enough to determine type of unsealed object, but for now, we explictly tell it.

// Another thing with unsealed objects is that it allows for unknown property lookup, which is considered unsafe.
// This may be improved in the future. (update, it seems like they just did this, look at example below)
var testObj1 = {};

testObj1.foo = 1;
testObj1.bar = true;

var foo: number  = testObj1.foo; // Works!
var bar: boolean = testObj1.bar; // Works!
var baz: string  = testObj1.baz; // error: string is incompatible with null

testObj1.baz;
testObj1.what;

// Exact Object types
// In Flow, it is safe to pass an object with extra properties where a normal object type is expected
// this is called 'width subtyping'
function method4(obj: { foo: string }) {
  return;
}

method4({
  foo: 'asd',
  bar: 5,
})

function method5(obj: { foo: string }) {
  return;
}

method5({
  foo: 5, // error
  bar: 5,
})

// but if you want to disable width subtyping to allow only a specific set of properties, Flow supports 'exact' object types
var fooo: {| foo: string |} = { foo: 'what', bar: 'ha'} // error, property bar not found in object type

// if you want to set types on object keys too, just use indexer properties:
var obj8: {
  size: number,
  [id: number]: string
} = {
  size: 0
};

function add(id: number, name: string) {
  obj8[id] = name;
  obj8.size++;
}

// ////////////////////////////////////////////////////////////
// Array Types ===============================================
// ///////////////////////////////////////////////////////////

// To create an array type, use 'Array<Type>', where 'Type' is the type of elements in the array
// Array<number>
let arr: Array<number> = [1, 2, 3];
let barr: Array<number> = [1, 2, 'a']; // error
let barrr: Array<number> = null; // incompatible type
let barrrr: ?Array<number> = null;
let whaaa: Array<string> = [];
let arr1: Array<boolean> = [true, false, true];
let arr2: Array<string> = ["A", "B", "C"];
let arr3: Array<mixed> = [1, true, "three"];
// Array Type shorthand syntax: Type[]
let arr0: number[] = [0, 1, 2, 3];
let arr11: ?number[] = null;   // Works!
let arr22: ?number[] = [1, 2]; // Works!
let arr33: ?number[] = [null]; // Error! null is incompatible with number

let darr1: Array<?number> = null;   // Error!
let darr2: Array<?number> = [1, 2]; // Works!
let darr3: Array<?number> = [null]; // Works!
let darr4: Array<number> = [null] // error
let carr1: (?number)[] = null;   // Error!
let carr2: (?number)[] = [1, 2]; // Works!
let carr3: (?number)[] = [null]; // Works!

// Array access is unsafe
// When you retrieve an element from an array, there is alwas a possiblity that it is undefined
// Could be out of bounds, or maybe an element that does not exist if it is a sparse array
// THIS IS BROKEN AND FLOW IS LOOKING TO FIX
// tldr, continue on and do as you normally would.

// //////////////////////////////////////
// Tuple Types =========================
// //////////////////////////////////////

// Tuples in JS are a fancy name for a list but with limited items
let tuple1: [number, boolean, string] = [1, true, 'three'];

// /////////////////////////////
// Class Types =================
// /////////////////////////////

// write classes the same way you would without Flow, but then you can use the name of the class as a type

class MyClass {}
class MyClass2 {}
let myInstance: MyClass = new MyClass();
let myInstance2: MyClass = new MyClass2(); // Error (MyClass is incompatible with MyClass2);

// class methods are just like functions and can hav annotations for input parameters and return parameters
class MyClass3 {
  method(value: string): number {
    return 'asd'; // Error (needs to be a number)
  }
}

// To use a class field (property) in Flow, you must first give it an annotation
class MyClass4 {
  what: number;
  method() {
    this.prop = 42; // Error (prop not found in MyClass4)
    this.what = 42;
  }
}

// OR if you want to use class properties syntax (ES8):
class MyClass5 {
  what: number = 42;
}

// Class Generics
// generics are polymorphic types and are a way of abstracting a type away
class MyClass6<A, B, C> {
  property: A;
  method(val: B): C {
    return false; // Error (return is incompatible with type, C)
  }
}

// Class generics are parameterized, so when you use a class as a type,
// you need to pass parameters for each of its generics
class MyClass7<A, B, C> {
  constructor(arg1: A, arg2: B, arg3: C) {
    // ...
  }
}

var val: MyClass7 = new MyClass7(1, true, 'three'); // Error (Application of polymorphic type needs <list of 3 arguments>)
var val2: MyClass7<number, boolean, string> = new MyClass7(1, true, 'three');

// ////////////////////////////////////////////////////
// Type Aliases ======================================
// //////////////////////////////////////////////////

// For complicated types that you want to reuse in multiple places, you can alias them with 'type aliases'
type MyObject = {
  foo: number,
  bar: boolean,
  baz: string,
};

let vals: MyObject = { // error: property foo not found in type
  what: 1,
  naw: 'asd',
  bar: true,
  baz: 'asd',
  ahah: true,
}

type testObject50 = {
  what: number | string,
}

let varrr: testObject50 = {
  what: 50, // works... object types properties seem to be readable and writable by default. But invariant properties are read-only by default
}

function methodTest(val: MyObject) { /* ... */ }
class FooTest { constructor(val: MyObject) { /* ... */ } }
// Type aliases can be used anywhere a type can be used

// Type Alias Syntax
// Interfaces are created using the keyword 'type' followed by its name, an equals sign '=', and a type definition
// type Alias = Type;
type NumberAlias = number;
type ObjectAlias = {
  property: string,
  method: () => string,
  // method(): string, // wtf?... same as above... almost... this way makes it covariant. the above way makes it invariant (by default in dictionaries for object properties)
};
type UnionAlias = 1 | 2 | 3;
type AliasAlias = ObjectAlias;

let tester: ObjectAlias = {
  property: 'as',
  // method: 1, // error
  // method: () => 'asd',  // works
  method() { return 'asd' }, // works
};

// Type Alias Generics
// Type aliases can have their own generics too
type MyObject2<A, B, C> = {
  property: A,
  method: (val: B) => C,
  // method(val: B): C, // This is another way of writing the above line
}
// Type alias generics are also parameterized
// when you use a type alias, you need to apss parameters for each of its generics
type MyObject3<A, B, C> = {
  foo: A,
  bar: B,
  baz: C,
};

let val5: MyObject3<number, boolean, string> = {
  foo: 1,
  bar: true,
  baz: 'three',
};
