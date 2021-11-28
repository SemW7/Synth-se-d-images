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
		let p0= new THREE.Vector2(P0.x,P0.y);
		let p1= new THREE.Vector2(P1.x,P1.y);
		let p2= new THREE.Vector2(P2.x,P2.y);
		let Cbe = new THREE.QuadraticBezierCurve(p0,p1,p2);
		let points = Cbe.getPoints(nbePtCbe);
		let latheGeometry = new THREE.LatheGeometry(points,nbePtRot,0,2*Math.PI);
		let lathe = surfPhong(latheGeometry,coul,1,false,coul);
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


	move(trajectoire, niemePointBezier, nbPts) {
        setTimeout(() => {

            let pos = trajectoire.getPoint(niemePointBezier/(nbPts*10));
            
            this.setPosition(pos.x, pos.y, 3);
            //trajectoire.v1.y = trajectoire.v1.y + 0.05;            
            
            if (pos.x != trajectoire.getPoint(1).x){
                this.move(trajectoire, niemePointBezier+1, nbPts);                
            } 
        }, 20);
    }     


    move2(trajectoire, niemePointBezier, nbPts) {
        
        let pos = trajectoire.getPoint(niemePointBezier/(nbPts*10));
        
        this.setPosition(pos.x, pos.y, 3);            
        
        if (pos.x != trajectoire.getPoint(1).x){
        	//Pierre.sleep(100);
            this.move2(trajectoire, niemePointBezier+1, nbPts);                
        }
    }     


    animate(cbeBez, vitesse, t, start, rendu, requestAnimationFrame) {
        if (start == null) {
            start = t;
        }
        var delai = t - start;

        let p = cbeBez.getPoint((delai * vitesse * .0001) % 1);
        this.setPosition(p.x, p.y, 3);

        

        if (p.x > cbeBez.getPoint(0.8).x) {
            requestAnimationFrame(this.animate);
            //rendu.render(scene, camera);
        }
        
    }
}