
var moment = require('moment');
var _ = require('lodash');

function prune() {

    var curr = Date.now();
    Location.find().done(function(err, locations) {

        locations.forEach(function(location) {
            var filteredTimestamps  = location.timestamps.filter(function(timestamp) {
                console.log('timestamp', timestamp);
                console.log('curr', curr);
                var diff = (curr - timestamp);
                if (diff < 300000)  {
                    return true;
                }
                return false;
            });

            console.log('filteredTimestamps', filteredTimestamps);
            if (filteredTimestamps.length === 0 ) {

                location.destroy(function(err) {
                    if (err) console.log(err); });
                    console.log('destroyed record amgio');

            } else {

                console.log( 'differeence of array', _.difference(location.timestamps, filteredTimestamps));
                if( _.difference(location.timestamps, filteredTimestamps).length) {

                    Location.update({id: location.id}, {timestamps: filteredTimestamps},
                        function(err, location) {
                            if (err) return err;
                            console.log('Location updated:', location);
                        });
                } else {
                }
            }
        });

    });
}

// Run this function every 5 minutes

module.exports = (function() {
    setInterval(prune, 300000);
})();


