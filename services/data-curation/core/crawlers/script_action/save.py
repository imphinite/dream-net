from .script_action import ScriptAction
from selenium.webdriver.common.by import By
import psycopg2

# Save HTML to 
class SaveAction(ScriptAction):
    def perform(self):
        html = self.driver.page_source

        


        insert_sql = """
            INSERT INTO 
            """

        # TODO: Validate html

        try:
            self.connect()

            # Create a cursor
            cur = self.conn.cursor()





        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if self.conn is not None:
                self.conn.close()
                print('Database connection closed.')


        # Breathe after action
        self.breathe()


    def connect(self):
        self.conn = None

        try:
            # Configs
            database = self.action['database'] if 'database' in self.action else 'postgres'

            # Establish db conn
            self.conn = psycopg2.connect(
                host="localhost",
                port=5433,
                database=database,
                user="postgres",
                password="postgres")

            # Create a cursor
            cur = self.conn.cursor()
            # Execute a statement
            print('PostgreSQL database version:')
            cur.execute('SELECT version()')
            # display the PostgreSQL database server version
            db_version = cur.fetchone()
            print(db_version)
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            cur.close()
