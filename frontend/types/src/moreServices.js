// @flow
export const takeNumberReturnNumber = (what: number): number => {
  console.log('I take a number and return a number');
  return what
}

takeNumberReturnNumber('IM SUPPOSED TO BE A NUMBER');
takeNumberReturnNumber(5);

// Object Types
let obj1: { foo?: ?boolean } = { foo: true}
obj1.asdasd; // error
obj1 = { foo: 'what' } // error
obj1 = { foo: '' } // error
obj1 = { foo: false }
obj1 = {}; // NOTE: this override of obj1 ovverides types too, so obj1.bar works
obj1.foo;
obj1.boo;
obj1.bar;

let obj2: { what?: string } = { what: 'sup' };
obj2.what;
obj2.sup; // error
