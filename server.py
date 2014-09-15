import time

from threading import Thread
from flask import session
from flask.ext.socketio import SocketIO, emit, join_room, leave_room, send

from flask_app import app
from src.models.newsmodel import NewsModel


sock = SocketIO(app)

rooms = ["main", "news"]


def background_thread():
	count = 0
	news_model = NewsModel()
	while True:
		time.sleep(5)
		count += 1
		news = news_model.get_rand_news()
		news = "Server: " + news["title"] + ".\nCheck it out: " +\
				news["link"]
		print "Sending news: " + news
		sock.emit(
			'server_response',
            {'news': news, 'count': count},
            namespace='/c', room="news"
        )

thread = Thread(target=background_thread)
thread.start()


@sock.on("connect", namespace="/c")
def test_connect():
	if "username" not in session:
		return
	get_channels()
	emit(
    	"server_response", 
		"Welcome. Choose the room to enter"
	)

@sock.on("disconnect", namespace="/c")
def test_disconnect():
    print "Client disconnected"

@sock.on("room_msg", namespace="/c")
def test_message(data):
	user_room = data["room"]
	message = data["message"]
	username = session["username"]
	emit(
		"server_response",
		username + ": " + message,
		broadcast=True,
		room=user_room
	)

@sock.on("create_room", namespace="/c")
def on_join(data):
	username = session["username"]
	new_room = data["data"]
	for room in rooms:
		if new_room == room:
			emit("join", "This room is already exists")
			return
	rooms.append(new_room)

@sock.on("join", namespace="/c")
def on_join(data):
	new_room = data["room"]
	session["room"] = new_room

	join_room(new_room)
	get_channels()
	emit(
		"server_response",
		session["username"] + " has entered the room " + new_room,
		broadcast=False,
		room=new_room
	)

@sock.on("leave_room", namespace="/c")
def on_leave():
    username = session["username"]
    room = session["room"]
    emin(
    	"server_response",
    	username + " has left the room " + room,
    	room=room
    )
    leave_room(room)

@sock.on("search_channel", namespace="/c")
def search_channel(msg):
	channels = list()
	for room in rooms:
		if msg in room.name:
			channels.append(room.name)
	emit(
		"get_channels",
		{"data": channels},
		broadcast=False
	)

@sock.on("update_channels", namespace="/c")
def update_channels(msg):
	get_channels()

def get_channels():
	channels = [r for r in rooms]
	emit(
		"get_channels",
		{"data": channels},
		broadcast=True
	)
