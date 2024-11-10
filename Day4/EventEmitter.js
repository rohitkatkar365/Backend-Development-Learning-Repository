const EventEmitter = require('events');

// Create a new instance of EventEmitter
const myEmitter = new EventEmitter();

// Register an event listener
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit the event
myEmitter.emit('greet', 'Alice'); // Output: Hello, Alice!
myEmitter.emit('greet', 'Bob');   // Output: Hello, Bob!
