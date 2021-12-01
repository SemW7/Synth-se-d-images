const borneVue=36;//amplitude de deplacement de la camera


// Fonction qui met à jour le tableau des scores en fonction de la position de chaque pierre
// Elle prend en paramètres le numéro du lancé actuel, le tableau contenant les pierres bleues, 
// le tableau contenant les pierres rouges et la position de la maison 
function updateScore(iemeLance, pierresBleues, pierresRouges, posMaison) {
    let distMin = pierresBleues[0].getPosition().distanceTo(posMaison);
    let eqGagnante = 1; // 1 pour bleu et 2 pour rouge

    for (i=1; i<pierresBleues.length; i++) {
        if (pierresBleues[i].getPosition().distanceTo(posMaison) < distMin) {
            distMin = pierresBleues[i].getPosition().distanceTo(posMaison);
        }
    }

    for (i=0; i<pierresRouges.length && eqGagnante == 1; i++) {
        if (pierresRouges[i].getPosition().distanceTo(posMaison) < distMin) {
            distMin = pierresRouges[i].getPosition().distanceTo(posMaison);
            eqGagnante = 2;
        }
    }

    // Mise à jour du tableau des scores
    if (eqGagnante == 1) {
        document.getElementById("bleu" + iemeLance.toString()).firstChild.nodeValue = "1";
    }
    else {
        document.getElementById("rouge" + iemeLance.toString()).firstChild.nodeValue = "1";
    }

    let totalBleu = 0;
    let totalRouge = 0;
    for(i=1; i<=10; i++) {
        totalBleu += parseInt(document.getElementById("bleu" + i.toString()).firstChild.nodeValue, 10);
        totalRouge += parseInt(document.getElementById("rouge" + i.toString()).firstChild.nodeValue, 10);
    }
    document.getElementById("total-bleu").firstChild.nodeValue = totalBleu.toString();
    document.getElementById("total-rouge").firstChild.nodeValue = totalRouge.toString();

    let score = document.getElementById("score");
    if (totalRouge > totalBleu) {
        score.style.color = "rgba(238, 38, 25, 0.8)";
    }
    else {
        score.style.color = "rgb(43, 113, 170)";
    }

}



 
function init(){
    let stats = initStats();
    // creation de rendu et de la taille
    let rendu = new THREE.WebGLRenderer({ antialias: true });
    rendu.shadowMap.enabled = false;
    let scene = new THREE.Scene();   
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
    rendu.shadowMap.enabled = true;
    rendu.setClearColor(new THREE.Color(0x534f54));
    rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
    cameraLumiere(scene,camera);
    lumiere(scene);
    repere(scene);   




    const domEvents = new THREEx.DomEvents(camera, rendu.domElement);
    const posSol = new THREE.Vector3(-24, 0, -1);
    const posMaison = new THREE.Vector3(-25, 0, -0.45);
    const pointDebutLancer = new THREE.Vector3(15, 0, -0.45);
    const nbPtCB = 50;//nombre de points sur la courbe de Bezier
    const nbePtRot = 50;// nbe de points sur les cercles
    const dimPt = 0.05; 
    const nbPts = 100;//nbe de pts de la courbe de Bezier (utilisé pour les déplacements)
    const zPierre = 2.6;

    let distPBMaison = new Array();
    let distPRMaison = new Array();




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
    let cberect = Trajectoire.rectiligne(scene, pointDebutLancer, new THREE.Vector3(-27, 2.5, -0.45), nbPts, true, "#0000FF");


    // Trajectoire avec jointure G1 entre deux courbes
    let B0 = pointDebutLancer;
    let B1 = new THREE.Vector3(7, -4, -0.45);
    let B2 = new THREE.Vector3(0, -2, -0.450);
    let B3 = new THREE.Vector3(2 * (B2.x - B1.x) + B1.x, 2 * (B2.y - B1.y) + B1.y, -0.45);
    let B4 = new THREE.Vector3(-27, -4, -0.45);

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


    ///////////////////////////////////////////////////////////////////////////
    ///////       Création des pierres avec ajout des évènements        ///////
    ///////////////////////////////////////////////////////////////////////////


    // Création pierres équipe bleue
    let pierresBleues = new Array();
    for(let i=0; i<5; i++)
        pierresBleues[i] = new Pierre(nbPtCB, nbePtRot, "#0000AA", "#00AA00", "#0000AA");


    // Création pierres équipe rouge
    let pierresRouges = new Array();
    for(let i=0; i<5; i++)
        pierresRouges[i] = new Pierre(nbPtCB, nbePtRot, "#AA0000", "#00AA00", "#AA0000");


    let niemeLance = 0;

    // Ajout des évènements    
    for(let i=0; i<5; i++) {    
        domEvents.addEventListener(pierresBleues[i].latheSup, 'click', event => {

            if (i == 0) {
                pierresBleues[i].move0(cberect, 0, nbPts, 1, niemeLance, pierresBleues, pierresRouges, posMaison);
            }
            else {
                pierresBleues[i].move2(cbe1, cbe2, 0, nbPts, 1, niemeLance, pierresBleues, pierresRouges, posMaison); // Position de stop de la pierre
            }

            // Suppression de l'évènement pour ne pas que la pierre soit relancé quand on reclique dessus
            domEvents.removeEventListener(pierresBleues[i].latheSup, 'click', null, false);

            // Ajout de la pierre rouge suivante sur la scene après 2 secondes
            setTimeout(() => {
                pierresRouges[i].addToScene(scene);
                pierresRouges[i].setPosition(pointDebutLancer.x, pointDebutLancer.y, 2.6);
            }, 2000);
        });
    }


    // Ajout des évènements
    for(let i=0; i<5; i++) {    
        domEvents.addEventListener(pierresRouges[i].latheSup, 'click', event => {

            niemeLance++;

            pierresRouges[i].move2(cbe1, cbe2, 0, nbPts, 1, niemeLance, pierresBleues, pierresRouges, posMaison);

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
    
        
    // L'équipe bleue commence la partie
    pierresBleues[0].addToScene(scene);
    pierresBleues[0].setPosition(pointDebutLancer.x, pointDebutLancer.y, zPierre);


    

    


    balaisBleu = new Balais("#4ba5cc", "#ff0000");
    balaisBleu.addToScene(scene);
    balaisBleu.setPosition(-3, -3, 2);


    balaisRouge = new Balais("#ff0000", "#4ba5cc");
    //balaisRouge.addToScene(scene);
    //balaisRouge.setPosition(-3, -3, 2);
    

    
    
    
    niemePointBezier = 1;
    function bouger(cbeBez, niemePointBezier, nbPts) {
        setTimeout(() => {

            let pos = cbeBez.getPoint(niemePointBezier/(nbPts*10));
            
            balaisBleu.setPosition(pos.x, pos.y, balaisBleu.getPosition().z);

            
            if (pos.x != cbeBez.getPoint(1).x){
                bouger(cbeBez, niemePointBezier+1, nbPts);                
            } 
        }, 2);
    }
    //bouger(cberect, niemePointBezier, nbPts);










































    
    ///////////////////////////////////////////////////////////////////////////
    ///////                              MENU GUI                       ///////
    ///////////////////////////////////////////////////////////////////////////

    let gui = new dat.GUI();
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
    };

    ajoutCameraGui(gui,menuGUI,camera);
    modifPointsBezier(scene, gui, menuGUI, cbe1, cbe2, points, courbes, nbPts, "#0000FF");
    menuGUI.actualisation();    
    renduAnim();



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