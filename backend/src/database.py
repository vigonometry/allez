import sqlite3
import os

# Define the database file path
DATABASE = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app.db')

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # This allows access to columns by name
    return conn


def init_db():
    # Connect to the database
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Create the users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS policy (
            id TEXT PRIMARY KEY,
            death INT NOT NULL,
            total_permanent_disability INT NOT NULL,
            critical_illness INT NOT NULL,
            health INT NOT NULL,
            accidental_death INT NOT NULL,
            accidental_tpd INT NOT NULL
        ) 
    ''')
    
    # Commit the changes and close the connection
    conn.commit()
    conn.close()