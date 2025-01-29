# Code Analyzer

A command-line tool to analyze code files and provide detailed statistics such as line count, word count, comment count, and code complexity.

## Features

- **Line Count**: Total lines and non-empty lines in the file.
- **Word Count**: Total words in the file.
- **Character Count**: Total characters in the file.
- **Comment Count**: Number of single-line and multi-line comments.
- **Keyword Frequency**: Frequency of common keywords (e.g., `if`, `else`, `for`, `function`).
- **Function Detection**: List of detected functions in the file.
- **Code Complexity**: Number of conditionals and loops.
- **Export Results**: Save analysis results to a JSON file.
- **Visual Appeal**: Colorful console output and formatted tables.

## Installation

You can install the package globally using npm:

```bash
npm install -g code-analyzer
```

## Usage

Run the tool from the command line by passing the path to the file you want to analyze:

```bash
code-analyzer <file-path>
```

### Example

```bash
code-analyzer ./src/index.js
```

### Output

```
  ____          _        _   _             _
 / ___|___   __| | ___  | \ | | __ _ _ __ | |
| |   / _ \ / _` |/ _ \ |  \| |/ _` | '_ \| |
| |__| (_) | (_| |  __/ | |\  | (_| | | | |_|
 \____\___/ \__,_|\___| |_| \_|\__,_|_| |_(_)

Code Analysis Results:
======================
File Path: ./src/index.js
----------------------
File Type: .js
----------------------
Total Lines: 120
----------------------
Non-Empty Lines: 90
----------------------
Total Words: 500
----------------------
Total Characters: 3000
----------------------
Comment Count: 15
----------------------
Code Complexity (Conditionals/Loops): 8
----------------------
Keyword Frequency: { if: 5, else: 3, for: 2, while: 1, function: 4, return: 3, const: 10, let: 5, var: 0 }
----------------------
Functions Detected: [ 'main', 'calculate', 'render' ]
----------------------

Summary:
----------------------
Most Frequent Keyword: const (10 occurrences)
Total Functions Detected: 3
Code Complexity Rating: Medium
Analysis completed in 0.45 seconds.
```

## Options

- `--verbose`: Display additional details, such as the full list of comments.
- `--export-csv`: Export results to a CSV file.
- `--help`: Show usage instructions.

### Example with Options

```bash
code-analyzer ./src/index.js --verbose --export-csv
```

## Development

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/code-analyzer.git
```

Navigate to the project directory:

```bash
cd code-analyzer
```

Install dependencies:

```bash
npm install
```

### Running Locally

To test the package locally, use npm link:

```bash
npm link
```

Then run the tool:

```bash
code-analyzer ./path/to/your/file.js
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   
   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:
   
   ```bash
   git commit -m "Add your feature"
   ```

4. Push to the branch:
   
   ```bash
   git push origin feature/your-feature
   ```

5. Open a pull request.

## Dependencies

- **chalk**: For colorful console output.
- **cli-table**: For formatted tables.
- **figlet**: For ASCII art banners.
- **ora**: For loading spinners.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

Your Name  
[GitHub](https://github.com/your-username) | Email

## Support

If you find this tool useful, consider giving it a ⭐️ on GitHub!

