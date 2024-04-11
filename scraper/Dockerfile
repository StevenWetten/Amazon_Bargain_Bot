FROM python:3
ADD scraper.py /
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get -y update
RUN apt-get install -y google-chrome-stable
RUN pip install --upgrade pip
RUN pip install bs4
RUN pip install selenium
RUN pip install webdriver_manager
RUN pip install mysql-connector-python
RUN pip install pandas
CMD ["python", "./scraper.py"]
