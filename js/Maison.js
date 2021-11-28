class Maison {

	constructor(xCenter, yCenter, zCenter) {

		const rayonTresGrandCercle = 4.3;
		const rayonGrandCercle = 3.5;
		const rayonMoyenCercle = 2.3;
		const rayonPetitCercle = 1;
		const nbSeg = 60;

		this.tresGrandCercle = this.makeCircle(4.3, nbSeg, 0x0000FF);
		this.grandCercle = this.makeCircle(3.5, nbSeg, 0xFFFFFF);
		this.moyenCercle = this.makeCircle(2.3, nbSeg, 0xFF0000);
		this.petitCercle = this.makeCircle(1, nbSeg, 0xFFFFFF);

		this.tresGrandCercle.position.x = xCenter;
		this.tresGrandCercle.position.y = yCenter;
		this.tresGrandCercle.position.z = zCenter - 0.006;

		this.grandCercle.position.x = xCenter;
		this.grandCercle.position.y = yCenter;
		this.grandCercle.position.z = zCenter - 0.004;

		this.moyenCercle.position.x = xCenter;
		this.moyenCercle.position.y = yCenter;
		this.moyenCercle.position.z = zCenter - 0.002;

		this.petitCercle.position.x = xCenter;
		this.petitCercle.position.y = yCenter;
		this.petitCercle.position.z = zCenter;
	}


	makeCircle(radius, nbSegments, couleur) {
		let materiau = new THREE.MeshBasicMaterial({
			color: couleur
		});  

		let circleGeometry = new THREE.CircleGeometry(radius, nbSegments);              
		let circle = new THREE.Mesh(circleGeometry, materiau);

		return circle;
	}


	addToScene(scene) {
		scene.add(this.tresGrandCercle);
		scene.add(this.grandCercle);
		scene.add(this.moyenCercle);
		scene.add(this.petitCercle);
	}
}