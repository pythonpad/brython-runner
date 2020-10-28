# Brython Runner

A JavaScript library that runs Python 3 code on web browsers based on [Brython](https://brython.info/). 

Brython is designed to replace JavaScript in the Web; it allows you to use Python 3 instead of JavaScript as the scripting language for your web application. Brython does that by translating Python code into the equivalent JavaScript code.

However, if you want to run *user-written Python code* in your web application, it's not so simple to do so. Use **Brython Runner** for that.

## Installation

### Node.js

```
$ npm install brython-runner
```

## Usage

### Browser

The simple way to use it in a browser:

```html
<script src="lib/brython-runner.bundle.js"></script>
<script>
    async function runPythonCode() {
        const runner = new BrythonRunner({
            stdout: {
                write(content) {
                    console.log('StdOut: ' + content);
                },
                flush() {},
            },
            stderr: {
                write(content) {
                    console.error('StdErr: ' + content);
                },
                flush() {},
            }
        });
        console.log('Run Code:');
        await runner.runCode('print("hello world")\nprint("from Brython Runner")');
        console.log('Done.');
    }
    runPythonCode();
</script>
```

### Node.js

It also works within a CommonJS environment.
For example:

```javascript
var BrythonRunner = require('brython-runner/lib/brython-runner.js').default;
```

or with `import` syntax, 

```javascript
import BrythonRunner from 'brython-runner/lib/brython-runner.js';
```

## Usage Examples

### Simple

```javascript
const runner = new BrythonRunner({
    stdout: {
        write(content) {
            console.log('StdOut: ' + content);
        },
        flush() {},
    },
    stderr: {
        write(content) {
            console.error('StdErr: ' + content);
        },
        flush() {},
    }
});
await runner.runCode('print("hello world")');
```

### Debug Level

Set `debug` option to explicitly set the debug level for Brython. See [this page](https://brython.info/static_doc/en/options.html) from the Brython website for more information.

- 0 (default) : no debugging. Use this when the application is debugged, it slightly speeds up execution
- 1 : error messages are printed in the browser console (or to the output stream specified by sys.stderr)
- 2 : the translation of Python code into Javascript code is printed in the console
- 10 : the translation of Python code and of the imported modules is printed in the console

```javascript
const runner = new BrythonRunner({ debug: 10 });
```

### Init Callback

Use `onInit` option to set a function that is called after the web worker initialization. 

```javascript
const runner = new BrythonRunner({
    onInit() {
        console.log('Runner web worker is ready!');
    },
});
```

## Development

To serve the exmaple web page for development, run:

```
$ npm dev
```

Check out http://localhost:4000 on your web browser to see the example web page.

To build the library, run:

```
$ npm build
```

