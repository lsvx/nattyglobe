
var moment = require('moment');
var curr = Number(moment().add('5', 'minutes').format("X"));

function prune() {

    Location.find().done(function(err, locations) {

        locations.forEach(function(location) {
            var filteredTimestamps  = location.timestamps.filter(function(timestamp) {
                var diff = Math.abs(curr - timestamp);
                console.log(diff);
                if (diff < 300000)  {
                    return true;
                }
                return false;
            });

            if (filteredTimestamps.length === 0 ) {

                location.destroy(function(err) { console.log(err); });

            } else {

                Location.update({id: location.id}, {timestamps: filteredTimestamps},
                    function(err, location) {
                        if (err) return err;
                        console.log('Location updated:', location);
                    });
            }
        });

    });
}

// Run this function every 5 minutes

module.exports = (function() {
    setInterval(prune, 300000);
})();


