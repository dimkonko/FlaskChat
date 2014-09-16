from usermodel import UserModel

class MainModel(object):
	def __init__(self):
		self.user = UserModel()

	def add_user(self, user_form):
		is_exists = self.user.is_exists(user_form["nickname"],
									 user_form["email"])
		if is_exists:
			return False
		else:
			self.user.add(nickname=user_form["nickname"],
						  email=user_form["email"],
						  password=user_form["hash"])
			return True

	def get_user(self, login_form):
		data = self.user.get(email=login_form["email"])

		if not data:
			return False

		user = data[0]
		user_dict = {
			"nickname": user[1],
			"password": user[3]
		}

		if user_dict["password"] == login_form["hash"]:
			return user_dict["nickname"]
		else:
			return False
