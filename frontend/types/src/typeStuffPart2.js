// @flow

// NOTE
// Interface
// Generic
// Union
// Intersection
// Typeof
// Type Casting Expressions
// Utility
// Module
// Comment

// ////////////////////////////////////////////////////////////
// Interface Types ===========================================
// //////////////////////////////////////////////////////////

// Class in Flow are nominally (in name only) typed, meaning when you have two separate classes, you cannot
// use one in place of the other even when they have the exact same properties and methods
class Foo1 {
  serialize() { return 'FOOO'; }
}

class Bar1 {
  serialize() { return '[Bar]'; }
}

const foo: Foo = new Bar(); // error: Bar type is not compatible with Foo type

// To solve this, you can use an 'interface' in order to declare the structure of the class that
// you are expecting
interface Serializeable {
  serializeThis: () => string;
  // serializeThis(): string;
}

class Foo2 {
  serializeThis() { return 'FOOOOOO'; }
}

class Bar2 {
  serializeThis() { return 'BAAAAAAAR'; }
}

const foozie: Serializeable = new Foo2(); // ERROR
const barzie: Serializeable = new Bar2(); // ERROR (need to switch the interface to the way that accepts covariance in method)
// https://medium.com/@thejameskyle/type-systems-covariance-contravariance-bivariance-and-invariance-explained-35f43d1110f8
// above errors out when specifying method type like ': () => string' because:
// Bar2: Covariant property `serializeThis` incompatible with invariant use in Serializeable
// https://flow.org/blog/2016/10/04/Property-Variance/
// NOTE: Class methods are covriant but fields are invariant by default
// when using the ES6 shorthand way to write object properties, the object properties are covariant by default
// but the type interface wher eI defined serializeThis was done in a way that's invariant
    // By default, dictionary properties are invariant
    // can't be having covariant's mixing with invariants because it messes up relationships if they start subclassing and superclassing each other

// You can also tell Flow that oyu want a class to match an interface with 'implements'.
// This prevents you from making incompatible changes when editing the classes.
interface Serializeable2 {
  serializeThis(): string, // this is covariant by default
  sayWhat: () => number, // this is invariant by default
}

class Foo3 implements Serializeable2 {
  serializeThis() { return 'asds' }
  serialize() { return 'asdfas'} // (this is covariant by default)
  sayWhat = () => 2 // WORKS!!!  (this is invariant by default)
} // Remember, covariants and invariants cannot mix or else relationships down the road won't make sense
// How can one thing be accepting and non accepting of subtypes/supertypes at the same time

let sayWhatt: Serializeable2 = {
  serializeThis: () => 'dfasd',
  sayWhat: () => 5,
} // interfaces work with plain objects too

// NOTE You can do Interface Generics too
interface GenericInterface<A, B, C> {
  propertya: A,
  methoda: (B) => B,
};

// and remember that generics are parameterized, so when you use an interface, you need to pass
// parameters for each of its generics
// In terms of Interfaces vs Types, they are very similar but they have suble differences.
// Methods declared on an interface are considered 'read-only'.
// In general, use object types to describe bags of mostly data that's passed around in your app
// Use interfaces for service-like interfaces (like methods) because if a class instance
// is likely to be an inhabitant of your type, you probably want an interface to support
// subtypes being covariant w.r.t. methods
// http://stackoverflow.com/questions/36904201/when-do-you-use-an-interface-over-a-type-alias-in-flow
let valzzzz: GenericInterface<number, boolean, string> = {
  // foo: 1,
  propertya: 6,
  methoda: (what) => { return what },
};

valzzzz.methoda(true);

// Interface properties are invariant by default. But you can add modifiers to make them
// covariant (read-only, works for subtypes) or contravariant (write-only, works for supertypes)
interface MyInterface2 {
  +covariant: number; // read-only
  -contravariant: number; // write-only
}

interface Invariant1 {
  property: number | string, // interface properties are invariant by default
};
interface Covariant1 {
  +readOnly: number | string,
};

let v1: Invariant1 = { property: 42 }; // Errors: up top in Invariant1, it says string is incompatible with number... needs refinement
let v2: Covariant1 = { readOnly: 42 } ; // works

// Sometimes it's nice to have read-only properties:
interface Invariant3 {  property: number | string; }
interface Covariant3 { +readOnly: number | string; }

function method1(value: Invariant3) {
  value.property;        // Works!
  value.property = 3.14; // Works!
}

function method2(value: Covariant3) {
  value.readOnly;        // Works!
  // $ExpectError
  value.readOnly = 3.14; // Error!
}

// write-only (contravariant) example
interface Invariant4     {   property: number; }
interface Contravariant4 { -writeOnly: number; }

function method1(value: Invariant4) {
  value.property;        // Works!
  value.property = 3.14; // Works!
}

function method2(value: Contravariant4) {
  // $ExpectError
  value.writeOnly;        // Error!
  value.writeOnly = 3.14; // Works!
}

// ///////////////////////////////////////////////////////////
// Generic Types ============================================
// /////////////////////////////////////////////////////////

// Generics aka polymorphic types are a way of abstracting a type away
// instead of doing:
function identity20(value: string): string { // this is exhaustive as you would need to cover every case
  return 'asds';
}
// you can do this instead:
function identity21<T>(value: T): T {
  return value;
}
// generics can be used with functions, function types, classes, type aliases, and interfaces
// the <> part is the type parameter list... think of it like a basket of types because it looks like a basket
// when using the type baskt/parameter list, and you use the type, you must instantiatate it with parameters
// NOTE: ONLY need parameters for classes (when used as a type), type aliase,s and interfaces
// functions and function types do not have parameterized generics

class Item<T> {
  prop: T;
  constructor(param: T) {
    this.prop = param;
  }
}

let item: Item<number> = new Item(42); // Works!
// $ExpectError
let item: Item = new Item(42); // Error!

// You can add defaults to parameterized generics too:
type Item2<T: number = 1> = {
  prop: T,
};

let foorg: Item2<> = { prop: 1 };
let bar: Item2<2> = { prop: 2 };

type Item3<T: number> = {
  prop: T,
};

let foorgs: Item2<string> = { prop: 1 }; // error: string is incompatible with number


// /////////////////////////////////////////////////////////
// Union Types ==========================================
// //////////////////////////////////////////////////////

// Create a type which is one of a set of other types
function union1(value: number | boolean | string) {
  return value;
  // return String(value);
}

union1(1);
union1(true);
union1('three');
// good to use refinements with union types
// when you have a value which is a union type, it's often useful to break it apart and handle each
// individual type separately

// Disjoint Unions:
type Success = { success: true, value: boolean };
type Failed  = { success: false, error: string };

type Response = Success | Failed;

function handleResponse(response: Response) {
  if (response.success) {
    var value: boolean = response.value; // Works!
  } else {
    var error: string = response.error; // Works!
  }
}
// NOTE: Disjoint unions require you to use a single property to distinguish object type, like response: Response in above example
// You can't do something like response: Success | Failed

// /////////////////////////////////////////////////////////////////////
// Intersection Types ================================================
// ///////////////////////////////////////////////////////////////////

// Sometimes it is useful to create a type which is all of a set of other types. For
// example, you might want to write a function which accepts an object which is the combination of
// other object types. For this, Flow supports 'intersection types'.
type AA = { a: number };
type BB = { b: boolean };
type CC = { c: string };

function methodzz(value: AA & BB & CC) {
  // ...
}

// $ExpectError
methodzz({ a: 1 }); // Error!
// $ExpectError
methodzz({ a: 1, b: true }); // Error!
methodzz({ a: 1, b: true, c: 'three' }); // Works
// Intersection types are the opposite of union types

// NOTE if you create an intersection of object types, you merge all of their properties together
type One = { foo: number };
type Two = { bar: boolean };

type Both = One & Two;

var value: Both = {
  foo: 1,
  bar: true
};

// you can do stuff like this too:
type Onee = { prop: number };
type Twoe = { prop: boolean };

type Boths = Onee & Twoe;

// $ExpectError
var values: Boths = {
  prop: 1 // Error!
};
