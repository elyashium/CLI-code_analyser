import { readFile } from "node:fs/promises";

const filePath = process.argv[2];
const fileContent = process.argv[3];

const fileContent = await readFile(filePath, "utf-8");

const wordsArray = fileContent.split(/[\W]/).filter((w) => w);
//here /[\w]/ will match any word character (alphanumeric & underscore) 
//and /[\W]/ will match any non-word character (special characters)
//and filter((w) => w) will remove empty strings from the array
const wordsCount = {};

wordsArray.forEach((word) => {
  if (word in wordsCount) {
    wordsCount[word] += 1;
  } else {
    wordsCount[word] = 1;
  }
});

console.log(wordsCount);