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

module.exports = {

  main: function (req, res) {
      return res.view();
  },

  all: function(req, res) {
    // We want to replace daData with an actual reference to all the geo data.
    var daData = {"all": "I swear dis is all the data"};
    // By default, res.json will reply on the open connection so you do not
    // need to explocitly reply on a socket.
    return res.json(daData);
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to GlobeController)
   */
  _config: {}


};
