const longestCommonString = (arr) => {
  if (arr.length > 200 || arr.length < 1) return "";
  if (arr.every((str) => str.length > 200 || str.length === 0)) return "";
  if (!arr.every((str) => /^[a-z]+$/.test(str))) return "";
  let commonString = "";
  [...arr[0]].some((char, index) => {
    if (arr.every((str) => str[index] === char)) {
      commonString += char;
    } else {
      return true;
    }
  });
  return commonString;
};

console.log("Example 1", longestCommonString(["flower", "flow", "flight"]));
console.log("Example 2", longestCommonString(["dog", "racecar", "car"]));
console.log("dog", longestCommonString(["dog", "dogee", "doggo"]));
console.log("with num", longestCommonString(["doga", "doga", "dog", "d0gas"]));
console.log(
  "with Uppercase",
  longestCommonString(["doga", "dog", "dog", "Doxog"])
);
