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
        var ll = data.location.ll[0].toString() + data.location.ll[1].toString();
        data.timestamp = msg.timestamp;
        console.log(data, ll);
        Location.findOneById(ll)
          .done(function(err, location) {
            if (err) {
              console.log(err);
            } else {
              if (location === undefined) {
                Location.create({
                  id: ll,
                  timestamps: [data.timestamp],
                  latitude: data.location.ll[0],
                  longitude: data.location.ll[1]
                }).done(function(err, location) {

                  // Error handling
                  if (err) {
                    console.log('here I go !!');
                    return console.log(err);
                  // The User was created successfully!
                  } else {
                    console.log("Located Created!! ", location);
                  }
                });
              }
              else {
                
                location.timestamps.push(data.timestamp);
                Location.update({id: ll}, {timestamps: location.timestamps}, function (err, location) {
                   if (err) { console.log(err); }
                   else { console.log('location timestamp added'); }
                 });
              }
            }
          });
        // Emit a message to all the connected sockets with the new data.
        sails.io.sockets.emit('message', data);
        console.log(data);
      });
    }
    catch (e) {
      console.log(e);
    }
    return true;
  }
};
