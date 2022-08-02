from site_config import SiteConfig
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time


class Crawler:
    def __init__(self, site, verbose=False):
        self.site = site
        self.verbose = verbose

    def run(self):
        if (self.verbose):
            print('run')

        # headless browser
        if (self.site.config['browser'] == "headless"):
            if (self.verbose):
                print("headless")
            
            # init headless
            chrome_options = Options()
            chrome_options.headless = True
            
            if (self.verbose):
                chrome_options.headless = False

            driver = webdriver.Chrome(ChromeDriverManager().install(), chrome_options=chrome_options)
            driver.get(self.site.config['base_url'])

            time.sleep(5)

            driver.close()



if __name__ == '__main__':
    print('Running from cli')
    verb=True
    
    dreambank = SiteConfig('dream_bank', verbose=verb)

    dreambank_crawler = Crawler(dreambank, verbose=verb)
    dreambank_crawler.run()

    

    print('end')
