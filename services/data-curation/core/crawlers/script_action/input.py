from .script_action import ScriptAction
from selenium.webdriver.common.by import By

class InputAction(ScriptAction):
    def perform(self):
        # Locate target element
        target_xpath = self.action['target']
        element = self.driver.find_element(By.XPATH, target_xpath)

        # Type in preset value
        value = self.action['value']
        element.send_keys(value)

        # Breathe after action
        self.breathe()
