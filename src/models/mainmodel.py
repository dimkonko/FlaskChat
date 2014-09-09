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
		sql = "INSERT INTO users(nickname, email, password) " +\
		      "VALUES('{0}', '{1}', '{2}');".format(
		            user_form["nickname"],
		            user_form["email"].
		            user_form["passwd"]
		            )
		db = self.conn()
		cursor = db.cursor()
		cursor.execute(sql)
		db.commit()
		db.close()
