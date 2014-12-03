var amqp = require('amqp');
var messenger = require('../api/services/messenger');
var pruner = require('../api/services/pruner');

module.exports.bootstrap = function (cb) {
    var connection = amqp.createConnection(sails.config.messaging.connection);

    connection.on('ready', function(){
        connection.queue('nattyglobe', {
            autoDelete: false,
            durable: true
        }, function(queue) {
            queue.subscribe({ack: true}, function(msg) {
                var msg = msg.data.toString(),
                    j = JSON.parse(msg);
                messenger.newLogin(j[0]);
                queue.shift(); // basic_ack equivalent
            });
        });
    });

    cb();
};
