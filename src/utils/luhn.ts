// credit => https://gist.github.com/ShirtlessKirk/2134376
export default ((arr: number[]): ((ccNum: string) => boolean | 0) => {
  return (ccNum: string): boolean | 0 => {
    let len = ccNum.length;
    let bit = 1;
    let sum = 0;
    let val: number;

    while (len) {
      len -= 1;
      val = parseInt(ccNum.charAt(len), 10);
      // eslint-disable-next-line no-bitwise
      bit ^= 1;
      sum += bit ? arr[val] : val;
    }

    return sum && sum % 10 === 0;
  };
})([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]);
