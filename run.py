import os

from flask_app import app
from src.chatserver.chatserver import sock

port = int(os.environ.get("PORT", 5000))
sock.run(app, host="0.0.0.0", port=port)