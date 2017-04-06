// @flow
export const takeNumberReturnNumber = (what: number): number => {
  console.log('I take a number and return a number');
  return what
}

takeNumberReturnNumber('IM SUPPOSED TO BE A NUMBER');
takeNumberReturnNumber(5);
