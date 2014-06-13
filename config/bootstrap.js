var amqp = require('amqp');

module.exports.bootstrap = function (cb) {
    var amqp_conn = this.amqp_conn = amqp.createConnection({
        host: 'localhost',
        port: 5672
    });

    amqp_conn.on('ready', function(){
        amqp_conn.queue('task_queue', {
            autoDelete: false,
            durable: true
        }, function(queue) {
            queue.subscribe({ack: true}, function(msg) {
                console.log(msg);
                queue.shift(); // basic_ack equivalent
            });
        });
    });

    cb();
};
