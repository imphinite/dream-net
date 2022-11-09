from selenium.webdriver.common.by import By
from .script_action import ScriptAction
import pydash
import re

class ReadAction(ScriptAction):
    def perform(self):
        new_tab = len(self.driver.window_handles) > 1
        if (new_tab):
            self.driver.switch_to.window(self.driver.window_handles[1])

        # Locate target elements
        target_element_xpath = self.action['target']
        # 
        root_elements = self.driver.find_elements(By.XPATH, target_element_xpath)
        result_array = []

        test_max = 5
        test_counter = 1

        for root_element in root_elements:
            if (test_counter > test_max):
                break

            # Parse fields
            field_parser_config = self.action['fields']
            parser = ContentParser(element=root_element, config=field_parser_config)
            result = parser.parse_all()

            result_array.append(result)
            
            # Test control
            test_counter = test_counter + 1
            
        # Breathe after action
        self.breathe()

        return result_array


class ContentParser:
    def __init__(self, element, config):
        self.element = element
        self.config = config
        self.raw = self.get_innertext().splitlines()
        self.result = {}


    def parse_all(self):
        for field_name, field_parser_config in self.config.items():
            parser = field_parser_config['parser']
            parser_mapping = {
                'array': self.get_data_by_item_index(config=field_parser_config),
                'regex': self.get_data_by_regex(config=field_parser_config),
            }

            self.result[field_name] = parser_mapping[parser]

        return self.result


    def get_data_by_item_index(self, config):
        invert = config['invert'] if 'invert' in config else False
        indices = config['index'] if 'index' in config else [0]

        if (type(indices) != list):
            indices = [indices]

        if (invert):
            return pydash.without(pydash.pull_at(self.raw, *indices), '')

        return self.raw[indices[0]].strip()


    def get_data_by_regex(self, config):
        index = config['index'] if 'index' in config else 0
        pattern = config['pattern'] if 'pattern' in config else None

        if (pattern == None):
            return None

        raw_content = self.raw[index]
        match = re.search(pattern, raw_content)
        return match.group(1).strip()


    def get_html(self):
        return self.element.get_attribute('innerHTML')


    def get_innertext(self):
        return self.element.get_attribute('innerText')
