import isWord from "check-if-word";
const english = isWord("en");

export const CheckIfMakesSense = (data: string) => {
  if (!data) return false;
  let words = data.toString().split(" ");
  let c = words.length;
  if (c > 0) {
    let wordCount = words.reduce((s, w) => (english.check(w) ? s + 1 : s), 0);
    if (wordCount > c / 2) {
      return true;
    }
  }
  return false;
};
