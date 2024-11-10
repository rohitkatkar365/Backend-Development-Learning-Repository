const fs = require('fs');

// Create a readable stream and a writable stream
const readableStream = fs.createReadStream('source.txt');
const writableStream = fs.createWriteStream('destination.txt');

// Pipe the data from the readable stream to the writable stream
readableStream.pipe(writableStream);
// console.log(d);

// When the piping is complete, log a message
writableStream.on('finish', () => {
  console.log('File copied successfully.');
});
