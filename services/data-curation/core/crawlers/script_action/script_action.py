from selenium.webdriver.common.by import By
import time

class ScriptAction:
    def __init__(self, action, driver):
        self.action = action
        self.driver = driver

    # Get action type
    def get_type(self):
        return self.action['type']


    # Perform action
    def perform(self):
        # Locate target element
        target_xpath = self.action['target']
        element = self.driver.find_element(By.XPATH, target_xpath)

        # default - click action
        element.click()

        # Breathe after action
        self.breathe()


    # Breathe
    def breathe(self):
        breathe = self.action.get('breathe', 1)
        time.sleep(breathe)