declare module 'csv-stream' {
  interface CsvStreamOptions {
    columns?: boolean;
    delimiter?: string;
    trim?: boolean;
    enclosedChar? : string;
  }

  interface CsvStreamParser extends NodeJS.ReadWriteStream {
    on(event: 'data', listener: (row: any) => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'end', listener: () => void): this;
  }

  function createStream(options?: CsvStreamOptions): CsvStreamParser;

  export { createStream };
}