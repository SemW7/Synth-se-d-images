class Pierre {	

	constructor(nbPtCb, nbePtRot, coulInf, coulInt, coulSup) {

		// Points de contrôle lathe inférieur
		this.M0 = new THREE.Vector3(0.85,-2.7,0);
		this.M1 = new THREE.Vector3(0.85,-3.2,0);
		this.M2 = new THREE.Vector3(0,-3.15,0);

		// Points de contrôle lathe intermédiaire
		this.N0 = new THREE.Vector3(this.M0.x,this.M0.y,this.M0.z);
		this.N1 = new THREE.Vector3(this.M0.x, -2.6,0);
		this.N2 = new THREE.Vector3(this.M0.x,-2.5,0);

		// Points de contrôle lathe supérieur
		this.P0 = new THREE.Vector3(this.N2.x,this.N2.y,this.N2.z);
		this.P1 = new THREE.Vector3(this.N2.x,-2.1,this.N2.z);
		this.P2 = new THREE.Vector3(0,-2.2,0);
		
		this.latheInf = this.buildLathe(nbPtCb, nbePtRot, this.M0, this.M1, this.M2, coulInf);
		this.latheInt = this.buildLathe(nbPtCb, nbePtRot, this.N0, this.N1, this.N2, coulInt);
		this.latheSup = this.buildLathe(nbPtCb, nbePtRot, this.P0, this.P1, this.P2, coulSup);

		this.latheInf.rotation.x = Math.PI / 2;
		this.latheInt.rotation.x = Math.PI / 2;
 		this.latheSup.rotation.x = Math.PI / 2;
	}


	buildLathe(nbePtCbe, nbePtRot, P0, P1, P2, coul){
		let p0= new THREE.Vector2(P0.x, P0.y);
		let p1= new THREE.Vector2(P1.x, P1.y);
		let p2= new THREE.Vector2(P2.x, P2.y);
		let Cbe = new THREE.QuadraticBezierCurve(p0, p1, p2);
		let points = Cbe.getPoints(nbePtCbe);
		let latheGeometry = new THREE.LatheGeometry(points, nbePtRot, 0, 2*Math.PI);
		let lathe = surfPhong(latheGeometry, coul, 1, false, coul);
		return lathe;		
	}
	

	setPosition(x, y, z) {
		this.latheInf.position.set(x, y, z);
		this.latheInt.position.set(x, y, z);
		this.latheSup.position.set(x, y, z);
	}


	getPosition() {
		let v = new THREE.Vector3(this.latheInf.position.x, this.latheInf.position.y, this.latheInf.position.z);
		return v;
	}


	addToScene(scene) {
		scene.add(this.latheInf);
		scene.add(this.latheInt);
		scene.add(this.latheSup);
	}


	removeFromScene(scene) {
		scene.remove(this.latheInf);
		scene.remove(this.latheInt);
		scene.remove(this.latheSup);
	}


	collision(pierresBleues, pierresRouges) {
		let pierresProches = new Array();
		let j = 0;
		for(let i=0; i<pierresBleues.length; i++) {
			if (this != pierresBleues[i] && this.getPosition().distanceTo(pierresBleues[i].getPosition()) <= 1.5) {
				pierresProches[j] = pierresBleues[i];
				j++;
			}
		}
		for(let i=0; i<pierresRouges.length; i++) {
			if (this != pierresRouges[i] && this.getPosition().distanceTo(pierresRouges[i].getPosition()) <= 1.5) {
				pierresProches[j] = pierresRouges[i];
				j++;
			}
		}
		return pierresProches;
	}


	// Ancienne méthode pour déplacer les pierres
	// Prend en paramètre une courbe de bézier pour le déplacement suivant la courbe
	move0(trajectoire, niemePointBezier, nbPts, niemeLance, pierresBleues, pierresRouges, posMaison) {
        setTimeout(() => {

            let pos = trajectoire.getPoint(niemePointBezier/(nbPts*10));

            this.setPosition(pos.x, pos.y, this.getPosition().z);
            let resultatCollision = this.collision(pierresBleues, pierresRouges);
            if (resultatCollision.length > 0) {
            	for(let i=0; i<resultatCollision.length; i++) {
            		resultatCollision[i].setPosition(resultatCollision[i].getPosition().x-0.01, resultatCollision[i].getPosition().y+0.05, resultatCollision[i].getPosition().z);
            	}
            }         
            
            if (pos.x != trajectoire.getPoint(1).x){
                this.move0(trajectoire, niemePointBezier+1, nbPts, niemeLance, pierresBleues, pierresRouges, posMaison);                
            }
			else {
				// TODO
				// Appeler la fonction qui va vérifier la distance de toutes les pierres
				// par rapport à la maison et va mettre à jour le tableau des scores
				//updateScore(niemeLance, pierresBleues, pierresRouges, posMaison);
			}         
        }, 7);
    }     


    // Nouvelle méthode pour déplacer les pierres
    // Prend en paramètre un tableau de points pour le déplacement des pierres
    // Ce qui permet de déplacer suivant plusieurs courbes de béziers
    // Il suffit juste de concaténer dans le même tableau les points des courbes
    move(trajectoire, niemePointBezier) {
    	
        setTimeout(() => {

            let pos = trajectoire[niemePointBezier];

            this.setPosition(pos.x, pos.y, 2.6);
            //trajectoire.v1.y = trajectoire.v1.y + 0.05;            
            
            
            if (pos.x != trajectoire[trajectoire.length-1].x){
                this.move(trajectoire, niemePointBezier+1);                
            }

        }, 20);
    }


	// Pierre de déplacer la pierre suivant deux trajectoires l'une à la suite de l'autre
    move2(trajectoire1, trajectoire2, niemePointBezier, nbPts, trajActuelle, niemeLance, pierresBleues, pierresRouges, posMaison) {
        
    	if (trajActuelle == 1) {

	        setTimeout(() => {

	            let pos = trajectoire1.getPoint(niemePointBezier/(nbPts*10));

	            this.setPosition(pos.x, pos.y, this.getPosition().z);

	            let resultatCollision = this.collision(pierresBleues, pierresRouges);
	            if (resultatCollision.length > 0) {
	            	for(let i=0; i<resultatCollision.length; i++) {
            		resultatCollision[i].setPosition(resultatCollision[i].getPosition().x-0.01, resultatCollision[i].getPosition().y+0.05, resultatCollision[i].getPosition().z);
            	}
	            }
	            
	            if (pos.x != trajectoire1.getPoint(1).x){
	                this.move2(trajectoire1, trajectoire2, niemePointBezier+1, nbPts, 1, niemeLance, pierresBleues, pierresRouges, posMaison);                
	            }
	            else{
	            	this.move2(trajectoire1, trajectoire2, 0, nbPts, 2, niemeLance, pierresBleues, pierresRouges, posMaison);
            	}
	        }, 3);
        }

        else if (trajActuelle == 2) {

        	setTimeout(() => {

	            let pos = trajectoire2.getPoint(niemePointBezier/(nbPts*10));

	            this.setPosition(pos.x, pos.y, this.getPosition().z);

	            let resultatCollision = this.collision(pierresBleues, pierresRouges);
	            if (resultatCollision.length > 0) {
	            	for(let i=0; i<resultatCollision.length; i++) {
            		resultatCollision[i].setPosition(resultatCollision[i].getPosition().x-0.01, resultatCollision[i].getPosition().y+0.05, resultatCollision[i].getPosition().z);
            	}
	            }
	            
	            if (pos.x != trajectoire2.getPoint(1).x){
	                this.move2(trajectoire2, trajectoire2, niemePointBezier+1, nbPts, 2, niemeLance, pierresBleues, pierresRouges, posMaison);                
	            }
				else{
					updateScore(niemeLance, pierresBleues, pierresRouges, posMaison);
				}
	        }, 3);
        }
    }   
}