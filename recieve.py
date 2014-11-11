#!/usr/bin/env python
import pika, json



globalmq_host = "localhost"
globalmq_port = "5672"
globalmq_user = "nattyglobe"
globalmq_password = "nattyglobe"
globalmq_vhost = "nattyglobe"
GLOBALMQ_URL = "amqp://{0}:{1}@{2}:{3}/{4}".format(globalmq_user, globalmq_password, globalmq_host, globalmq_port, globalmq_vhost)

params = pika.URLParameters(GLOBALMQ_URL)
connection = pika.BlockingConnection(parameters=params)


def on_message(channel, method_frame, header_frame, body):
    data = json.loads(body)
    print data
    print
    channel.basic_ack(delivery_tag=method_frame.delivery_tag)

channel = connection.channel()
channel.basic_consume(on_message, 'nattyglobe')
try:
    channel.start_consuming()
except KeyboardInterrupt:
    channel.stop_consuming()
    connection.close()
