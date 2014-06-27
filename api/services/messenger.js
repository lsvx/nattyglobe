var http = require('http');
var geoip = require('geoip-lite');
var q = require('q');

module.exports = {
  lookup: function(ip) {
    var d = q.defer();
    if (ip === '127.0.0.1') {
        http.get('http://myexternalip.com/raw', function(response) {
            var ip = response.headers['my-external-ip'],
                location = geoip.lookup(ip);
            d.resolve({ ip: ip, location: location });
        });
    }
    else {
      d.resolve({ ip: ip, location: geoip.lookup(ip) });
    }
    return d.promise;
  },
  newLogin: function(msg) {
    var self = this;
    try {
      self.lookup(msg.ip).then(function(data) {
        data.timestamp = msg.timestamp;
        console.log(data);
      });
    }
    catch (e) {
      console.log(e);
    }
    return true;
  }
};