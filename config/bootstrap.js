var amqp = require('amqp');
var messenger = require('../api/services/messenger');

module.exports.bootstrap = function (cb) {
    var connection = amqp.createConnection({
        host: 'localhost',
        port: 5672
    });

    connection.on('ready', function(){
        connection.queue('NattyGlobe', {
            autoDelete: false,
            durable: true
        }, function(queue) {
            queue.subscribe({ack: true}, function(msg) {
                var j = JSON.parse(msg.data.toString());
                messenger.newLogin(j[0]);
                queue.shift(); // basic_ack equivalent
            });
        });
    });

    cb();
};
