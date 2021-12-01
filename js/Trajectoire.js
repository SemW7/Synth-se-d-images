class Trajectoire {

	// Prend en paramètre un point de départ et d'arrivée et 
	// retourne une trajectoire rectiligne
	// depart et arrivee doivent être des instances de THREE.Vector3
	static rectiligne(scene, depart, arrivee, nbPts, trace, couleur) {
		// Point de contrôle du milieu
		// On fait de telle sorte qu'il se trouve sur le segment [depart-arrivee]
		let a = 0.5 * (arrivee.x - depart.x) + depart.x;
		let b = 0.5 * (arrivee.y - depart.y) + depart.y;
		let c = 0;
		let P = new THREE.Vector3(a, b, c);
		let cberect = new THREE.QuadraticBezierCurve3(depart, P, arrivee);

		if (trace) {
			let rectiligne = TraceBezierQuadratique(depart, P, arrivee, nbPts, couleur, 1);

			tracePt(scene, depart, "#008888", 0.1,true);
		    tracePt(scene, P, "#008888", 0.1,true);
		    tracePt(scene, arrivee, "#008888", 0.1,true);

			scene.add(rectiligne);
		}

		return cberect;
	}


	// Retourne un tableau contenant les points d'une courbe de bézier
	static curveUneCB(scene, P0, P1, P2, nbPts, trace, couleur) {
		let cbeBez = new THREE.QuadraticBezierCurve3(P0, P1, P2);

		if (trace) {
			let curve = TraceBezierQuadratique(P0, P1, P2, nbPts, couleur, 3);

			tracePt(scene, P0, "#008888", 0.1, true);
		    tracePt(scene, P1, "#008888", 0.1, true);
		    tracePt(scene, P2, "#008888", 0.1, true);

			scene.add(curve);
		}
		
		let tabPoints = new Array();

		let i = 0;
		do {
			tabPoints[i] = cbeBez.getPoint(i/(nbPts*10));
			i++;
		} while(tabPoints[i-1].x != cbeBez.getPoint(1).x);

		return tabPoints;
	}


	// Retourne un tableau contenant les points de deux courbes de bézier liées par une jointure G1
	static curveDeuxCB(scene, P0, P1, P2, P3, P4, nbPts, trace, couleur) {
		let cbe1 = new THREE.QuadraticBezierCurve3(P0, P1, P2);
		let cbe2 = new THREE.QuadraticBezierCurve3(P2, P3, P4);

		if (trace) {
			let cbe1T = TraceBezierQuadratique(P0, P1, P2, nbPts, couleur, 3);
			let cbe2T = TraceBezierQuadratique(P2, P3, P4, nbPts, couleur, 3);

			tracePt(scene, P0, "#008888", 0.1, true);
			tracePt(scene, P1, "#008888", 0.1, true);
		    tracePt(scene, P2, "#008888", 0.1, true);
		    tracePt(scene, P3, "#008888", 0.1, true);
		    tracePt(scene, P4, "#008888", 0.1, true);

			scene.add(cbe1T);
			scene.add(cbe2T);
		}

		/*let tabPoints = new Array();
		let j = 0;
		let k = 0;
		do {
			tabPoints[j] = cbe1.getPoint(k/(nbPts*10));
			k++;
			j++;
		} while(tabPoints[j-1].x != cbe1.getPoint(1).x);

		k = 0;
		do {
			tabPoints[j] = cbe2.getPoint(k/(nbPts*10));
			k++;
			j++;
		} while(tabPoints[j-1].x != cbe2.getPoint(1).x);*/

		return new Array(cbe1, cbe2);
	}
}