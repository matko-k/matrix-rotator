import { createCsvReader } from './reader';
import { createCsvWriter } from './writer';
import { isPerfectSquare, rotateArray } from './processor';

function formatJsonArray(arr: any[]): string {
  return JSON.stringify(arr); // always quoted, even for [] and [123]
}

function main() {
  const inputFile = process.argv[2];
  const rotationArg = parseInt(process.argv[3] || '1', 10); // default 1
  const rotateBy = isNaN(rotationArg) ? 1 : rotationArg;

  if (!inputFile) {
    console.error('Usage: node cli.js input.csv [rotateBy] > output.csv');
    process.exit(1);
  }

  const readerStream = createCsvReader(inputFile);
  const writer = createCsvWriter();

  readerStream.on('data', (row: any) => {
    const id = row.id;
    let arr: number[] = [];

    try {
      arr = JSON.parse(row.json);
      if (!Array.isArray(arr)) throw new Error();
    } catch {
      writer.write({ id, json: formatJsonArray([]), is_valid: false });
      return;
    }

    if (isPerfectSquare(arr.length)) {
      const rotated = rotateArray(arr, rotateBy);
      writer.write({ id, json: formatJsonArray(rotated), is_valid: true });
    } else {
      writer.write({ id, json: formatJsonArray([]), is_valid: false });
    }
  });

  readerStream.on('error', (err) => {
  console.error('Error reading CSV:', err.message);
  process.exit(1);
  });

  readerStream.on('end', () => {
    writer.end();
  });
}

main();