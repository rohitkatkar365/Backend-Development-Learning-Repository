const fs = require("fs");

// Asynchronously manipulation

fs.readFile("output.txt", "utf-8", (err, data) => {
  if (data) {
    console.log(data);
  } else {
    console.log(err);
  }
});

fs.writeFile("input1.txt", "Hello World", (err, data) => {
  if (data) {
    console.log(data);
  } else {
    console.log(err);
  }
});

fs.unlink("input1.txt", (err) => {
  if (err) throw err;
  console.log("Delete Successfully");
});

// Synchronously reading the file content
fs.readFile("input1.txt", "utf8", (er, data) => {
  console.log(data);
});
