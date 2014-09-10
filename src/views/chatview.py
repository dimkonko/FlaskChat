from flask import (Blueprint, render_template, request, redirect,
				   session)

chatview = Blueprint("chatview", __name__,
					 template_folder="../templates")

@chatview.route("/chat")
def chat():
	if 'username' in session:
		return render_template("chat.html",
							   nickname=session["username"])
	#return "You are not logged in"
	return redirect("/")
