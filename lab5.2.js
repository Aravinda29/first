const fs = require("fs");

const source = "largefile.txt";
const destination = "copy_largefile.txt";

const readableStream = fs.createReadStream(source);
const writableStream = fs.createWriteStream(destination);

readableStream.pipe(writableStream);

writableStream.on("finish", () => {
    console.log("File copied successfully!");
});

readableStream.on("error", (err) => {
    console.error("Error reading file:", err.message);
});

writableStream.on("error", (err) => {
    console.error("Error writing file:", err.message);
});
