class Sol {

	// PosMaison doit être une instance de la classe THREE.Vector3
	constructor(largeur, longueur, profondeur, couleur, emissivite, posMaison) {
		this.geometry = new THREE.BoxGeometry(largeur, longueur, profondeur);
		this.material = new THREE.MeshPhongMaterial({
			color: couleur,
	        emissive: emissivite,
	        side: THREE.DoubleSide,
		});
		this.sol = new THREE.Mesh(this.geometry, this.material);

		this.maison = new Maison(posMaison.x, posMaison.y, posMaison.z);
	}


	addToScene(scene) {
		scene.add(this.sol);
		this.maison.addToScene(scene);
	}


	setPosition(x, y, z) {
		this.sol.position.x = x;
		this.sol.position.y = y;
		this.sol.position.z = z;
	}
}