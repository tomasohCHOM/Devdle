// Since JavaScript strings are immutable, we make a utility function
// that will replace a character in a specific index with a character
// that we need.

// Solution: https://stackoverflow.com/a/1431110
const setCharAt = (str: string, index: number, char: string): string => {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + char + str.substring(index + 1);
};

export default setCharAt;
