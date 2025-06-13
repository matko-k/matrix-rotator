import { format } from 'fast-csv';

export function createCsvWriter() {
  const csvOutput = format({ 
    headers: ['id', 'json', 'is_valid'],
    quoteColumns: { id: false, json: true, is_valid: false },
    quoteHeaders: false,
  });
  csvOutput.pipe(process.stdout);
  return csvOutput;
}