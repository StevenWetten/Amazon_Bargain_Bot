FROM python:3
ADD worker2.py /
RUN apt-get -y update
RUN pip install mysql-connector-python
CMD ["python", "./worker2.py"]
