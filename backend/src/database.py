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
    
    cursor.execute('DROP TABLE IF EXISTS policy')    
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
    
    SAMPLE = [{
    "policy_name": "AVIVA MyProtector-Term Plan",
    "sum_assured": {
        "death": "0",
        "total_permanent_disability": "20000",
        "critical_illness": "0",
        "health": "100000",
        "accidental_death": "0",
        "accidental_tpd": "300000"
         }
    }, 
    {
    "policy_name": "ManuLife ReadyProtect",
    "sum_assured": {
        "death": "300000",
        "total_permanent_disability": "0",
        "critical_illness": "100000",
        "health": "0",
        "accidental_death": "0",
        "accidental_tpd": "0"
         }
    }, 
    {
    "policy_name": "NTUC Income PA Assurance",
    "sum_assured": {
        "death": "0",
        "total_permanent_disability": "500000",
        "critical_illness": "0",
        "health": "0",
        "accidental_death": "0",
        "accidental_tpd": "0"
         }
    }]
    
    for data in SAMPLE:
        policy_name = data["policy_name"]
        fields = data["sum_assured"]  
        cursor.execute('''
                    INSERT INTO policy (id,
                                        death, 
                                        total_permanent_disability, 
                                        critical_illness, 
                                        health, 
                                        accidental_death, 
                                        accidental_tpd) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)''', 
                    (policy_name,
                        fields['death'], 
                        fields['total_permanent_disability'], 
                        fields['critical_illness'], 
                        fields['health'], 
                        fields['accidental_death'], 
                        fields['accidental_tpd']))    
    # Commit the changes and close the connection
    conn.commit()
    conn.close()