import urllib2
from bs4 import BeautifulSoup
from random import randint

class NewsModel(object):
	def __init__(self):
		url = "https://news.ycombinator.com/"

		headers = {'User-Agent' : 'Mozilla 5.10'}
		request = urllib2.Request(url, None, headers)
		response = urllib2.urlopen(request)
		html = response.read()

		soup = BeautifulSoup(html)
		self.news = soup.findAll("td", { "class" : "title"})

	def get_rand_news(self):
		while True:
			try:
				news = self.news[randint(0, len(self.news))]
			except:
				pass

			if len(news.text) > 4:
				# > 4, becouse there are some 'fakse' elements
				return str(news.findAll("a", href=True)[0])
