const http = require("http");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const app = require("./app");
const { connectToDb, syncDb } = require("./config/mysqldb");

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

// Add database connection

server.listen(PORT, async function () {
  // Connect to database
  await connectToDb();
  // await syncDb();

  console.log(`Server running on port ${PORT}`);
});
