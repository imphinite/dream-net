from .script_action import ScriptAction

class FormRequest(ScriptAction):
    def __init__(self, action, driver, options):
        super().__init__(action, driver)
        self.options = options
        self.initialize()

    
    def initialize(self):
        self.javascript = '''
            const formData = new FormData();'''
        form_action = self.options['form_action'] if 'form_action' in self.options else None
        if form_action is None:
            print('Missing form action.')
            return

        for key, value in self.options['form_body'].items():
            self.append(key, value)

        self.javascript = self.javascript + '''
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '{form_action}', false);
            xhr.send(formData);
            return xhr.response;'''.format(form_action=form_action)


    def append(self, key, value='null'):
        if (key is None):
            return

        template = "formData.append('{key}', '{value}')"
        append_str = template.format(key=key, value=value)

        self.javascript = self.javascript + append_str


    def 


    def perform(self):
        result = self.driver.execute_script(self.javascript)
        return result
