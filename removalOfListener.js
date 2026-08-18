const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

function welcome(){
    console.log("welcome");
}

eventEmitter.on("login", welcome);
eventEmitter.emit("login");

eventEmitter.removeAllListeners("login", welcome);
eventEmitter.emit("login");