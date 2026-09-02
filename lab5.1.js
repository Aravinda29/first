const fs = require("fs");
const readableStream = fs.createReadStream("input.txt", {
  encoding: "utf8",
});

const writableStream = fs.createWriteStream("output.txt", {
  encoding: "utf8",
});

readableStream.on("data", (chunk) => {
  console.log("Reading chunk:", chunk);
  writableStream.write(chunk);
});

readableStream.on("end", () => {
  writableStream.end();
  console.log("Reading completed.");
});

readableStream.on("error", (err) => {
  console.error("Read error:", err.message);
});

writableStream.on("error", (err) => {
  console.error("Write error:", err.message);
});

writableStream.on("finish", () => {
  console.log("Data successfully written to output.txt");
});
