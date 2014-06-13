var amqp = require('amqp');

module.exports.bootstrap = function (cb) {
    var connection = amqp.createConnection({
        host: 'localhost',
        port: 5672
    });

    connection.on('ready', function(){
        connection.queue('nattyglobe', {
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
