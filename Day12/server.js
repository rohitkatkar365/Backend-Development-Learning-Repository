const denv = require("dotenv");
denv.config("./.env");

const app = require("./app");

const port = process.env.port;
const url = `127.0.0.1`;
app.listen(port, url, () => {
  console.log(`Server Started ${url}:${port}`);
});
