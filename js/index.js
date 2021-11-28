const borneVue=36;//amplitude de deplacement de la camera

 
function init(){
    let stats = initStats();
    // creation de rendu et de la taille
    let rendu = new THREE.WebGLRenderer({ antialias: true });
    rendu.shadowMap.enabled = false;
    let scene = new THREE.Scene();   
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
    rendu.shadowMap.enabled = true;
    rendu.setClearColor(new THREE.Color(0xFFFFFF));
    rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
    cameraLumiere(scene,camera);
    lumiere(scene);
    repere(scene);



    const domEvents = new THREEx.DomEvents(camera, rendu.domElement);

    //plan du sol
    const largPlan = 80;
    const hautPlan = 13;
    const nbSegmentLarg = 30;
    const nbSegmentHaut = 30;
    const PlanSolGeometry = new THREE.PlaneGeometry(largPlan,hautPlan,nbSegmentLarg,nbSegmentHaut);
    const PlanSol = surfPhong(PlanSolGeometry,"#FFFFFF",1,true,"#335533");
    PlanSol.position.x = -15;
    PlanSol.position.z = 0;
    PlanSol.receiveShadow = true; 
    PlanSol.castShadow = true;
    scene.add(PlanSol);
    // fin du plan du sol


    const nbPtCB=50;//nombre de points sur la courbe de Bezier
    const nbePtRot=50;// nbe de points sur les cercles
    const dimPt=0.05; 
    const nbPts = 100;//nbe de pts de la courbe de Bezier

    const posMaisonFin = new THREE.Vector3(-25, 0, 0.012);
    const posMaisonDebut = new THREE.Vector3(18, 0, 0.012);

    const pointDebutLancer = new THREE.Vector3(18, 0, 0.012);


    // Positionnement des maisons
    let maisonFin = new Maison(posMaisonFin.x, posMaisonFin.y, posMaisonFin.z);
    maisonFin.addToScene(scene);

    let maisonDebut = new Maison(posMaisonDebut.x, posMaisonDebut.y, posMaisonDebut.z);
    maisonDebut.addToScene(scene);






    ///////////////////////////////////////////////////////////////////////////
    ///////                 Définition des trajectoires                 ///////
    ///////////////////////////////////////////////////////////////////////////

    //Trajectoire rectiligne
    let A0 = pointDebutLancer;
    let A1 = new THREE.Vector3(0, 1, 0);
    let A2 = new THREE.Vector3(-27, 2.5, 0);
    tracePt(scene, A0, "#008888", 0.1,true);
    tracePt(scene, A1, "#008888", 0.1,true);
    tracePt(scene, A2, "#008888", 0.1,true);

    let rectiligne = TraceBezierQuadratique(A0, A1, A2, nbPts,"#0000FF",1);
    let cberect = new THREE.QuadraticBezierCurve3(A0, A1, A2);
    scene.add(rectiligne);
    

    // Trajectoire curve
    let N0 = new THREE.Vector3(18, 0, 0);
    let N1 = new THREE.Vector3(0, 8, 0);
    let randomX2 = -((Math.random() * 13) + 18);
    let a = Math.random();
    let randomY2;
    if (a > 0.5){
        randomY2 = ((Math.random() * 11) + 5.5);
    }
    else{
        randomY2 = -((Math.random() * 11) + 5.5);
    }
    let N2 = new THREE.Vector3(randomX2, randomY2, 0);
    tracePt(scene, N0, "#008888", 0.1,true);
    tracePt(scene, N1, "#008888", 0.1, true);
    tracePt(scene, N2, "#A207FA", 0.1, true);

    let cbeBezCourbeQ = TraceBezierQuadratique(N0, N1, N2, nbPts,"#0000FF",3);
    var cbeBez = new THREE.QuadraticBezierCurve3(N0, N1, N2);
    scene.add(cbeBezCourbeQ);









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
            pierresBleues[i].move(cberect, 1, nbPts);

            // Suppression de l'évènement pour ne pas que la pierre soit relancé quand on reclique dessus
            domEvents.removeEventListener(pierresBleues[i].latheSup, 'click', null, false);

            // Ajout de la pierre rouge suivante sur la scene
            setTimeout(() => {
                pierresRouges[i].addToScene(scene);
                pierresRouges[i].setPosition(18, 0, 3);
            }, 2000);
        });
    }


    // Ajout des évènements
    for(let i=0; i<5; i++) {    
        domEvents.addEventListener(pierresRouges[i].latheSup, 'click', event => {
            pierresRouges[i].move(cbeBez, 1, nbPts);

            // Suppression de l'évènement pour ne pas que la pierre soit relancé quand on reclique dessus
            domEvents.removeEventListener(pierresRouges[i].latheSup, 'click', null, false);

            // Ajout de la pierre bleue suivante sur la scene
            setTimeout(() => {
                if (i < 4) {
                    pierresBleues[i+1].addToScene(scene);
                    pierresBleues[i+1].setPosition(18, 0, 3);
                }    
            }, 2000);  
        });
    }

    
        
    pierresBleues[0].addToScene(scene);
    pierresBleues[0].setPosition(18, 0, 3);


    

    

    
    
    

    




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
        this.camerazPos = 6.4; //camera.position.z;
        this.cameraZoom = 5.1;
        this.cameraxDir = 0;
        this.camerayDir = 0;
        this.camerazDir = 0;

        //pour actualiser dans la scene   
        this.actualisation = function () {
            posCamera();
        }; // fin this.actualisation
    }; // fin de la fonction menuGUI
    // ajout de la camera dans le menu
    ajoutCameraGui(gui,menuGUI,camera)
    //ajout du menu pour actualiser l'affichage 
    gui.add(menuGUI, "actualisation");
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
        actuaPosCameraHTML();
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