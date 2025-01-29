#!/usr/bin/env node
//shebang line to make the file executable
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';



if (process.argv.length < 3) {
  console.log('Usage: node codeAnalyzer.js <file-path>');
  process.exit(1);
}

const filePath = process.argv[2];


let fileContent;
try {
  fileContent = fs.readFileSync(filePath, 'utf-8');
} catch (err) {
  console.error(`Error reading file: ${err.message}`);
  process.exit(1);
}

const startTime = Date.now();

const analysisResults = {
  filePath,
  fileType: path.extname(filePath).toLowerCase(),
  lineCount: fileContent.split('\n').length,
  nonEmptyLineCount: fileContent.split('\n').filter((line) => line.trim() !== '').length,
  wordCount: fileContent.split(/[\W]/).filter((w) => w).length,
  charCount: fileContent.length,
  keywordFrequency: getKeywordFrequency(fileContent),
  functions: detectFunctions(fileContent),
  commentCount: fileContent.match(/\/\/.*|\/\*[\s\S]*?\*\//g)?.length || 0, //regex to match single line and multi line comments
  complexity: calculateComplexity(fileContent),
};
const endTime = Date.now();


console.log(chalk.bold.blue(`Analysis completed in ${(endTime - startTime) / 1000} seconds`));
console.log(chalk.green('----------------------'));
console.log(chalk.yellow(`File Path: ${analysisResults.filePath}`));
console.log(chalk.yellow(`File Type: ${analysisResults.fileType}`));
console.log(chalk.yellow(`Total Lines: ${analysisResults.lineCount}`));
console.log(chalk.yellow(`Non-Empty Lines: ${analysisResults.nonEmptyLineCount}`));
console.log(chalk.yellow(`Total Words: ${analysisResults.wordCount}`));
console.log(chalk.yellow(`Total Characters: ${analysisResults.charCount}`));
console.log(chalk.yellow(`Comment Count: ${analysisResults.commentCount}`));
console.log(chalk.yellow(`Code Complexity (Conditionals/Loops): ${analysisResults.complexity}`));
console.log(chalk.yellow('Keyword Frequency:'), analysisResults.keywordFrequency);
console.log(chalk.yellow('Functions Detected:'), analysisResults.functions);


try {
  fs.writeFileSync('analysis_results.json', JSON.stringify(analysisResults, null, 2));
  console.log('Analysis results exported to analysis_results.json');
} catch (err) {
  console.error(`Error exporting results: ${err.message}`);
}



