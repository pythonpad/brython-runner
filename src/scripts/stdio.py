import browser
import sys

class StdOutStream:
    def write(self, data=''):
        browser.self._brStdoutWrite(str(data))

    def flush(self):
        browser.self._brStdoutFlush()


class StdErrStream:
    def write(self, data=''):
        browser.self._brStderrWrite(str(data))

    def flush(self):
        browser.self._brStderrFlush()
        
def raise_input_error():
    raise NotImplementedError('Standard input support is turned off. Please contact the website administrator for further information.')

sys.stdout = StdOutStream()
sys.stderr = StdErrStream()
browser.self._brRaiseInputError = raise_input_error