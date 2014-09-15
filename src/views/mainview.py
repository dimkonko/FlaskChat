from flask import (Blueprint, render_template, request, redirect,
				   session, jsonify)
from ..models.mainmodel import MainModel

mainview = Blueprint("mainview", __name__,
					 template_folder="../templates")

mainmodel = MainModel()

@mainview.route("/")
def index():
	isLogedIn = False
	isAdmin = False
	if "username" in session:
		isLogedIn = True
		if session["username"] == "admin":
			isAdmin = True
	return render_template("index.html",
			isLogedIn=isLogedIn, isAdmin=True)

@mainview.route("/signup", methods=["GET", "POST"])
def signup():
	if "username" in session:
		return redirect("/")
	if request.method == "POST":
		if mainmodel.add_user(request.form):
			#session["username"] = request.form["nickname"]
			session["username"] = request.form["nickname"]
			return jsonify({
				"redirect": "/chat"
			})
		else:
			return jsonify({
				"error_msg": "This email or nickname is already exists"
			})
	return render_template("signup.html")

@mainview.route("/login", methods=["GET", "POST"])
def login():
	if "username" in session:
		return redirect("/")
	if request.method == "POST":
		nickname = mainmodel.get_user(request.form)
		if nickname:
			session["username"] = nickname
			return jsonify({
					"redirect": "/chat"
				})
		else:
			return jsonify({
				"error_msg": "Wrong email or password"
			})
	return render_template("login.html")

@mainview.route("/logout")
def logout():
	session.pop("username", None)
	return redirect("/")
