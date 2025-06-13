import fs from 'fs';
import path from 'path';
import csvStream from 'csv-stream';

export function createCsvReader(inputFile: string) {
  const csvInput = csvStream.createStream({ trim: true, enclosedChar : '"' });
  const stream = fs.createReadStream(path.resolve(inputFile)).pipe(csvInput);
  return stream;
}