var step = 10;

var textures = {};


Particle = function(pointData, x, y, z){
	var vertex, geometry, particles, cx=0, cy=0, cz=0;

	this.inicialize =function(){
		vertex = new THREE.Vector3(0, 0, 0);
		geometry = new THREE.Geometry();
		geometry.vertices.push(vertex);

		particleMaterial = new THREE.ParticleBasicMaterial({
          size: 20,
          color: 0xffffff
        });

        particles = new THREE.ParticleSystem(geometry, particleMaterial);

        lineMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
          opacity: 0.4,
          linewidth: 1
        });

        particles.dynamic = true;
	}

	this.getParticles = function(){
		return particles;
	}

	this.updateParticle = function(nx,ny,nz){
		vertex.setX(nx);
		vertex.setY(ny);
		vertex.setZ(nz);
		geometry.verticesNeedUpdate = true;
	}

	this.inicialize();
}

DAT.Globe.prototype.addLineTexture = function(pointData, x,y,z){
		var particle = new Particle(pointData, x,y,z);
		textures[pointData.id] = particle;
        scene.add(particle.getParticles());
}

DAT.Globe.prototype.updateLineTexture = function(pointData, x,y,z){
	var particle = textures[pointData.id];
	particle.updateParticle(x,y,z);
}