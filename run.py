import sys
import os
import redis
from flask import Flask, session
from flask.ext.socketio import SocketIO, emit, join_room, leave_room, send

from src.views.mainview import mainview
from src.views.chatview import chatview

#sys.path.append(u"/home/dimkonko/env/FlaskBlog")

POOL = redis.ConnectionPool(host='10.0.0.1', port=6379, db=0)

os.environ["REDIS_POOL_HOST"] = "0.0.0.0"
os.environ["REDIS_POOL_PORT"] = "5000"
os.environ["REDIS_POOL_DB"] = "0"

app = Flask(__name__)
app.secret_key = os.urandom(27)

app.register_blueprint(mainview)
app.register_blueprint(chatview)

app.debug = True

sock = SocketIO(app)


class Room(object):
    def __init__(self, name, owner):
        self.name = name
        self.owner = owner
        self.users = list()

    def add_user(self, user):
        self.users.append(user)

    def broadcast(self, msg):
        for user in self.users:
            user.write_message(msg)

rooms = list()
rooms.append(Room("main", "admin"))

@sock.on('connect', namespace='/c')
def test_connect():
	join_room("main")
	if "username" not in session:
		return
	emit(
    	'my response', 
		session["username"] + ' connected to the main room'
	)

@sock.on('disconnect', namespace='/c')
def test_disconnect():
    print('Client disconnected')

@sock.on('room msg', namespace='/c')
def test_message(data):
	print "Broadcast data: "
	print data
	user_room = data["room"]
	message = data["message"]
	username = session["username"]
	emit(
		"my response",
		username + ": " + message,
		broadcast=True,
		room=user_room
	)

@sock.on('join', namespace='/c')
def on_join(data):
	print data
	username = session['username']
	new_room = data['data']
	for room in rooms:
		if new_room == room.name:
			emit("join", "This room is already exists")
			return
	rooms.append(Room(new_room, username))
	leave_room("main")
	join_room(new_room)
	print "Joined"
	emit(
		"join",
		username + " has entered the room " + new_room,
		broadcast=False
	)

@sock.on('leave', namespace='/c')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room ' + room, room=room)


if __name__ == "__main__":
    sock.run(app)