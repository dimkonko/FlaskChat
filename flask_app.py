import os
import sqlite3
from flask import Flask

from src.views.mainview import mainview
from src.views.chatview import chatview

if not os.path.isfile("db/users.db"):
	"""Check if users db is exists
	If users db doesn't exists -> run sql init script
	"""
	try:
		init_db_script = open("db/db.sql", "r").read()
	except IOError:
		print "Can't open db init script file"
		raise

	if not init_db_script:
		raise Exception("db init script is empty")

	db = sqlite3.connect("db/users.db")
	cursor = db.cursor()
	cursor.execute(init_db_script)
	db.commit()
	db.close()


app = Flask(__name__)
app.debug = False
app.secret_key = os.urandom(27)

app.register_blueprint(mainview)
app.register_blueprint(chatview)
