import os
import redis

from usermodel import UserModel

class ChatModel(object):
	def __init__(self):
		self.server = redis.Redis("0.0.0.0")
		self.server.sadd("rooms", "main")
		self.user = UserModel()

	def get_user(self, nickname):
		self.user.get(nickname=nickname)

	def get_rooms(self):
		rooms = self.server.smembers("rooms")
		return rooms
