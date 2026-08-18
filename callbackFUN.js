function greet(name, callback) {
    console.log("processing...");
    callback(name);
}

function displayGreeting(name) {
    console.log("hello " + name + "!");
}

greet("Aravinda", displayGreeting);