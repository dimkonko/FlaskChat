import urllib2
from bs4 import BeautifulSoup
from random import randint

class NewsModel(object):
	def __init__(self):
		url = "https://news.ycombinator.com/"

		# Add your headers
		headers = {'User-Agent' : 'Mozilla 5.10'}

		# Create the Request. 
		request = urllib2.Request(url, None, headers)

		# Getting the response
		response = urllib2.urlopen(request)

		# Print the headers
		html = response.read()

		soup = BeautifulSoup(html)
		self.news = soup.findAll("td", { "class" : "title"})

	def get_rand_news(self):
		isFinded = False
		while not isFinded:
			news = self.news[randint(0, len(self.news))]

			if len(news.text) > 4:
				# > 4, becouse there are some 'fakse' elements
				return {
					"title": news.text,
					"link": news.findAll("a", href=True)[0]["href"]
				}
