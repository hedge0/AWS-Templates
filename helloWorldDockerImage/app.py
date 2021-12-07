from flask import Flask
import os

# Initialize app
app = Flask(__name__)

# Default app route for basic "Hello World!" response
@app.route("/")
def hello():
    return "Hello World!"


# Set host and port numbers to run app on
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))