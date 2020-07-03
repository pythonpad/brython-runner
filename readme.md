# Brython Runner

This is a JavaScript library to run Python 3 code on client browser using [Brython](https://brython.info/). 

## Development

Before running any scripts, install Node and Yarn on your system.

To install all dependencies, run: 

```
$ yarn install
```

To serve the example web page for development, run:

```
$ yarn dev
```

Check out http://localhost:4000 on your web browser to see the example web page.

To build the library, run:

```
$ yarn build
```

Remember to build-and-commit when you update the project. 

## Import and Use

### Basic usage

The easiest way to use **Brython Runner** is to simply load the bundle script under `./lib` in the distribution. For example:

```html
<script src="lib/brython-runner.bundle.js"></script>
```

Having this script tag, a Brython Runner instance can be created like this:

```javascript
var runner = new BrythonRunner();
```

If you want to use brython-runner.js in CommonJS environment, you can require the BrythonRunner class from `./lib/elixercise.js`. For example:

```javascript
var BrythonRunner = require('brython-runner/lib/brython-runner.js').default;
```

or with `import` syntax, 

```javascript
import BrythonRunner from 'brython-runner/lib/brython-runner.js';
```

For a working example, run `$ yarn dev` script and check out the example web page. This shows the `./index.html` file rendered on the browser with all dependencies ready.

### BrythonRunner

`BrythonRunner` class allows you to run Python 3 code based on Brython's python-to-javascript transpiler. 

#### `var runner = new BrythonRunner(options)`

`BrythonRunner` class stores the running environment for your Python code and allows you to run the code using Brython library. Available options are described below. 

```javascript
var options = {
    codeName: 'main.py', 
    codeCwd: '.',
    staticUrl: '/static',
    paths: [],
    postInitScripts: [
        'import brythonsync',
    ],
    stdout: {
        write(content) {
            console.log(content)
        },
        flush() { },
    },
    stderr: {
        write(content) {
            console.error(content)
        },
        flush() { },
    },
    onMsg(type, value) {
        console.log('Got a message:', type, value)
    }
};
```

These are the default value of accepted option values.

*codeFilename*

When you run Python code with `runner.runCode()`, this will be used as `__name__` and also shown as a filename in error message. 

*codeCwd*

This will be shown as a path of the executed file in error message.

*staticUrl*

Brython requires essential files to be accessible from the server. Serve the `./static` directory within the same domain (CORS) and provide the path to the directory as `staticUrl`. 

*paths*

Add paths for additional dependencies. The paths provided here will be included in `sys.path`.

*postInitScripts*

These Python codes are run after initializing the runner session. 

*stdout*

Provide an object with `write(content)` and `flush()` functions. This will be used when data comes out from the standard output stream.

*stderr*

Provide an object with `write(content)` and `flush()` functions. This will be used when data comes out from the standard error stream.

*onMsg*

This function will be called when a message with a non-predefined type is received from the Brython runner worker. `type` and `value` parameter will be provided.

#### `async runner.runCode(src)`

This tells the Brython runner instance to run the Python code content in `src`. The runner will run the given code using web worker, and send data to `stdout` and `stderr` stream when requested. 

**Example**
```javascript
await runner.runCode('print("hello world")');
console.log(`says the Python code.`);