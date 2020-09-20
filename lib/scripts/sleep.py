import browser
import time

def __sleep__(duration):
    # Busy wait with server-aided wait.
    target_ts = time.time() + duration
    if duration > 3 and browser.self._brHangerUrl:
        # Server-aided wait.
        browser.self._brHangSleep(duration - 1)
    # Busy wait
    while time.time() < target_ts:
        pass
    
time.sleep = __sleep__