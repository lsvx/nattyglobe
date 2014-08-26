var step = 1,               // speed of the particles
    globeWidth=200;         // width of the globe:
                            //     if 200, particles start from the surface of the globe
                            //     if 0, the particles start from the center of the globe



Particle = function(pointData, x, y, z){
	var vertex, geometry, particles, cx=0, cy=0, cz= 0, currentStep=globeWidth;

	this.inicialize =function(){
		vertex = new THREE.Vector3(0, 0, 0);
		geometry = new THREE.Geometry();
		geometry.vertices.push(vertex);

		particleMaterial = new THREE.ParticleBasicMaterial({
          size: 20,
          color: 0xffffff
        });

        particles = new THREE.ParticleSystem(geometry, particleMaterial);

        particles.dynamic = true;
	}

	this.updateParticle = function(bx,by,bz, max){
        var cx,cy,cz, d;
        currentStep +=step;

        if(max == globeWidth){
            // the line stopped moving
            currentStep = globeWidth;
        }else if(currentStep> max){
            // The particle exceeded the line's height
            currentStep=globeWidth;
        }

        d = Math.pow(currentStep,2)/(Math.pow(bx,2) + Math.pow(by,2)+ Math.pow(bz,2));

        cx = d*bx;
        cy = d*by;
        cz = d*bz;

		vertex.setX(cx);
		vertex.setY(cy);
		vertex.setZ(cz);
		geometry.verticesNeedUpdate = true;
	}


    this.getParticles = function(){
        return particles;
    }

	this.inicialize();
}

var textures = {};

DAT.Globe.prototype.addLineTexture = function(pointData, x,y,z){
    var particle = new Particle(pointData, x,y,z);
    textures[pointData.id] = particle;
    scene.add(particle.getParticles());
}

DAT.Globe.prototype.updateLineTexture = function(pointData, x,y,z, max){
	var particle = textures[pointData.id];
	particle.updateParticle(x,y,z, max);
}