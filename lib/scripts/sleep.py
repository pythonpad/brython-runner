import browser
import time

def __sleep__(duration):
    # Busy wait with server-aided wait.
    target_ts = time.time() + duration
    if duration > 2:
        # Server-aided wait.
        browser.self.hangSleep(duration - 1)
    # Busy wait
    while time.time() < target_ts:
        pass
    
time.sleep = __sleep__