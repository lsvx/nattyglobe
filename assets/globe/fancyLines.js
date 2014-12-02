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

    // attributes
     attributes = {

         alpha: { type: 'f', value: [] },

     };
     // uniforms
     uniforms = {
         color: { type: "c", value: new THREE.Color( 0x00ff00 ) },
     };
     // point cloud material
    var shaderMaterial = new THREE.ShaderMaterial( {
        uniforms:       uniforms,
        attributes:     attributes,
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        transparent:    true
    });

    var particleTexture = THREE.ImageUtils.loadTexture('images/particleB.png');

    var particleMaterial = new THREE.ParticleBasicMaterial({
        map: particleTexture,
        transparent: true,
        size: 30,
        blending: THREE.AdditiveBlending,
        alphaTest: 0.5,
        //opacity: 0.8 //If you want to do add transparency to the particle
    });

    particleGroup = new THREE.Object3D({transparent: true});
    var radiusRange = 10;
    var spriteMaterial = new THREE.SpriteMaterial( {
        map: particleTexture,
        transparent: true,
        blending: THREE.NormalBlending,
    });

    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set( 22, 22, 1.0 ); // imageWidth, imageHeight
    sprite.position.set( 0, 0, 0 );

    sprite.material.color.setHSL( Math.random(), 0.9, 0.7 );
    particleGroup.add( sprite );

    particles = particleGroup;
    //particles = new THREE.ParticleSystem(geometry, particleMaterial);
    //particles.position.set(0, 0, 0);
    particles.dynamic = true;

	}

	this.updateParticle = function(bx,by,bz, max){
        var cx,cy,cz, d;
        currentStep +=step;

        if(Math.floor(max) == globeWidth){
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
        //vertex.setX(cx);
		//vertex.setY(cy);
		//vertex.setZ(cz);
        particles.position.y = cy;
        particles.position.x = cx;
        particles.position.z = cz;
        //particles.position.set(cx, cy, cz);
        //geometry.verticesNeedUpdate = true;
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


    var particleTexture = THREE.ImageUtils.loadTexture( 'images/particleB.png' );

    particleGroup = new THREE.Object3D();
    particleAttributes = { startSize: [], startPosition: [], randomness: [] };

    var totalParticles = 1;
    var radiusRange = 10;
    for( var i = 0; i < totalParticles; i++ )
    {
        var spriteMaterial = new THREE.SpriteMaterial( {
            map: particleTexture,
            useScreenCoordinates: false,
            color: 0xffffff,
            size: 100,
            transparent: true
        });
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set( 30, 10, 1.0 ); // imageWidth, imageHeight
        sprite.position.set( 0, 0, 0 );
        sprite.position.setLength( radiusRange * (Math.random() * 0.1 + 0.9) );
        sprite.material.color.setHSL( Math.random(), 0.9, 0.7 );
        sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles
        particleGroup.add( sprite );
        particleAttributes.startPosition.push( sprite.position.clone() );
        //particleAttributes.randomness.push( Math.random() );
    }
    particleGroup.position.y = 300;
    particleGroup.position.x = 300;
    scene.add( particleGroup );
}

DAT.Globe.prototype.updateLineTexture = function(pointData, x,y,z, max){
  	var particle = textures[pointData.id];
	particle.updateParticle(x,y,z, max);
}
