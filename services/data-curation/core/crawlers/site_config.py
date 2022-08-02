import json

class SiteConfig:
    def __init__(self, site_name, sites_home="./sites/", file_ext="json", verbose=False):
        path_to_config = "%s%s.%s"%(sites_home, site_name, file_ext)

        if (verbose):
            print(">> Loading config from path", path_to_config)

        with open(path_to_config, 'r') as f:
            config = json.load(f)
        self.config = config

        if (verbose):
            print(">> Loaded config:")
            print(json.dumps(self.config, indent=4, sort_keys=True))
