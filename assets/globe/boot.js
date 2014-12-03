'use strict';

    if(!Detector.webgl){
      Detector.addGetWebGLMessage();
    } else {

      var container = document.getElementById('container');
      var globe = new DAT.Globe(container);

      var i, tweens = [];

      var settime = function(globe, t) {
        new TWEEN.Tween(globe).to({time: t},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
      };

      TWEEN.start();

      globe.animate();

      globe.locations = [];

      globe.addPoint = function(obj){
          for (var i = 0; i < this.locations.length; i++) {
              if(this.locations[i].id == obj.id){
                  this.locations[i].timestamps = obj.timestamps;
                  return this.locations[i];
              }
          }
          this.locations.push(obj);
          return obj;
      };

      globe.updatePoints = function() {
          var all = [], magnitude, ts, now = Date.now(), msecs, locationsKeep = [], timestampsKeep;

          this.resetData();
          /** Loop over all of the locations to see if they have valid timestamps. */
          for (var i = 0; i < this.locations.length; i++) {
              magnitude = 0;
              timestampsKeep = [];
              /**
               * Check each timestamp in the location and see if it is recent
               * enough to be rendered.
               */
              for (var k = 0; k < this.locations[i].timestamps.length; k++) {
                ts = this.locations[i].timestamps[k];
                msecs = now - ts;

                if(5*60*1000 > msecs){
                    magnitude += 1-msecs/5/60/1000;
                    /** Only keep relevant timestamps for later. */
                    timestampsKeep.push(ts);
                }
              }
              if (magnitude) {
                magnitude = magnitude/this.locations[i].timestamps.length;
                all.push(this.locations[i].latitude, this.locations[i].longitude, magnitude);
                /** Overwrite the old timestamps with relevant ones. */
                this.locations[i].timestamps = timestampsKeep;
                /** Save locations with visible timestamps for later. */
                locationsKeep.push(this.locations[i]);
              }
          }
          this.addData(all, {format: 'magnitude', animated: true});
          this.createPoints();
          settime(globe, 0);
          /** Overwrite the old locations with the useful ones. */
          this.locations = locationsKeep;
      };

      globe.parsePoints = function(list) {
        this.locations.concat(list);
        for (var i = 0; i < list.length; i++) {
            this.addPoint(list[i]);
        }
        this.updatePoints();
      };

      globe.autoUpdate = function() {
        window.requestAnimationFrame(function() {
          globe.updatePoints();
          globe.autoUpdate();
        });
      };

      document.body.style.backgroundImage = 'none'; // remove loading
    }
