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

      for(var i = 0; i<years.length; i++) {
        var y = document.getElementById('year'+years[i]);
        y.addEventListener('mouseover', settime(globe,i), false);
      }

      TWEEN.start();





        /*
        window.data = data;
        for (i=0;i<data.length;i++) {
            globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
        }
        globe.addPoint
        */
        //globe.createPoints();
        //settime(globe,0)();
        globe.animate();



      // -32.9479009,-60.6650597, 0.7

      var totalPoints = []

      globe.addPoint = function(lat, long, mag){
          totalPoints.push(lat,long,mag);
      }

      globe.updatePoints = function(){
          globe.resetData();
          globe.addData(totalPoints, {format: 'magnitude', name: '1990', animated: true})
          globe.createPoints();
          settime(globe, 0)();
      }

      globe.parsePoints = function(list){
        for (var i = 0; i < list.length; i++) {
          globe.addPoint(list[i].lat, list[i].long, list[i].magnitude);
        };
        globe.updatePoints();
      }

        document.body.style.backgroundImage = 'none'; // remove loading
    }
