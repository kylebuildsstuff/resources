// Load a stylesheet
import '../styles/main.css';

// Import a couple modules for testing.
import { sayHelloTo } from './modules/mod1';
// NOTE: modules/mod1 has two functions, but TREE-SHAKING imports only sayHelloTo in the final build,
// whereas normal bundlers would import both functions in mod1.js for the final build in build/js/main.min.js
import addArray from './modules/mod2';

// Add a debugger
import debug from 'debug';
const log = debug('app:log');

// Disable logging in production
if (ENV !== 'production') {
  debug.enable('*');
  log('Logging is enabled!');  // because this is a node module, it's commonJS
  // therefore when you bundle it, it treates debug as an external dependency (assumes it will be passed into the global window).
  // so we need some rollup plugins that will load node packages from the node_modules (rollup-plugin-node-resolve)
  // and another module that transpiles commonJS modules to es2015 modules without choking (rollup-plugin-commonjs)
} else {
  debug.disable();
}

// Run some functions from our imported modules.
const result1 = sayHelloTo('Jason');
const result2 = addArray([1, 2, 3, 4]);

// Print the results on the page.
const printTarget = document.getElementsByClassName('debug__output')[0];

printTarget.innerText = `sayHelloTo('Jason') => ${result1}\n\n`;
printTarget.innerText += `addArray([1, 2, 3, 4]) => ${result2}`;
