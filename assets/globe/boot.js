    if(!Detector.webgl){
      Detector.addGetWebGLMessage();
    } else {

      var years = ['1990','1995','2000'];
      var container = document.getElementById('container');
      var globe = new DAT.Globe(container);

      console.log(globe);
      var i, tweens = [];

      var settime = function(globe, t) {
        return function() {
          new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
          var y = document.getElementById('year'+years[t]);
          if (y.getAttribute('class') === 'year active') {
            return;
          }
          var yy = document.getElementsByClassName('year');
          for(i=0; i<yy.length; i++) {
            yy[i].setAttribute('class','year');
          }
          y.setAttribute('class', 'year active');
        };
      };



      TWEEN.start();

      globe.animate();

      // -32.9479009,-60.6650597, 0.7

      var totalPoints = [];

      globe.addPoint = function(obj){
          for (var i = 0; i < totalPoints.length; i++) {
              if(totalPoints[i].id == obj.id){
                  totalPoints[i].timestamps = obj.timestamps;
                  return ;
              }
          }
          totalPoints.push(obj);
      }

      globe.updatePoints = function(){
          var all = [], magnitude, ts, now = Date.now(), msecs;

          globe.resetData();
          for (var i = 0; i < totalPoints.length; i++) {
              magnitude = 0;
              /*if (i == 63){
                debugger;
              }*/
              for (var k = 0; k < totalPoints[i].timestamps.length; k++) {
                ts = totalPoints[i].timestamps[k];
                msecs = now - ts;

                if(1*60*1000 > msecs){
                    magnitude += 1-msecs/1/60/1000;
                }
              }
              magnitude = magnitude/totalPoints[i].timestamps.length;
              all.push(totalPoints[i].latitude, totalPoints[i].longitude, magnitude);
          };
          globe.addData(all, {format: 'magnitude', name: '1990', animated: true})
          globe.createPoints();
          settime(globe, 0)();
      }

      globe.parsePoints = function(list){
        var magnitude, msecs, ts, now = Date.now();
        for (var i = 0; i < list.length; i++) {
            globe.addPoint(list[i]);
        };
        globe.updatePoints();
      }

        document.body.style.backgroundImage = 'none'; // remove loading
    }
