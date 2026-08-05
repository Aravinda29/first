const EventEmitter=require("events");
const emitter=new EventEmitter();
emitter.setMaxListeners(5);
for(let i=1;i<=5;i++){
    emitter.on("msg",()=>{
        console.log('listener $ {i} executed');
    });
}
emitter.emit("msg");