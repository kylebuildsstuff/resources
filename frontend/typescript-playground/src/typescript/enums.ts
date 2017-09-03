// ////////////////////////////////////////////////////////////////
// Enums =========================================================
// //////////////////////////////////////////////////////////////

// Enums allow us to define a set of named numeric constants. 
// An enum can be defined as such:

enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

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

enum Color3 { Red = 1, Green, Blue }
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
// >> undefined

// Enum members have numeric value associated with them 
// and can be either CONSTANT OR COMPUTED

// .... ?

// In generated code, an enum is compiled into an object that stores 
// both forward (name -> value) and reverse (value -> name) mappings
const enum EnumExample { 
  A = 1,
  B = A * 2
}
