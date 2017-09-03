// ===========================================
// Basic Types ===============================
// ===========================================

// Booleans ===========================================================

let isDone: boolean = false;
isDone = true;
isDone = 'what'; // Error: Type 'what' is not assignable to boolean

// Number ===========================================================

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

// Array ===========================================================

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

// Enums ===========================================================

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

// In TypeScript, an enum is to a dictionary as a tuple is to a list; enums 
// are just like dictionaries but with more rigidity in the possible values
 
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
let cWhat: Color = Color.what  // property 'what' does not exist on typeof 'Color'
console.log(c);
// >> 1

// by default, enums begin numbering their members starting at 0
// You can change this by manually setting the value of one of its members:

enum Color2 { Red = 1, Green, Blue }
let c2: Color2 = Color2.Green;

// With TS enums, you can also go from numeric value to the name 
// of that value in the enum

enum Color3 { Red = 1, Green, Blue}
let colorName: string = Color[2];
console.log('colorName: ', colorName);
// >> Blue

enum Color4 { Red = 'five', Green = 'what', Blue }
let c: Color4 = Color4.Red;
console.log(Color4.Red);
// >> five
console.log(Color4.Green);
// >> what
console.log(Color4.Blue);
// >> undefined;
console.log(Color4[1]);
// >> Green

// Any ===========================================================

// an opt-out of type-checking and allows values pass through
// compile-time checks

let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false;

// Void ===========================================================

// void is like the opposite of any: the absense of having any type at all
// commonly seen as a return type of functions that do not return a value;

function warnSomething(): void {
  alert('whatup');
}

// declaring variables of type 'void' is not useful because you can only
// assign undefined or null to them

// Null and Undefined ============================================

// just use void or something

// Never ==========================================================

// a type that represents the type of values that never occur
// 'never' is the return type for a fucntion expression or an 
// arrow function expression that always throws an exception or one that 
// never returns; Variables also acquire the type 'never' when narrowed
// by any type guards that can never be true.

// ... ?

// Type Assertions

// ... are a way of telling the compiler "trust me, I know what I'm doing"
// it's like taking manual control 

// two forms of type assertions: 

// Angle-bracket syntax:
let someValue: any = 'this is a string';
let strLength: number = (<string> someValue).length; // Note, this does not work with .tsx or React files

// or the 'as' -syntax
let someValue2: any = 'this is a string';
let strLength2: number = (someValue2 as string).length;