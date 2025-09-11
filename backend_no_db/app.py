from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow frontend requests

# temporary in-memory storage
messages = []

@app.route("/messages", methods=["GET"])
def get_messages():
    return jsonify(messages)

@app.route("/messages", methods=["POST"])
def add_message():
    data = request.json
    message = {"id": len(messages) + 1, "text": data.get("text")}
    messages.append(message)
    return jsonify(message), 201

if __name__ == "__main__":
    app.run(debug=True)