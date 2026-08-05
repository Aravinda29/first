console.log("program started execution");
process.nextTick(()=>{
    console.log("nextTick callback");
});
console.log("program ended");