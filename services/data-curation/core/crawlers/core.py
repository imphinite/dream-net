from dis import dis
from faulthandler import disable
from site_config import SiteConfig
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from script_action.read import ReadAction
from script_action.input import InputAction
from script_action.click import ClickAction
from script_action.select import SelectAction
from script_action.save import SaveAction
from script_action.form_request import FormRequest
import time


class Crawler:
    def __init__(self, site, verbose=False):
        self.site = site
        self.verbose = verbose
        self.batch_processes = {}

    def open_browser(self):
        self.driver = None
        try:
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
                time.sleep(5)

                jsrequest = '''
                    const formData = new FormData();
                    formData.append("series", "vonuslar.de");
                    formData.append("mode", "OR");
                    formData.append("query", "a");
                    formData.append("d", "0001");
                
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', 'show.cgi', false);
                    xhr.send(formData);
                    return xhr.response;'''

                result = self.driver.execute_script(jsrequest)

                print('result --------', result)

                # Wait for page load
                time.sleep(5)
        finally:
            if self.driver is not None:
                self.driver.close()
                self.driver.quit()


    def run(self):
        if (self.verbose):
            print('run')

        self.open_browser()
        # self.run_script()

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
        action_type = action['type'] if action['type'] else 'click'
        disabled = action['disabled'] if action['disabled'] else False

        if (disabled):
            print('Action is disabled. Skipping.')
            return

        # Script action mapping
        actions = {
            'form_request': FormRequest(
                action,
                driver=self.driver,
                options={
                    'form_action': action['form_action'] if 'form_action' in action else None,
                    'form_body': action['form_body'] if 'form_body' in action else None
                }),
            'save': SaveAction(action, driver=self.driver),
            'read': ReadAction(action, driver=self.driver),
            'input': InputAction(action, driver=self.driver),
            'select': SelectAction(
                action,
                driver=self.driver,
                options={
                    'start_index': 0
                }),
            'click': ClickAction(action, driver=self.driver)
        }
        
        # Perform script action
        script_action = actions[action_type]
        script_action.perform()


if __name__ == '__main__':
    print('Running from cli')
    verb=True
    
    dreambank = SiteConfig('dream_bank', verbose=verb)

    dreambank_crawler = Crawler(dreambank, verbose=verb)
    dreambank_crawler.run()

    

    print('end')
