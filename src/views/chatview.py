from flask import Blueprint, render_template, request, redirect

chatview = Blueprint("chatview", __name__,
					 template_folder="../templates")

@chatview.route("/chat")
def chat():
	return render_template("chat.html")