#!/usr/bin/env node

// Helper Functions


 // Calculate keyword frequency in the file.
  //Uses regex to match specific keywords in the file.
 
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
  
  // Detect functions in the file.

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
  
  // Calculate code complexity based on the number of conditionals and loops.
  function calculateComplexity(content) {
    // Regex explanation:
    // - `(if|else|for|while)`: Matches any of the keywords "if", "else", "for", or "while".
    // - `\\s*\\(`: Matches optional whitespace followed by an opening parenthesis.
    const complexityRegex = /(if|else|for|while)\s*\(/g;
    const matches = content.match(complexityRegex); // Find all matches
    return matches ? matches.length : 0; // Return the count of matches
  }
  
  export { getKeywordFrequency };