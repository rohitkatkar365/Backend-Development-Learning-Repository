const fs = require('fs');
const zlib = require('zlib');

// Create a readable stream for the input file
const readableStream = fs.createReadStream('input.txt');

// Create a writable stream for the compressed output file
const writableStream = fs.createWriteStream('output.txt.gz');

// Create a transform stream that compresses data
const gzipStream = zlib.createGzip();

// Pipe the input through the transform stream and into the output
readableStream.pipe(gzipStream).pipe(writableStream);

writableStream.on('finish', () => {
  console.log('File successfully compressed.');
});
