from flask import Blueprint, render_template, request, redirect

mainview = Blueprint("mainview", __name__,
					 template_folder="../templates")

@mainview.route("/")
def index():
	return render_template("index.html")