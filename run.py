from flask import Flask
from src.view.main import mainview

app = Flask(__name__)
app.register_blueprint(mainview)


if __name__ == "__main__":
    app.debug = True
    app.run()