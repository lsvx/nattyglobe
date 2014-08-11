    if(!Detector.webgl){
      Detector.addGetWebGLMessage();
    } else {

      var container = document.getElementById('container');
      var globe = new DAT.Globe(container);

      globe.animate();

      globe.parsePoints = function(list){
        this.locations = this.locations.concat(list);
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
