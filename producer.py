import pika
import sys

connection = pika.BlockingConnection(pika.ConnectionParameters(
            host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='nattyglobe', durable=True)
channel.exchange_declare(exchange='nattyglobe', type='direct')
channel.queue_bind(exchange='nattyglobe', queue='nattyglobe')

message = ' '.join(sys.argv[1:]) or "info: Hello World!"
channel.basic_publish(exchange='nattyglobe', routing_key='nattyglobe', body=message)
print " [x] Sent %r" % (message,)
connection.close()
