// ===========================================
// Basic Types ===============================
// ===========================================

// Booleans

let isDone: boolean = false;
isDone = true;
isDone = 'what'; // Error: Type 'what' is not assignable to boolean

// Number

let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;

let octal: number = 0o744;
decimal = 5.0;
decimal = 'what'; // error

// String

let color: string = 'blue';
color = 'red';
color = `what ${5}`;
color = 'um' + 'yea' + 'yes';
color = 5; // error

// Array

// Can be written in two ways: 
//   type of the element followed by []
//   Array<elemType>   <-- thisuses the generic array type

let list: number[] = [1, 2, 3, 4];
list.push('abc') // Error

let list2: Array<number> = [1, 2, 3];
list2.push('abc');  // Error

// Tuple

// JS tuples are just arrays with a fixed number of elements
let x: [string, number];
x = ['hello', 10];

let y: [number, string] = [10, 'what'];
y.push('asdas');
y.push(123);
y[0] = 'asd';  // Error

// Enum

// Is an addition to the standard set of datatypes from JS.
// An enum is a way of giving more friendly names to sets of numeric values

// In computer programming, an enumerated type 
// (also called enumeration, enum, or factor in the R programming 
// language, and a categorical variable in statistics) is a data type 
// consisting of a set of named values called elements, members, 
// enumeral, or enumerators of the type.

// Some enumerator types may be built into the language. 
// The Boolean type, for example is often a pre-defined enumeration 
// of the values False and True. Many languages allow users to define new enumerated types

// Enumeration does not speed things up, but it makes code much more readable

// Dictionary.com:

// an act of enumerating.
// a catalog or list.

