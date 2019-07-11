// code away!
const server = require("./server.js");

// server.listen(4001, () => {
//   console.log("\n* Server Running on http://localhost:4001 *\n");
// });
const port = process.env.PORT || 4001;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
