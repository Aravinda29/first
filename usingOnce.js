const EventEmitter=require("events");
const evente1=new EventEmitter();
evente1.once("start",()=>{
    console.log("Application started....");
});
evente1.emit("start");
evente1.emit("start");