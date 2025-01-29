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

// Helper Functions

/**
 * Calculate keyword frequency in the file.
 * Uses regex to match specific keywords in the file.
 */
function getKeywordFrequency(content) {
  const keywords = ['if', 'else', 'for', 'while', 'function', 'return', 'const', 'let', 'var'];
  const frequency = {};

  keywords.forEach((keyword) => {
    // Regex explanation:
    // - `\\b`: Word boundary to ensure we match whole words only.
    // - `${keyword}`: The keyword to search for.
    // - `\\b`: Another word boundary.
    // - `gi`: Flags for global (find all matches) and case-insensitive search.
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = content.match(regex); // Find all matches of the keyword
    frequency[keyword] = matches ? matches.length : 0; // Store the count of matches
  });

  return frequency;
}

/**
 * Detect functions in the file.
 * Uses regex to match function declarations.
 */
function detectFunctions(content) {
  // Regex explanation:
  // - `function`: Matches the keyword "function".
  // - `\\s+`: Matches one or more whitespace characters.
  // - `(\\w+)`: Captures the function name (one or more word characters).
  // - `\\s*\\(`: Matches optional whitespace followed by an opening parenthesis.
  const functionRegex = /function\s+(\w+)\s*\(/g;
  const functions = [];
  let match;

  // Loop through all matches of the regex
  while ((match = functionRegex.exec(content)) !== null) {
    functions.push(match[1]); // Add the function name (captured group) to the array
  }

  return functions;
}

/**
 * Calculate code complexity (number of conditionals and loops).
 * Uses regex to match conditional and loop keywords.
 */
function calculateComplexity(content) {
  // Regex explanation:
  // - `(if|else|for|while)`: Matches any of the keywords "if", "else", "for", or "while".
  // - `\\s*\\(`: Matches optional whitespace followed by an opening parenthesis.
  const complexityRegex = /(if|else|for|while)\s*\(/g;
  const matches = content.match(complexityRegex); // Find all matches
  return matches ? matches.length : 0; // Return the count of matches
}


