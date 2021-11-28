function TraceBezierQuadratique(P0, P1, P2, nbPts,coul,epaiCbe){
    let cbeBez = new THREE.QuadraticBezierCurve3(P0, P1, P2);
    let cbeGeometry = new THREE.Geometry();
    cbeGeometry.vertices = cbeBez.getPoints(nbPts);
    let material = new THREE.LineBasicMaterial( 
        {
            color: coul, 
            linewidth: epaiCbe    
        }
    );
    let BezierQuadratique = new THREE.Line( cbeGeometry, material );
    return (BezierQuadratique);
}  // fin fonction THREE.QuadratiBezierCurve


function TraceBezierCubique(P0, P1, P2, P3,nbPts,coul,epaiCbe){
    let cbeBez = new THREE.CubicBezierCurve3(P0, P1, P2, P3);
    let Points = cbeBez.getPoints(nbPts);
    let cbeGeometry = new THREE.BufferGeometry().setFromPoints(Points);
    let material = new THREE.LineBasicMaterial( 
        {
            color : coul , 
            linewidth: epaiCbe    
        }
    );
    let BezierCubique = new THREE.Line( cbeGeometry, material );
    return (BezierCubique);
}  // fin fonction THREE.CubicBezierCurve
