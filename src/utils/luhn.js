// credit => https://gist.github.com/ShirtlessKirk/2134376
module.exports = (function (arr) {
  return function (ccNum) {
    let len = ccNum.length;
    let bit = 1;
    let sum = 0;
    let val;

    while (len) {
      val = parseInt(ccNum.charAt(--len), 10);
      sum += (bit ^= 1) ? arr[val] : val;
    }

    return sum && sum % 10 === 0;
  };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));