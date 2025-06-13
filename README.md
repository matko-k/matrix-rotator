# CSV Rotate CLI Tool

A Node.js command-line tool to read a CSV file containing IDs and JSON arrays, validate if the arrays form square matrices, rotate these matrices by multiples of 90° (right or left), and output the results as CSV.

---

## Features

- Reads CSV input with columns: `id,json`
- Validates if the JSON array length is a perfect square (e.g., 1, 4, 9, 16, ...)
- Converts array into `n x n` matrix and rotates it by a specified number of 90° turns (right by default)
- Outputs CSV with columns: `id,json,is_valid`
- Proper quoting of JSON arrays, including empty and single-element arrays
- Uses streaming CSV libraries (`csv-stream` for reading, `fast-csv` for writing)
- Handles errors gracefully and logs messages on failure

---

## Requirements

- Node.js >= 14
- Install dependencies with `npm install`

---

## Installation

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd <repo-folder>
npm install
```

---

## Usage

```bash
node main.js <input.csv> [rotate_by] > output.csv
```

- <input.csv>: Path to the CSV file to process
- [rotate_by]: Optional integer number of 90° rotations to apply to the right (clockwise)
    - Defaults to 1 (rotate 90° right once)
    - Negative values rotate to the left (counterclockwise)

---

## Examples
Rotate matrices 90° right (default):
```bash
node main.js input.csv > output.csv
```

Rotate matrices 180° right (rotate twice):
```bash
node main.js input.csv 2 > output.csv
```

Rotate matrices 90° left (rotate once to the left):
```bash
node main.js input.csv -1 > output.csv
```

Handle missing file error (will print error to stderr):
```bash
node main.js missing.csv > output.csv
```

Input CSV Format
```bash
id,json
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
2,"[40, 20, 90, 10]"
3,"[-5]"
9,"[2, -0]"
5,"[2, -5, -5]"
8,"[1, 1, 1, 1, 1]"
```
- id: Any identifier (number or string)
- json: A JSON array represented as a string (must be parseable)

Output CSV Format
```bash
id,json,is_valid
1,"[4,1,2,7,5,3,8,9,6]",true
2,"[90,40,10,20]",true
3,"[-5]",true
9,"[]",false
5,"[]",false
8,"[]",false
```
- id: Identifier parsed from the input
- json: The rotated JSON array string (always quoted)
- is_valid: true if input array length is a perfect square; false otherwise (output JSON is [] if invalid)

---

## Error Handling

- Input or output stream errors are logged to stderr.
- The process exits with a non-zero status on error.
- Errors include:
  - File not found
  - Invalid CSV format
  - JSON parse errors in input

---

## Contribution
Feel free to open issues or submit pull requests to improve this tool.
