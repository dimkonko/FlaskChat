import sys
import os
from flask import Flask
from src.views.mainview import mainview
from src.views.chatview import chatview


#sys.path.append(u"/home/dimkonko/env/FlaskBlog")

app = Flask(__name__)
app.secret_key = os.urandom(27)

app.register_blueprint(mainview)
app.register_blueprint(chatview)


if __name__ == "__main__":
    app.debug = True
    app.run()