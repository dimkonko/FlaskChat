import os
from flask import Flask

from src.views.mainview import mainview
from src.views.chatview import chatview

app = Flask(__name__)
app.secret_key = os.urandom(27)

app.register_blueprint(mainview)
app.register_blueprint(chatview)
