import sys
import os
from flask import Flask, session
from flask.ext.socketio import SocketIO, emit, join_room, leave_room

from src.views.mainview import mainview
from src.views.chatview import chatview


#sys.path.append(u"/home/dimkonko/env/FlaskBlog")

app = Flask(__name__)
app.secret_key = os.urandom(27)

app.register_blueprint(mainview)
app.register_blueprint(chatview)

app.debug = True

sock = SocketIO(app)


@sock.on('connect', namespace='/c')
def test_connect():
    emit('my response', 
		 {'data': session["username"] + ' connected to the chat'})

@sock.on('disconnect', namespace='/c')
def test_disconnect():
    print('Client disconnected')

@sock.on('broadcast', namespace='/c')
def test_message(message):
	print "Broadcast message: "
	print message
	emit('my response',
		 {'data': session["username"] + ": " + message['data']},
		 broadcast=True
		)


if __name__ == "__main__":
    sock.run(app)