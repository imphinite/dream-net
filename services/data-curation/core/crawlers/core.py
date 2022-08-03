from site_config import SiteConfig
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time


class Crawler:
    def __init__(self, site, verbose=False):
        self.site = site
        self.verbose = verbose

    def open_browser(self):
        # headless browser
        if (self.site.config['mode'] == "headless"):
            if (self.verbose):
                print("headless")
            
            # init headless
            options = Options()
            options.headless = True
            
            if (self.verbose):
                options.headless = False

            self.driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
            self.driver.get(self.site.config['base_url'])

            # Wait for page load
            time.sleep(5)


    def run(self):
        if (self.verbose):
            print('run')

        self.open_browser()
        self.run_script()

        # time.sleep(5)
        # self.driver.close()


    def run_script(self):
        script = self.site.config['script']
        for action_name, action in script.items():
            if (self.verbose):
                description = action['description'] if action['description'] else action_name
                print('>> Performing action:', description)
            self.perform_action(action)


    def perform_action(self, action):
        action_type = action['type']
        target_xpath = action['target']

        # Locate target element
        element = self.driver.find_element(By.XPATH, target_xpath)

        # text input action
        if (action_type == 'input'):
            value = action['value']
            element.send_keys(value)
            # Breathe
            breathe = action.get('breathe', 2)
            time.sleep(breathe)
            return

        # select action
        if (action_type == 'select'):
            batch_size = action['batch']['size']
            batch_target_xpath_root = action['batch']['targets']
            batch_target_xpath_template = "({root})[{index}]"
            batch_elements = []

            for i in range(batch_size):
                batch_target_xpath = batch_target_xpath_template.format(
                    root = batch_target_xpath_root,
                    index = i + 1)

                element = self.driver.find_element(By.XPATH, batch_target_xpath)
                ActionChains(self.driver).key_down(Keys.CONTROL).click(element).key_up(Keys.CONTROL).perform()
                batch_elements.append(element)
                # Breathe
                breathe = action.get('breathe', 1)
                time.sleep(breathe)
            return

        # default - click action
        element.click()
        # Breathe
        breathe = action.get('breathe', 1)
        time.sleep(breathe)


if __name__ == '__main__':
    print('Running from cli')
    verb=True
    
    dreambank = SiteConfig('dream_bank', verbose=verb)

    dreambank_crawler = Crawler(dreambank, verbose=verb)
    dreambank_crawler.run()

    

    print('end')
