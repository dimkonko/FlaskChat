from flask import Blueprint, render_template, request, redirect
from ..models.mainmodel import MainModel

mainview = Blueprint("mainview", __name__,
					 template_folder="../templates")

mainmodel = MainModel()

@mainview.route("/")
def index():
	return render_template("index.html")

@mainview.route("/signup", methods=["POST"])
def signup():
	if request.method == "POST":
		if mainmodel.add_user(request.form):
			return redirect("/")
	