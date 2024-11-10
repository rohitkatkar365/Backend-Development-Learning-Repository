const fs = require('fs');

// Using Writable Streams
let writestream = fs.createWriteStream("largefile.txt");

// Write data to the stream
writestream.write("Hello My Name Is RRK");
writestream.write('World!\n');
writestream.write("sfjnfjnsf");

// Close stream
writestream.end();

writestream.on('finish',()=>{
    console.log('All writes are complete.');
});