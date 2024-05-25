from flask import Flask
from routes import routes  # Import the blueprint

app = Flask(__name__)
app.register_blueprint(routes)  # Register the blueprint

@app.route('/')
def index():
    return "Welcome to RetireEZ API!"

if __name__ == '__main__':
    app.run(debug=True)