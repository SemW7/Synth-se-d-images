const borneVue=36;//amplitude de deplacement de la camera

 
function init(){
    let stats = initStats();
    // creation de rendu et de la taille
    let rendu = new THREE.WebGLRenderer({ antialias: true });
    rendu.shadowMap.enabled = false;
    let scene = new THREE.Scene();   
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
    rendu.shadowMap.enabled = true;
    rendu.setClearColor(new THREE.Color(0x000000));
    rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
    cameraLumiere(scene,camera);
    lumiere(scene);
    repere(scene);   








    
    const domEvents = new THREEx.DomEvents(camera, rendu.domElement);
    const posSol = new THREE.Vector3(-24, 0, -1);
    const posMaison = new THREE.Vector3(-25, 0, 0.015);
    const pointDebutLancer = new THREE.Vector3(15, 0, 0);
    const nbPtCB=50;//nombre de points sur la courbe de Bezier
    const nbePtRot=50;// nbe de points sur les cercles
    const dimPt=0.05; 
    const nbPts = 100;//nbe de pts de la courbe de Bezier (utilisé pour les déplacements)






    ///////////////////////////////////////////////////////////////////////////
    ///////                         Création du sol                     ///////
    ///////////////////////////////////////////////////////////////////////////

    let sol = new Sol(80, 13, 1, "#b3c3cc", "#bdd7db", posMaison); // instanciation du sol
    sol.addToScene(scene); // Ajout du sol à la scene
    sol.setPosition(posSol.x, posSol.y, posSol.z); // Définition de la position du sol




    ///////////////////////////////////////////////////////////////////////////
    ///////                 Définition des trajectoires                 ///////
    ///////////////////////////////////////////////////////////////////////////

    //Trajectoire rectiligne
    let A0 = pointDebutLancer;
    let A2 = new THREE.Vector3(-27, 2.5, 0);
    
    let cberect = Trajectoire.rectiligne(scene, A0, A2, nbPts, true, "#0000FF");

    let max = -18;
    let min = -29;
    // Trajectoire curve
    let N0 = pointDebutLancer;
    let N1 = new THREE.Vector3(0, 8, 0);
    //let randomX2 = -((Math.random() * 13) + 18);
    let randomX2 = (Math.random() - 0) * (max - min) / (1 - 0) + min;
    let a = Math.random();
    let randomY2;
    
    if (a > 0.5){
        randomY2 = (Math.random() - 0) * (5.5 - (-5.5) / (1 - 0) + (-5.5));
    }
    else{
        randomY2 = - (Math.random() - 0) * (5.5 - (-5.5) / (1 - 0) + (-5.5));
    }
    let N2 = new THREE.Vector3(randomX2, randomY2, 0);    

    
    cbeBez = Trajectoire.curveUneCB(scene, N0, N1, N2, nbPts, "#0000FF", 3);




    // Trajectoire G1
    let B0 = pointDebutLancer;
    let B1 = new THREE.Vector3(7, -4, 0);
    let B2 = new THREE.Vector3(0, -2, 0);
    let B3 = new THREE.Vector3(2 * (B2.x - B1.x) + B1.x, 2 * (B2.y - B1.y) + B1.y, 0);
    let B4 = new THREE.Vector3(-27, -4, 0);

    //let cbJointure = Trajectoire.curveDeuxCB(scene, B0, B1, B2, B3, B4, nbPts, true, "#0000FF");

    let cbe1 = new THREE.QuadraticBezierCurve3(B0, B1, B2);
    let cbe2 = new THREE.QuadraticBezierCurve3(B2, B3, B4);

    let cbe1T = TraceBezierQuadratique(B0, B1, B2, nbPts, "#0000FF", 3);
    let cbe2T = TraceBezierQuadratique(B2, B3, B4, nbPts, "#0000FF", 3);

    sphereB0 = tracePt(scene, B0, "#008888", 0.1, true);
    sphereB1 = tracePt(scene, B1, "#008888", 0.1, true);
    sphereB2 = tracePt(scene, B2, "#008888", 0.1, true);
    sphereB3 = tracePt(scene, B3, "#008888", 0.1, true);
    sphereB4 = tracePt(scene, B4, "#008888", 0.1, true);

    let points = new Array(sphereB0, sphereB1, sphereB2, sphereB3, sphereB4);
    let courbes = new Array(cbe1T, cbe2T);

    scene.add(cbe1T);
    scene.add(cbe2T);
























    // Création pierres équipe bleue
    let pierresBleues = new Array();
    for(let i=0; i<5; i++)
        pierresBleues[i] = new Pierre(nbPtCB, nbePtRot, "#0000AA", "#00AA00", "#0000AA");


    // Création pierres équipe rouge
    let pierresRouges = new Array();
    for(let i=0; i<5; i++)
        pierresRouges[i] = new Pierre(nbPtCB, nbePtRot, "#AA0000", "#00AA00", "#AA0000");


    // Ajout des évènements    
    for(let i=0; i<5; i++) {    
        domEvents.addEventListener(pierresBleues[i].latheSup, 'click', event => {
            pierresBleues[i].move(cbeBez, 0);

            // Suppression de l'évènement pour ne pas que la pierre soit relancé quand on reclique dessus
            domEvents.removeEventListener(pierresBleues[i].latheSup, 'click', null, false);

            // Ajout de la pierre rouge suivante sur la scene
            setTimeout(() => {
                pierresRouges[i].addToScene(scene);
                pierresRouges[i].setPosition(pointDebutLancer.x, pointDebutLancer.y, 2.6);
            }, 2000);
        });
    }


    // Ajout des évènements
    for(let i=0; i<5; i++) {    
        domEvents.addEventListener(pierresRouges[i].latheSup, 'click', event => {
            //pierresRouges[i].move(cbJointure, 0);
            pierresRouges[i].move2(cbe1, cbe2, 0, nbPts, 1);

            // Suppression de l'évènement pour ne pas que la pierre soit relancé quand on reclique dessus
            domEvents.removeEventListener(pierresRouges[i].latheSup, 'click', null, false);

            // Ajout de la pierre bleue suivante sur la scene
            setTimeout(() => {
                if (i < 4) {
                    pierresBleues[i+1].addToScene(scene);
                    pierresBleues[i+1].setPosition(pointDebutLancer.x, pointDebutLancer.y, 2.6);
                }    
            }, 2000);  
        });
    }

    
        
    pierresBleues[0].addToScene(scene);
    pierresBleues[0].setPosition(pointDebutLancer.x, pointDebutLancer.y, 2.6);


    

    

    
    
    

    




    // Construction du manche du balais
    const geometry = new THREE.CylinderGeometry( 0.1, 0.1, 5, 32 );
    const material = new THREE.MeshNormalMaterial( {color: 0xffff00} );
    const cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.x = 0;
    cylinder.position.y = 1.65;
    cylinder.position.z = 1.9;
    cylinder.rotateX(Math.PI/4);


    // CSG du cylindre
    let cylinderCSG = new ThreeBSP(cylinder);
    scene.add( cylinder );


    const geometry2 = new THREE.BoxGeometry( 1, 3, 0.15 );
    const material2 = new THREE.MeshNormalMaterial( {color: 0x00ff00} );
    const paralepipede = new THREE.Mesh( geometry2, material2 );
    paralepipede.position.x = cylinder.position.x;
    paralepipede.position.y = cylinder.position.y - 1.65;
    paralepipede.position.z = cylinder.position.z - 1.77;
    paralepipede.rotateZ(Math.PI / 2);

    // CSG du paralepipede
    let paralepipedeCSG = new ThreeBSP(paralepipede);
    scene.add( paralepipede );

    let balais = cylinderCSG.union(paralepipedeCSG);
    balais = balais.toMesh();
    //balais.position.z = 2;
    //balais.position.y = 2;
    //balais.position.x = 0;
    balais.geometry.computeFaceNormals();
    balais.geometry.computeVertexNormals();
    //balais.rotateZ(-Math.PI / 2)
    //scene.add(balais);

    
    
    niemePointBezier = 1;
    function bouger(cbeBez, niemePointBezier, nbPts) {
        setTimeout(() => {

            let pos = cbeBez.getPoint(niemePointBezier/(nbPts*10));
            
            cylinder.position.x = pos.x;
            cylinder.position.y = pos.y + 1.3;
            paralepipede.position.x = cylinder.position.x;
            paralepipede.position.y = cylinder.position.y - 1.65;
            paralepipede.position.z = cylinder.position.z - 1.77;

            
            if (pos.x != cbeBez.getPoint(1).x){
                bouger(cbeBez, niemePointBezier+1, nbPts);                
            } 
        }, 10);
    }
    bouger(cberect, niemePointBezier, nbPts);










































    // partie GUI
    // initialisation des controles gui
    //let gui = new dat.GUI({ autoPlace: true });//interface graphique utilisateur

    //********************************************************
    //
    //  D E B U T     M E N U     G U I
    //
    //********************************************************
    let gui = new dat.GUI();//interface graphique utilisateur
    // ajout du menu dans le GUI
    let menuGUI = new function () {
        this.cameraxPos = 12; //camera.position.x;
        this.camerayPos = 0; //camera.position.y;
        this.camerazPos = 8; //camera.position.z;
        this.cameraZoom = 5.1;
        this.cameraxDir = 0;
        this.camerayDir = 0;
        this.camerazDir = 0;

        this.P1X = B1.x;
        this.P1Y = B1.y;
        this.P2X = B2.x;
        this.P2Y = B2.y;
        this.P3X = B3.x;
        this.P3Y = B3.y;        
        this.P4X = B4.x;
        this.P4Y = B4.y;


        //pour actualiser dans la scene   
        this.actualisation = function () {
            posCamera();
        }; // fin this.actualisation
    }; // fin de la fonction menuGUI
    // ajout de la camera dans le menu
    ajoutCameraGui(gui,menuGUI,camera)
    //ajout du menu pour actualiser l'affichage     
    gui.add(menuGUI, "actualisation");

    modifPointsBezier(scene, gui, menuGUI, cbe1, cbe2, points, courbes, nbPts, "#0000FF");

    menuGUI.actualisation();
    //********************************************************
    //
    //  F I N     M E N U     G U I
    //
    //********************************************************
    renduAnim();


    var vitesse = 1;
    var start = null;

    
    function animate(t) {
        if (start == null) {
            start = t;
        }
        var delai = t - start;

        let p = cbeBez.getPoint((delai * vitesse * .0001) % 1);
        pierresBleues[0].setPosition(p.x, p.y, 3);

        if (p.x > cbeBez.getPoint(0.8).x) {
            requestAnimationFrame(animate);
            rendu.render(scene, camera);
        }
        
    }
    //requestAnimationFrame(animate);
    //pierresBleues[0].animate(cbeBez, vitesse, Date.now(), null, rendu, requestAnimationFrame);




    // definition des fonctions idoines
    function posCamera(){
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom),menuGUI.camerayPos*testZero(menuGUI.cameraZoom),menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        camera.lookAt(menuGUI.cameraxDir,menuGUI.camerayDir,menuGUI.camerazDir);
    }


    // ajoute le rendu dans l'element HTML
    document.getElementById("webgl").appendChild(rendu.domElement);

    // affichage de la scene
    rendu.render(scene, camera);    

    function renduAnim() {
        stats.update();
        // rendu avec requestAnimationFrame
        requestAnimationFrame(renduAnim);
        // ajoute le rendu dans l'element HTML
        rendu.render(scene, camera);
    }

} // fin fonction init()