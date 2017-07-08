// Given two arrays of strings a1 and a2 return a sorted array r in lexicographical order of the strings of a1 which are substrings of strings of a2.
//
// #Example 1: a1 = ["arp", "live", "strong"]
//
// a2 = ["lively", "alive", "harp", "sharp", "armstrong"]
//
// returns ["arp", "live", "strong"]
//
// #Example 2: a1 = ["tarp", "mice", "bull"]
//
// a2 = ["lively", "alive", "harp", "sharp", "armstrong"]
//
// returns []
//
// #Notes: Arrays are written in "general" notation. See "Your Test Cases" for examples in your language.
//
// Beware: r must be without duplicates.

function inArray(array1,array2) {
  const answer = [];
  array2.forEach(bword => {
    array1.forEach(aword => {
      if (bword.includes(aword)) {
        answer.push(aword);
      }
    });
  });

  const cleanedAnswer = [];
  answer.forEach(item => {
    answer.forEach(a => {
      if (!cleanedAnswer.includes(a)) {
        cleanedAnswer.push(a);
      }
    })

  });

  return cleanedAnswer;
}
