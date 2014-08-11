    if(!Detector.webgl){
      Detector.addGetWebGLMessage();
    } else {

      var container = document.getElementById('container');
      var globe = new DAT.Globe(container);

      var i ;

      globe.animate();

      globe.locations = [];

      globe.parsePoints = function(list){
        console.log(JSON.stringify(list));
        this.locations = this.locations.concat(list);
        for (var i = 0; i < list.length; i++) {
            this.addPoint(list[i]);
        }
        this.updatePoints();
      };




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

      globe.updatePoints = function(){
          var all = [], magnitude, ts, now = Date.now(), msecs, locationsKeep = [], timestampsKeep;

          for (var i = 0; i < this.locations.length; i++) {
              magnitude = 0;
              timestampsKeep = [];

              for (var k = 0; k < this.locations[i].timestamps.length; k++) {
                ts = this.locations[i].timestamps[k];
                msecs = now - ts;

                if(5*60*1000 > msecs){
                    magnitude += 1-msecs/5/60/1000;
                    timestampsKeep.push(ts);
                }
              }
              if (magnitude) {
                this.locations[i].magnitude = magnitude/this.locations[i].timestamps.length;
                this.addData(this.locations[i]);

                this.locations[i].timestamps = timestampsKeep;
                locationsKeep.push(this.locations[i]);
              }
          }


          this.locations = locationsKeep;
      };

      globe.parsePoints = function(list){
        console.log(list);
        this.locations = this.locations.concat(list);
        for (var i = 0; i < list.length; i++) {
            this.addPoint(list[i]);
        }

      };


globe.autoUpdate = function() {
    window.requestAnimationFrame(function() {
        globe.updatePoints();
        setTimeout(function() {globe.autoUpdate()}, 1000);
    });
};

      document.body.style.backgroundImage = 'none'; // remove loading
    }
