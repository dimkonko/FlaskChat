import sys
from flask import Flask
from src.views.mainview import mainview


#sys.path.append(u"/home/dimkonko/env/FlaskBlog")

app = Flask(__name__)
app.register_blueprint(mainview)


if __name__ == "__main__":
    app.debug = True
    app.run()