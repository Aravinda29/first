function simpleTimeout(consoleTimer) {
    console.timeEnd(consoleTimer);
}

console.time("Two seconds");
setTimeout(simpleTimeout, 2000, "Two seconds");

console.time("one second");
setTimeout(simpleTimeout, 1000, "one second");

console.time("Five seconds");
setTimeout(simpleTimeout, 5000, "Five seconds");