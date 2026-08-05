const EventEmitter = require("events");

const e1 = new EventEmitter();

e1.on("greet", () => {
    console.log("Welcome to Node.js");
});

e1.emit("greet");