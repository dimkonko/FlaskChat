from flask import (Blueprint, render_template, request, redirect,
				   session)
from src.models.chatmodel import ChatModel

chatview = Blueprint("chatview", __name__,
					 template_folder="../templates")

model = ChatModel()

@chatview.route("/chat")
def chat():
	if 'username' in session:
		return render_template(
				"chat.html",
				nickname=session["username"]
   		)
	#return "You are not logged in"
	return redirect("/")

@chatview.route("/get_message", methods=["POST"])
def get_message():
	if request.methods == "POST":
		nickname = request.form["nickname"]
		message = request.form["message"]
		return render_template("message.html",
				nickname=nickname, message=message)
