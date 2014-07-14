import pika
import sys

connection = pika.BlockingConnection(pika.ConnectionParameters(
            host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='NattyGlobe', durable=True)
channel.exchange_declare(exchange='NattyGlobe', type='direct')
channel.queue_bind(exchange='NattyGlobe', queue='NattyGlobe')

message = ' '.join(sys.argv[1:]) or "info: Hello World!"
channel.basic_publish(exchange='NattyGlobe', routing_key='NattyGlobe', body=message)
print " [x] Sent %r" % (message,)
connection.close()
