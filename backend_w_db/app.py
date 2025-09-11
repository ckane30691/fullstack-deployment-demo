import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Message

app = Flask(__name__)
CORS(app)

# Use DATABASE_URL from Render
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

with app.app_context():
    db.create_all()   # make sure table exists

@app.route("/messages", methods=["GET"])
def get_messages():
    messages = Message.query.all()
    return jsonify([{"id": m.id, "text": m.text} for m in messages])

@app.route("/messages", methods=["POST"])
def add_message():
    data = request.json
    message = Message(text=data.get("text"))
    db.session.add(message)
    db.session.commit()
    return jsonify({"id": message.id, "text": message.text}), 201

if __name__ == "__main__":
    app.run(debug=True)