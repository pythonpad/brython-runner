import BrythonRunner from './core/brython-runner';

var globalRef = (typeof this !== "undefined") ? this : window;

if (module.hot) {
    module.hot.accept('./core/brython-runner', () => {
        console.log('Accepting the updated Brython Runner module!')
    })
}

globalRef.BrythonRunner = BrythonRunner
