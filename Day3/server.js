const http = require("http");
const fs = require("fs");
const url = require("url");
// User-Defined module
const replaceHtml = require("./Module/replaceHtml");

const port = 3000;
const hostname = "127.0.0.1";

// Read files
let html = fs.readFileSync("./Template/index.html", "utf-8");
let data = JSON.parse(fs.readFileSync("./Data/product.json", "utf-8"));
let index1 = fs.readFileSync("./Template/index1.html", "utf-8");
let index2 = fs.readFileSync("./Template/index2.html", "utf-8");

// Function to replace placeholders in the HTML template
// function replaceHtml(template, cur) {
//   let op = template.replace("{{%IMAGE%}}", cur.productImage);
//   op = op.replace("{{%NAME%}}", cur.name);
//   op = op.replace("{{%MODELNAME%}}", cur.modelName);
//   op = op.replace("{{%MODELNO%}}", cur.modelNumber);
//   op = op.replace("{{%SIZE%}}", cur.size);
//   op = op.replace("{{%CAMERA%}}", cur.camera);
//   op = op.replace("{{%PRICE%}}", cur.price);
//   op = op.replace("{{%COLOR%}}", cur.color);
//   op = op.replace("{{%DESC%}}", cur.Description);
//   op = op.replace("{{%ROM%}}", cur.ROM);
//   op = op.replace("{{%ID%}}", cur.id);
//   return op;
// }

const server = http.createServer((req, res) => {
  let { query, pathname: path } = url.parse(req.url, true);

  // Normalize path to lowercase
  path = path.toLowerCase();
  res.setHeader("Content-Type", "text/html");

  if (path === "/about" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Cache-Control", "no-cache");
    res.end(html.replace("{{%CONTENT%}}", "About Page"));
  } else if (path === "/contact" && req.method === "GET") {
    res.statusCode = 200;
    res.end(html.replace("{{%CONTENT%}}", "Contact Page"));
  } else if ((path === "/" || path === "/home") && req.method === "GET") {
    res.statusCode = 200;
    res.end(html.replace("{{%CONTENT%}}", "Home Page"));
  } else if (path === "/products" && req.method === "GET") {
    if (!query.id) {
      // Render all products if no specific ID is provided
      let productHTMLArray = data.map((prod) => {
        return replaceHtml(index1, prod);
      });
      let pl = html.replace("{{%CONTENT%}}", productHTMLArray.join(""));
      res.statusCode = 200;
      res.end(pl);
    } else {
      // Convert the query.id to a number for comparison
      const productId = parseInt(query.id, 10); // Use base 10 for conversion
      const product = data.find((prod) => prod.id === productId);

      if (product) {
        // If product found, render the detailed product page using index2
        let productDetail = replaceHtml(index2, product);
        res.statusCode = 200;
        res.end(html.replace("{{%CONTENT%}}", productDetail));
      } else {
        // If product not found, show a 404 page
        res.statusCode = 404;
        res.end(html.replace("{{%CONTENT%}}", "Error: Product not found"));
      }
    }
  } else {
    // Handle 404 for unknown paths
    res.statusCode = 404;
    res.end(html.replace("{{%CONTENT%}}", "Error: 404 Page Not Found"));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
