import MySQLdb as mdb

from custom_modules.ConfigLoader import ConfigLoader

class MainModel(object):
	def __init__(self):
		#config = ConfigLoader(sys.path[0] + "/conf/db_conf.ini").load()
		config = ConfigLoader("conf/db_conf.ini").load()
		self.host = config["host"]
		self.user = config["user"]
		self.passwd = config["passwd"]
		self.db = config["db"]

	def conn(self):
		return mdb.connect(host=self.host, user=self.user,
                   passwd=self.passwd, db=self.db)

	def add_user(self, user_form):
		email = user_form["email"]
		sql = "INSERT INTO users(nickname, email, password) " +\
		      "VALUES('{0}', '{1}', '{2}');".format(
		            user_form["nickname"],
		            email.encode("utf-8"),
		            user_form["passwd"]
		            )
		db = self.conn()
		cursor = db.cursor()
		cursor.execute(sql)
		db.commit()
		db.close()

	def get_user(self, login_form):
		email = login_form["login"]
		sql = "SELECT nickname, email, password FROM users WHERE email = '{0}'".format(
			email)

		db = self.conn()
		cursor = db.cursor()
		cursor.execute(sql)
		data = cursor.fetchall()
		db.commit()
		db.close()

		if not data:
			return False

		user = data[0]

		user_dict = {
			"nickname": user[0],
			"email": user[1],
			"password": user[2]
		}

		if user_dict["password"] == login_form["passwd"]:
			return user_dict
		else:
			return False
