class Balais {

	constructor(couleurBalais, couleurPoils) {

		this.couleurBalais = couleurBalais;
		this.couleurPoils = couleurPoils;
		this.cylindre = this.buildBalais(couleurBalais, couleurPoils);

	}


	buildBalais() {
		// Construction du cylindre (manche)
		const geomCyl = new THREE.CylinderGeometry( 0.1, 0.1, 5, 32 );
	    const matCyl = new THREE.MeshLambertMaterial({ color:this.couleurBalais });
	    const cylindre = new THREE.Mesh( geomCyl, matCyl );
	    cylindre.rotateX(Math.PI/2);
	    cylindre.rotateZ(-Math.PI / 6);

	    // Construction du parallépipède rectangle
	    const geometry2 = new THREE.BoxGeometry( 1, 3, 0.15 );
	    const material2 = new THREE.MeshLambertMaterial({ color:this.couleurBalais });
	    const paralepipede = new THREE.Mesh( geometry2, material2 );
	    paralepipede.rotateX(Math.PI / 2);
	    paralepipede.rotateY(Math.PI / 6);

	    // Création des poils et ajout au parallépipède
	    let x = -0.45;
	    let y = 1.4;
	    for(let j=0; j<29; j++) {
	        for (let i=0; i<10; i++) {
	            let poil = this.creerPoil(0.05, 0.3, 45, this.couleurPoils);
	            poil.rotateX(-Math.PI / 2);
	            paralepipede.add(poil); // union entre le poil et le parallépipède
	            poil.position.y = y;
	            poil.position.z = 0.12;
	            poil.position.x = x;
	            x = x + 0.1;
	        }
	        y = y - 0.1;
	        x = -0.45;
	    }

	    paralepipede.position.y = -2.5;

	    cylindre.add( paralepipede ); // Union entre le paralepipède et le cylindre

	    return cylindre;
	}


	creerPoil(rayon, longueur, nbSeg, couleurPoils) {
	    let geometry = new THREE.ConeGeometry(rayon, longueur, nbSeg);
	    let material = new THREE.MeshLambertMaterial( {color: couleurPoils} );
	    let cone = new THREE.Mesh( geometry, material );

	    return cone;
	}


	setPosition(x, y, z) {
		this.cylindre.position.x = x;
		this.cylindre.position.y = y;
		this.cylindre.position.z = z;
	}


	getPosition() {
		return new THREE.Vector3(this.cylindre.position.x, 
								this.cylindre.position.y, 
								this.cylindre.position.z);
	}


	addToScene(scene) {
		scene.add(this.cylindre);
	}
}