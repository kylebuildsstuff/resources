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

serviceReturnNumber('IM SUPPOSED TO BE A NUMBER');
serviceReturnNumber(5);

takeNumberReturnNumber('IM SUPPOSED TO BE A NUMBER');
takeNumberReturnNumber(5);
