// ///////////////////////////////////////////////////////////////
// Functions ====================================================
// /////////////////////////////////////////////////////////////

// Type the parameters, type the output
function add(x: number, y: number): number {
  return x + y;
}

let whatUp = (x: number, y?: number): number => { 
  if (y) {
    return x + y; 
  }
  return x; 
};

let myAdd: (x: number, y: number) => number = 
  function(x: number, y: number): number { return x + y; };

// In TS, every parameter is assumed to be required by the function
// The number of arguments given to a function has to match
// the nujmber of parameters the function expects.
function buildName(firstName: string, lastName: string) {
  return firstName + ' ' + lastName;
}

let result1 = buildName('Bob');  // Too few
let result2 = buildName('Bob', 'Adams', 'Sr');  // Too much
let result3 = buildName('Bob', 'Adams');  // Just right

// Works fine if you assign default parameters thought
function buildName2(firstName: string, lastName: string = 'smith') {
  return firstName + ' ' + lastName;
}

let result11 = buildName2('Bob');  // Just right
let result22 = buildName2('Bob', 'Adams', 'Sr');  // Too much
let result33 = buildName2('Bob', 'Adams');  // Just right

// Rest Parameters =====================================
function buildName3(firstName: string, ...restOfName: string[]) {
  return firstName + ' ' + restOfName.join(' ');
}

let employeeName = buildName3('joseph', 'samuel', 'lucas', 'mackizneiasd');