const EventEmitter = require("events");

const e1 = new EventEmitter();

e1.on("grade", (name, marks) => {
    console.log("Name:", name);
    console.log("Marks:", marks);
});

e1.emit("grade", 'Aravinda', '95');

