import os

from flask_app import app
from server import sock

port = int(os.environ.get("PORT", 5000))
sock.run(app, host="0.0.0.0", port=port)