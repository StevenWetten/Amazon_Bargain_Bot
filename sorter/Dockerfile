FROM python:3
ADD sorter.py /
RUN apt-get -y update
RUN pip install --upgrade pip
RUN pip install mysql-connector-python
CMD ["python", "./sorter.py"]
