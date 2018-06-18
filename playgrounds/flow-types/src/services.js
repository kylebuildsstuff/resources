// @flow
import { takeNumberReturnNumber } from './moreServices';

export const genericService = (what:string = '') => {
  console.log(`I am a generic service ${what}`);
  return {
    first: 'keyOne',
    second: 'keyTwo',
    third: 'keyThree',
  };
}

export const serviceReturnNumber = (what: number): number => {
  console.log(`I am a generic service that returns a number: ${what}`);
  return what;
}

serviceReturnNumber('NUMBER OR RIOT');
serviceReturnNumber(5);

takeNumberReturnNumber('NUMBER OR RIOT');
takeNumberReturnNumber(5);

// ////////////////////////////////////////////
// Primitive Types ===========================
// Types for JavaScript's primitive values ===
// ///////////////////////////////////////////////

export function concat(a: string, b: string) {
  return a + b;
}

concat(1, 2); // fails
concat('a', 'b'); // works

export function takeBoolean(a: boolean): boolean {
  return 'what';
}

// fails
takeBoolean('true');
takeBoolean('false');
takeBoolean('what?');
takeBoolean('');
takeBoolean(undefined);
takeBoolean();
// works
takeBoolean(true);
takeBoolean(false);

if (takeBoolean(true)) {
  console.log('yes');
}

function takeMaybeParam(value?: number) {
  return;
}

takeMaybeParam();
takeMaybeParam(1);
takeMaybeParam('1'); // error

function defaultFunction(value: number = 'string') { // error
  return 'what';
}

const arrow = (): boolean => {
  return 'I need to be a boolean returned'; //fails
}

function maybeString(s: ?string): ?string {
  return s || 123; // errors on 123
}

maybeString('as');
maybeString(1); // error
maybeString();

function takeMaybeObject(value: { foo?: string }) {
  return;
}

takeMaybeObject(); // error
takeMaybeObject({ foo: 1 }); // error
takeMaybeObject({});
takeMaybeObject({ foo: 'bar' });
takeMaybeObject({ foo: undefined });

// ////////////////////////////////////////
// Literal Types ==========================
// Using literal values as types ==========
// ////////////////////////////////////////

// this will work with other literals too
// like true or false, or 42, or 'foo'
function giveMeATwo(value: 2): 'what' {
  return 'whats'; // error
}

giveMeATwo(1); // error
giveMeATwo(2);

// Union Types in combination with literal types
// you can also do unions with primitive types like string and number...
function getColor(name: 'success' | 'warning' | 'danger') {
  switch (name) {
    case 'success': return 'green';
    case 'warning': return 'yellow';
    case 'danger': return 'red';
  }
}

getColor('success');
getColor('danger');
getColor(); // error
getColor('nope'); // error

// ///////////////////////////////////////////////
// Mixed Types ==================================
// Typing unknown types with mixed =============
// /////////////////////////////////////////////

// A type based on another type
function identity<T>(value: T): T {
  return value;
}

identity(4);
identity('asfsa');

// arbritrary type that could be anything
function getTypeOf(value: mixed): string {
  return typeof value;
}

/////////////////////////////////////////////

let foo: number = 1;
foo = 2;
foo = 'asd'; // error
