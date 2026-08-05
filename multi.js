const EventEmitter=require("events");
const Event=new EventEmitter();
Event.on("Login",()=>{
    console.log("checking userName.");
});
Event.on("Login",()=>{
    console.log("checking password.");
});
Event.on("Login",()=>{
    console.log("login successful.");
});
Event.emit("Login");