import { readFile } from "node:fs/promises";

const filePath = process.argv[2];
const wordSearch = process.argv[3];

const fileContent = await readFile(filePath, "utf-8");

const wordsArray = fileContent.split(/[\W]/).filter((w) => w);
//here /[\w]/ will match any word character (alphanumeric & underscore) 
//and /[\W]/ will match any non-word character (special characters)
//and filter((w) => w) will remove empty strings from the array

if (process.argv.length <= 3) {
  console.log("Please provide file path");
  // process.exit(1);

  const wordsCount = {};

  wordsArray.forEach((word) => {
    if (word in wordsCount) {
      wordsCount[word] += 1;
    } else {
      wordsCount[word] = 1;
    }
  });

  console.log(wordsCount);
  process.exit(1);
}


let wordCount = 0;

if (process.argv.length <= 4) {
  wordsArray.forEach((word) => {
    if (word.toLowerCase() === wordSearch.toLowerCase()) {
      wordCount += 1;
    }
    else {
      console.log("Word not found");
      process.exit(1);
  }

  console.log(`Word found, the ${wordSearch} appears ${wordCount} times`);
  process.exit(1);
})
}


