'use strict';

if(!Detector.webgl){
    Detector.addGetWebGLMessage();
} else {
    var container = document.getElementById('container'),
        globe = new DAT.Globe(container);

    globe.animate();

    globe.parsePoints = function(list) {
        if(list[0].id){
            //this.locations = _.without(this.locations, _.findWhere(this.locations, {id: list[0].id}));
            var match = _.find(this.locations, function(item) { return item.id === list[0].id});
            if(match){
              match.timestamps = list[0].timestamps
            }
            this.locations = this.locations.concat(list);
        }
		    for (var i = 0; i < list.length; i++) {
            this.addPoint(list[i]);
        }
    };

    globe.autoUpdate = function() {
        window.requestAnimationFrame(function() {
            globe.updatePoints();
            globe.autoUpdate();
        });
    };

  document.body.style.backgroundImage = 'none'; // remove loading
}
