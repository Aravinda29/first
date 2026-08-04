function sayhello() {
    console.log("hello");
}

let id = setInterval(() => {
    sayhello();
}, 2000);

setTimeout(() => {
    clearInterval(id);
}, 7000);