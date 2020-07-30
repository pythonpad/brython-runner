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


sys.stdout = StdOutStream()
sys.stderr = StdErrStream()
