var amqp = require('amqp');
var messenger = require('../api/services/messenger');
var pruner = require('../api/services/pruner');

function randIp() {

    var  ipaddress_string = Math.round(Math.random()*255)
       + '.' + Math.round(Math.random()*255)
       + '.' + Math.round(Math.random()*255)
       + '.' + Math.round(Math.random()*255);

    return ipaddress_string;
}

module.exports.bootstrap = function (cb) {
    var connection = amqp.createConnection({
        host: 'localhost',
        port: 5672,
        login: 'nattyglobe',
        password: 'nattyglobe',
        vhost: 'nattyglobe'
    });

    connection.on('ready', function(){
        connection.queue('nattyglobe', {
            autoDelete: false,
            durable: true
        }, function(queue) {
            queue.subscribe({ack: true}, function(msg) {
                var msg = msg.data.toString();
                var j = JSON.parse(msg);
                messenger.newLogin(j[0]);
                queue.shift(); // basic_ack equivalent
            });
        });
    });

    cb();
};
