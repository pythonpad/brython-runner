# Brython Runner

A JavaScript library that runs Python 3 code on web browsers based on [Brython](https://brython.info/). 

Brython is designed to replace JavaScript in the Web; it allows you to use Python 3 instead of JavaScript as the scripting language for your web application. Brython does that by translating Python code into the equivalent JavaScript code.

However, if you want to run *user-written Python code* in your web application, it's not so simple to do so. Use **Brython Runner** for that.

## Demo

See our [demo page](https://pythonpad.github.io/brython-runner/) to see `brython-runner` in action.

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

### Webpack

You can directly require the module if you're using webpack to bundle your project.
For example:

```javascript
var BrythonRunner = require('brython-runner/lib/brython-runner.js').default;
```

or with `import` syntax:

```javascript
import BrythonRunner from 'brython-runner/lib/brython-runner.js';
```

#### Note

The core source of `BrythonRunner` uses [raw-loader](https://webpack.js.org/loaders/raw-loader/) for importing JavaScript and Python scripts as String values. If your working in non-webpack CommonJS environment, be sure to handle import statements with prefix `!!raw-loader!` in the source. 
For example:

```javascript
import stdioSrc from '!!raw-loader!../scripts/stdio.py'
import sleepSrc from '!!raw-loader!../scripts/sleep.py'
import fileioSrc from '!!raw-loader!../scripts/fileio.py'
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

### Files

Use `runCodeWithFiles` method with `onFileUpdate` option to provide files and directories for the Python code. 

```javascript
const files = {
    'hello.py': {
        'type': 'text',
        'body': 'print("hello world")',
    },
    'data/': {
        'type': 'dir',
        'body': '',
    },
    'data/image.gif': {
        'type': 'base64',
        'body': 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    },
    'main.py': {
        'type': 'text',
        'body': 'import hello\nf = open("data/image.gif", "rb")\nf.close()',
    }
};
const runner = new BrythonRunner({
    onFileUpdate(filename, data) {
        files[filename].type = data.type;
        files[filename].body = data.body;
    },
});
runner.runCodeWithFiles(files['main.py'], files);
```

`BrythonRunner.runCodeWithFiles(code, files)` method runs Python `code` with given `files`. Files must be provided as a JavaScript object that contains each file or directory as a key-value pair. 

An object key for a file or a folder represents a path to the file from a virtual *current working directory*. A path for a file should be normalized (`os.path.normpath(path) === path`) and should be inside the current working directory (e.g., `../file.txt` is not allowed). 
If a path is for a **folder**, it should have a trailing slash added to a normalized path. See the `data/` folder in the example code.

A value for a file or a folder should be a JavaScript object that contains values for the keys: `type` and `body`. 
If it is a folder, `type` should be `'dir'` and `body` should be an empty string (`''`). If it is a file, two types are available: `'text'` and `'base64'`. 

Files with `'text'` type should have string type content of the file as the `body` value. Files with `'base64'` type should have the content encoded in **base64** as the `body` value. 

If the files are edited while running the code, a function given as `onFileUpdate` option is called. The path of the edited file is given as the first parameter (`filename`) and the data object with `type` and `body` values is given as the second parameter (`data`).

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

