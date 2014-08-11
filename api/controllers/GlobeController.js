/**
 * GlobeController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var moment = require('moment');
module.exports = {

  main: function (req, res) {
      return res.view();
  },

  all: function(req, res) {
    // We want to replace daData with an actual reference to all the geo data.
    // -32.9479009,-60.6650597,
    var data = [
      {lat: -32.9479009, long: -60.6650597, magnitude: 0.7, timestamp: Date.now()},
      {lat: 32.9479009, long: -60.6650597, magnitude: 0.7, timestamp: Date.now()}
    ];
    // By default, res.json will reply on the open connection so you do not
    // need to explocitly reply on a socket.
    return res.json(data);
  },

  ready: function(req, res) {
    Location.subscribe(req.socket);

    curr = Number(moment().subtract('5', 'minutes').format("X"));
    
    Location.find().done(function(err, locations) {
      locations.filter(function(location) {
        location.timestamps.filter(function(timestamp) {
          if (timestamp > curr)  return timestamp;
        });

        if(location.timestamps.length) return location;
      });

      return res.json(locations);

    });
  },

  random: function(req, res){
      var lat = Math.random()*180-90,
          long = Math.random()*360-180;

      return Location.create({
                  id: lat.toString() + long.toString(),
                  timestamps: [Date.now()],
                  latitude: lat,
                  longitude: long
      }).done(function(err, loc){
          sails.io.sockets.emit('location', loc);
          return res.json(loc);
      });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to GlobeController)
   */
  _config: {}



};
