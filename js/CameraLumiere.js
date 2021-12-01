function cameraLumiere(scene,camera){   // creation de la camera 
    camera.up = new THREE.Vector3( 0, 0, 1 );
    var xPos=12;
    var yPos=-12;
    var zPos=5;
    var xDir=0;
    var yDir=0;
    var zDir=0;
    camera.position.set(12, 0, 5);
    camera.lookAt(0, 0, 0);
} // fin fonction cameraLumiere


function modifPointsBezier(scene, gui, menuGUI, cbe1, cbe2, points, courbes, nbPts, couleur) {
    let guiPoints = gui.addFolder("Points de contrôle");

    guiPoints.add(menuGUI, "P1X", -20, 20).onChange(function () {
        cbe1.v1.x = menuGUI.P1X;
        cbe2.v1.x = 2 * (cbe1.v2.x - cbe1.v1.x) + cbe1.v1.x;
        cbe1 = new THREE.QuadraticBezierCurve3(cbe1.v0, cbe1.v1, cbe1.v2);
        cbe2 = new THREE.QuadraticBezierCurve3(cbe2.v0, cbe2.v1, cbe2.v2);

        effaceCourbe(scene, courbes[0]);
        effaceCourbe(scene, courbes[1]);
        effacePt(scene, points[1]);
        effacePt(scene, points[3]);

        points[1] = tracePt(scene, cbe1.v1, "#008888", 0.1, true);
        points[3] = tracePt(scene, cbe2.v1, "#008888", 0.1, true);
        courbes[0] = TraceBezierQuadratique(cbe1.v0, cbe1.v1, cbe1.v2, nbPts, couleur, 3);
        courbes[1] = TraceBezierQuadratique(cbe2.v0, cbe2.v1, cbe2.v2, nbPts, couleur, 3);
        scene.add(courbes[0]);
        scene.add(courbes[1]);
    });

    guiPoints.add(menuGUI, "P1Y", -10, 10).onChange(function () {
        cbe1.v1.y = menuGUI.P1Y;
        cbe2.v1.y = 2 * (cbe1.v2.y - cbe1.v1.y) + cbe1.v1.y;
        cbe1 = new THREE.QuadraticBezierCurve3(cbe1.v0, cbe1.v1, cbe1.v2);
        cbe2 = new THREE.QuadraticBezierCurve3(cbe2.v0, cbe2.v1, cbe2.v2);

        effaceCourbe(scene, courbes[0]);
        effaceCourbe(scene, courbes[1]);
        effacePt(scene, points[1]);
        effacePt(scene, points[3]);

        points[1] = tracePt(scene, cbe1.v1, "#008888", 0.1, true);
        points[3] = tracePt(scene, cbe2.v1, "#008888", 0.1, true);
        courbes[0] = TraceBezierQuadratique(cbe1.v0, cbe1.v1, cbe1.v2, nbPts, couleur, 3);
        courbes[1] = TraceBezierQuadratique(cbe2.v0, cbe2.v1, cbe2.v2, nbPts, couleur, 3);
        scene.add(courbes[0]);
        scene.add(courbes[1]);
    });

    guiPoints.add(menuGUI, "P2X", -20, 20).onChange(function () {
        cbe1.v2.x = menuGUI.P2X;
        cbe2.v0.x = menuGUI.P2X;

        cbe1.v1.x = 2 * (cbe1.v2.x - cbe2.v1.x) + cbe2.v1.x;
        cbe2.v1.x = 2 * (cbe1.v2.x - cbe1.v1.x) + cbe1.v1.x;

        cbe1 = new THREE.QuadraticBezierCurve3(cbe1.v0, cbe1.v1, cbe1.v2);
        cbe2 = new THREE.QuadraticBezierCurve3(cbe2.v0, cbe2.v1, cbe2.v2);

        effaceCourbe(scene, courbes[0]);
        effaceCourbe(scene, courbes[1]);
        effacePt(scene, points[1]);
        effacePt(scene, points[2]);
        effacePt(scene, points[3]);

        points[1] = tracePt(scene, cbe1.v1, "#008888", 0.1, true);
        points[2] = tracePt(scene, cbe1.v2, "#008888", 0.1, true);
        points[3] = tracePt(scene, cbe2.v1, "#008888", 0.1, true);
        courbes[0] = TraceBezierQuadratique(cbe1.v0, cbe1.v1, cbe1.v2, nbPts, couleur, 3);
        courbes[1] = TraceBezierQuadratique(cbe2.v0, cbe2.v1, cbe2.v2, nbPts, couleur, 3);

        scene.add(courbes[0]);
        scene.add(courbes[1]);
    });

    guiPoints.add(menuGUI, "P2Y", -10, 10).onChange(function () {
        cbe1.v2.y = menuGUI.P2Y;
        cbe2.v0.y = menuGUI.P2Y;

        cbe1.v1.y = 2 * (cbe1.v2.y - cbe2.v1.y) + cbe2.v1.y;
        cbe2.v1.y = 2 * (cbe1.v2.y - cbe1.v1.y) + cbe1.v1.y;

        cbe1 = new THREE.QuadraticBezierCurve3(cbe1.v0, cbe1.v1, cbe1.v2);
        cbe2 = new THREE.QuadraticBezierCurve3(cbe2.v0, cbe2.v1, cbe2.v2);

        effaceCourbe(scene, courbes[0]);
        effaceCourbe(scene, courbes[1]);
        effacePt(scene, points[1]);
        effacePt(scene, points[2]);
        effacePt(scene, points[3]);

        points[1] = tracePt(scene, cbe1.v1, "#008888", 0.1, true);
        points[2] = tracePt(scene, cbe1.v2, "#008888", 0.1, true);
        points[3] = tracePt(scene, cbe2.v1, "#008888", 0.1, true);
        courbes[0] = TraceBezierQuadratique(cbe1.v0, cbe1.v1, cbe1.v2, nbPts, couleur, 3);
        courbes[1] = TraceBezierQuadratique(cbe2.v0, cbe2.v1, cbe2.v2, nbPts, couleur, 3);
        
        scene.add(courbes[0]);
        scene.add(courbes[1]);
    });

    guiPoints.add(menuGUI, "P3X", -20, 20).onChange(function () {
        cbe2.v1.x = menuGUI.P3X;
        cbe1.v1.x = 2 * (cbe1.v2.x - cbe2.v1.x) + cbe2.v1.x;
        cbe1 = new THREE.QuadraticBezierCurve3(cbe1.v0, cbe1.v1, cbe1.v2);
        cbe2 = new THREE.QuadraticBezierCurve3(cbe2.v0, cbe2.v1, cbe2.v2);

        effaceCourbe(scene, courbes[0]);
        effaceCourbe(scene, courbes[1]);
        effacePt(scene, points[1]);
        effacePt(scene, points[3]);

        points[1] = tracePt(scene, cbe1.v1, "#008888", 0.1, true);
        points[3] = tracePt(scene, cbe2.v1, "#008888", 0.1, true);
        courbes[0] = TraceBezierQuadratique(cbe1.v0, cbe1.v1, cbe1.v2, nbPts, couleur, 3);
        courbes[1] = TraceBezierQuadratique(cbe2.v0, cbe2.v1, cbe2.v2, nbPts, couleur, 3);
        scene.add(courbes[0]);
        scene.add(courbes[1]);
    });

    guiPoints.add(menuGUI, "P3Y", -10, 10).onChange(function () {
        cbe2.v1.y = menuGUI.P3Y;
        cbe1.v1.y = 2 * (cbe1.v2.y - cbe2.v1.y) + cbe2.v1.y;
        cbe1 = new THREE.QuadraticBezierCurve3(cbe1.v0, cbe1.v1, cbe1.v2);
        cbe2 = new THREE.QuadraticBezierCurve3(cbe2.v0, cbe2.v1, cbe2.v2);

        effaceCourbe(scene, courbes[0]);
        effaceCourbe(scene, courbes[1]);
        effacePt(scene, points[1]);
        effacePt(scene, points[3]);

        points[1] = tracePt(scene, cbe1.v1, "#008888", 0.1, true);
        points[3] = tracePt(scene, cbe2.v1, "#008888", 0.1, true);
        courbes[0] = TraceBezierQuadratique(cbe1.v0, cbe1.v1, cbe1.v2, nbPts, couleur, 3);
        courbes[1] = TraceBezierQuadratique(cbe2.v0, cbe2.v1, cbe2.v2, nbPts, couleur, 3);
        scene.add(courbes[0]);
        scene.add(courbes[1]);
    });    

    guiPoints.add(menuGUI, "P4X", -28, 15).onChange(function () {
        cbe2.v2.x = menuGUI.P4X;
        cbe2 = new THREE.QuadraticBezierCurve3(cbe2.v0, cbe2.v1, cbe2.v2);

        effaceCourbe(scene, courbes[1]);
        effacePt(scene, points[4]);
        
        points[4] = tracePt(scene, cbe2.v2, "#008888", 0.1, true);
        courbes[1] = TraceBezierQuadratique(cbe2.v0, cbe2.v1, cbe2.v2, nbPts, couleur, 3);
        scene.add(courbes[1]);
    });

    guiPoints.add(menuGUI, "P4Y", -5.5, 5.5).onChange(function () {
        cbe2.v2.y = menuGUI.P4Y;
        cbe2 = new THREE.QuadraticBezierCurve3(cbe2.v0, cbe2.v1, cbe2.v2);

        effaceCourbe(scene, courbes[1]);
        effacePt(scene, points[4]);
        
        points[4] = tracePt(scene, cbe2.v2, "#008888", 0.1, true);
        courbes[1] = TraceBezierQuadratique(cbe2.v0, cbe2.v1, cbe2.v2, nbPts, couleur, 3);
        scene.add(courbes[1]);
    });
}


function ajoutCameraGui(gui,menuGUI,camera){
    // ajout de la camera dans le menu du GUI
    let guiCamera = gui.addFolder("Camera");
    // ajout des propriete de la camera
    // abscisse de la position de la camera dans le menu

    guiCamera.add(menuGUI,"cameraxPos",-borneVue,borneVue).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
    });

    // ordonnee de la position de la camera dans le menu
    guiCamera.add(menuGUI,"camerayPos",-borneVue,borneVue).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(6.4), menuGUI.camerayPos*testZero(6.4), menuGUI.camerazPos*testZero(6.4));
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
    });

    // cote de la position de la camera dans le menu
    guiCamera.add(menuGUI,"camerazPos",-borneVue,borneVue).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
    });

    // zoom de la camera dans le menu
    guiCamera.add(menuGUI,"cameraZoom",-10,10).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
    });
    // fin de la position de camera
    // direction de la camera

    // abscisse de la direction de la camera dans le menu
    guiCamera.add(menuGUI,"cameraxDir",-borneVue,borneVue).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
    });

    // ordonnee de la direction de la camera dans le menu
    guiCamera.add(menuGUI,"camerayDir",-borneVue,borneVue).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
    });

    // cote de la direction de la camera dans le menu
    guiCamera.add(menuGUI,"camerazDir",-borneVue,borneVue).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
    });
}//fin fonction ajoutCameraGui
//*************************************************************
//* 
//        F I N     C A M E R A
//
//*************************************************************




// plans contenant deux axes du repere
const largPlan = 25;
const hautPlan = 25;
const nbSegmentLarg = 30;
const nbSegmentHaut = 30;


function planRepere(scene){
    const geometry = new THREE.PlaneGeometry(largPlan,hautPlan,nbSegmentLarg,nbSegmentHaut);
    const planeR = surfPhong(geometry,"#FF5555",1,true,"#AAFFFF");
    //new THREE.Mesh( geometry, materialR );
    const planeG = surfPhong(geometry,"#336633",1,true,"#FFAAFF");
    //new THREE.Mesh( geometry, materialG );
    const planeB = surfPhong(geometry,"#AAAAFF",1,true,"#FFAAAA");
    //new THREE.Mesh( geometry, materialB );
    planeR.rotateX(Math.PI/2);
    planeB.rotateX(Math.PI/2);
    planeB.rotateY(Math.PI/2);
    planeR.receiveShadow = true; 
    planeR.castShadow = true;
    planeG.receiveShadow = true; 
    planeG.castShadow = true;
    planeB.receiveShadow = true; 
    planeB.castShadow = true;
    scene.add(planeR);
    scene.add(planeG);
    scene.add(planeB);
}
//fin plans
//*************************************************************
//* 
//        F I N    Plans
//
//*************************************************************


function lumiere(scene){
    let lumPt = new THREE.PointLight(0xff55ff);
   /* const d = 100;
    lumPt.castShadow = true;
    lumPt.shadow.camera.left = - d;
    lumPt.shadow.camera.right = d;
    lumPt.shadow.camera.top = d;
    lumPt.shadow.camera.bottom = - d;*/
    //light.position.y = 1.5;
    lumPt.position.set(3,3,-3);
    lumPt.intensity = 1;
    lumPt.shadow.camera.far=2000;
    lumPt.shadow.camera.near=0;
   // scene.add(lumPt);
    let lumPt1 = new THREE.PointLight(0xffffff);
    lumPt1.castShadow = true;
    lumPt1.shadow.camera.far=2000;
    lumPt1.shadow.camera.near=0;
  /*  lumPt1.shadow.camera.left = - d;
    lumPt1.shadow.camera.right = d;
    lumPt1.shadow.camera.top = d;
    lumPt1.shadow.camera.bottom = - d;*/
    //light.position.y = 1.5;
    lumPt1.position.set(5,5,15);
    lumPt1.intensity = 1;
    scene.add(lumPt1);
 /*   
    let lumDir = new THREE.DirectionalLight(0xfffffff, 0.5);
lumDir.position.set(0, 4, 0);
lumDir.castShadow = true;
lumDir.shadow.mapSize.width = 512;  
lumDir.shadow.mapSize.height = 512; 
lumDir.shadow.camera.near = 0.5;
lumDir.shadow.camera.far = 500     

//scene.add(new THREE.*/
 // add spotlight for the shadows
  let dCon=0.1;
  let spotConique1 = new THREE.SpotLight(0x44FF44);
  spotConique1.position.set(1, 1, 3);
  spotConique1.target.position.set(1,1,0);
  spotConique1.target.updateMatrixWorld();// actualisation de "target"
  spotConique1.castShadow = true;
  spotConique1.shadow.camera.left = -dCon;
  spotConique1.shadow.camera.right = dCon;
  spotConique1.shadow.camera.top = dCon;
  spotConique1.shadow.camera.bottom = -dCon;
  spotConique1.shadow.camera.near =0.2;
  spotConique1.shadow.camera.far =80;
  spotConique1.shadow.camera.fov = 120;
  spotConique1.shadow.radius = 1;
  spotConique1.intensity = 0.5;
  spotConique1.angle = Math.PI/12;
  spotConique1.shadow.mapSize = new THREE.Vector2(Math.pow(2,10), Math.pow(2,10));
  scene.add(spotConique1);
  // affichage du cone de lumiere en "fil de fer"
 // var visualisationConeSpot = new THREE.SpotLightHelper(spotConique1);
 // scene.add(visualisationConeSpot);

  // add spotlight for the shadows
  let dCon1=0.1;
  let spotConique2 = new THREE.SpotLight(0x4444FF);
  spotConique2.position.set(4, 1, 1);
  spotConique2.target.position.set(0,1,1);
  spotConique2.target.updateMatrixWorld();// actualisation de "target"
  spotConique2.castShadow = true;
  spotConique2.shadow.camera.left = -dCon1;
  spotConique2.shadow.camera.right = dCon1;
  spotConique2.shadow.camera.top = dCon1;
  spotConique2.shadow.camera.bottom = -dCon1;
  spotConique2.shadow.camera.far=80;
  spotConique2.shadow.camera.near=0.2;
  spotConique2.shadow.radius = 10;
  spotConique2.intensity = 0.5;
  spotConique2.angle = Math.PI/12;
  spotConique2.shadow.mapSize = new THREE.Vector2(Math.pow(2,10), Math.pow(2,10)); 
  //spotConique2.onlyShadow = true;
  scene.add(spotConique2);
  // affichage du cone de lumiere en "fil de fer"
 // var visualisationConeSpot1 = new THREE.SpotLightHelper(spotConique2);
 // scene.add(visualisationConeSpot1);
    
 /*   // add spotlight for the shadows
    var spotConique12 = new THREE.SpotLight(0xFF4411);
  spotConique12.castShadow = true;
  spotConique12.shadow.camera.far=2000;
  spotConique12.shadow.camera.near=0;
  spotConique12.position.set(-1, -10, 0);
  spotConique12.target.position.set(0,0,0);
  spotConique12.castShadow = true;
  spotConique12.shadow.mapSize = new THREE.Vector2(1024, 1024);
 // scene.add(spotConique12);
  // If you want a more detailled shadow you can increase the 
  // mapSize used to draw the shadows.
  // spotConique1.shadow.mapSize = new THREE.Vector2(1024, 1024);
  var ambienLight = new THREE.AmbientLight(0x222222);
  scene.add(ambienLight);*/
 
 
  const dCyl=0.2;
  let LumiereDirectionnelle = new THREE.DirectionalLight(0x8888FF);
  LumiereDirectionnelle.position.set(1, 10, 1);
  LumiereDirectionnelle.target.position.set(1,0,1);
  //LumiereDirectionnelle.position.set(1, 1, 2);
  //LumiereDirectionnelle.target.position.set(1,1,0);
  LumiereDirectionnelle.target.updateMatrixWorld();// actualisation de "target"
  LumiereDirectionnelle.castShadow = true;
  LumiereDirectionnelle.shadow.camera.near = 0.2;
  LumiereDirectionnelle.shadow.camera.far = 200;
  LumiereDirectionnelle.shadow.camera.left = -dCyl;
  LumiereDirectionnelle.shadow.camera.right = dCyl;
  LumiereDirectionnelle.shadow.camera.top = dCyl;
  LumiereDirectionnelle.shadow.camera.bottom = -dCyl;

  LumiereDirectionnelle.intensity = 0.5;
  LumiereDirectionnelle.shadow.mapSize.width = Math.pow(2,10);
  LumiereDirectionnelle.shadow.mapSize.height = Math.pow(2,10);

  scene.add(LumiereDirectionnelle);
  //var VisualisationLumiereDirectionnelle = new THREE.CameraHelper(LumiereDirectionnelle.shadow.camera)
  //scene.add(VisualisationLumiereDirectionnelle);
  
}