from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from .script_action import ScriptAction

class SelectAction(ScriptAction):
    # Perform action
    def perform(self):
        batch_size = self.action['batch']['size']
        batch_target_xpath_root = self.action['batch']['targets']
        batch_target_xpath_template = "({root})[{index}]"
        batch_elements = []

        for i in range(batch_size):
            batch_target_xpath = batch_target_xpath_template.format(
                root = batch_target_xpath_root,
                index = i + 1)

            element = self.driver.find_element(By.XPATH, batch_target_xpath)
            ActionChains(self.driver).key_down(Keys.CONTROL).click(element).key_up(Keys.CONTROL).perform()
            batch_elements.append(element)

            # Breathe after action
            self.breathe()
