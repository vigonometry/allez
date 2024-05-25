from flask import Flask
from routes import routes  # Import the blueprint
from database import init_db
from flask_cors import CORS


app = Flask(__name__)
app.register_blueprint(routes)  # Register the blueprint

CORS(app)


# Initialize the database when the app starts
with app.app_context():
    init_db()

@app.route('/')
def index():
    return "Welcome to RetireEZ API!"

if __name__ == '__main__':
    app.run(debug=True)