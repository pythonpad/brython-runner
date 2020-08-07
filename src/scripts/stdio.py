import browser
import sys

class StdOutStream:
    def write(self, data=''):
        browser.self.stdoutWrite(str(data))

    def flush(self):
        browser.self.stdoutFlush()


class StdErrStream:
    def write(self, data=''):
        browser.self.stderrWrite(str(data))

    def flush(self):
        browser.self.stderrFlush()
        
def raise_input_error():
    raise NotImplementedError('Standard input support is turned off. Please contact the website administrator for further information.')

sys.stdout = StdOutStream()
sys.stderr = StdErrStream()
browser.self.raiseInputError = raise_input_error