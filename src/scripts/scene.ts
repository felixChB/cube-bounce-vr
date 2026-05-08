import { Engine, FreeCamera, PBRMaterial, Scene } from '@babylonjs/core';
import { MeshBuilder, GlowLayer } from '@babylonjs/core';
import { DirectionalLight, PointLight } from '@babylonjs/core';
import { Mesh, StandardMaterial, Texture, Color3, Color4, Vector3, CubeTexture } from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';

import { PlayerStartInfo, SceneVariables, BallStartVariables } from './interfaces';
import { ghostColor } from './static-variables';


export const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

// Basic Setup ---------------------------------------------------------------------------------
export const engine = new Engine(canvas, true);
export const scene = new Scene(engine);


// store the textBlock GUI elements for updating the scores
export const guiTextElements: { [key: string]: GUI.TextBlock } = {};
export const guiRectElements: { [key: string]: GUI.Rectangle } = {};

export function createBasicScene(sceneVariables: SceneVariables, ballStartVariables: BallStartVariables, playerStartInfos: { [key: number]: PlayerStartInfo }) {

    const playCubeSize = sceneVariables.playCubeSize;
    const playCubeElevation = sceneVariables.playCubeElevation;
    const playerAreaDepth = sceneVariables.playerAreaDepth;
    const calculatedCubeHeight = sceneVariables.calculatedCubeHeight;
    const midPointOfPlayCube = sceneVariables.midPointOfPlayCube;
    const ballSize = ballStartVariables.size;
    const ballStartPos = ballStartVariables.position;
    const ballColor = ballStartVariables.color;
    // let playerPaddleSize = sceneVariables.playerPaddleSize;

    // Camera --------------------------------------------------------------------------------------
    // Add a camera for the non-VR view in browser
    // var camera = new ArcRotateCamera('Camera', -(Math.PI / 4) * 3, Math.PI / 4, 6, new Vector3(0, 0, 0), scene);
    // camera.attachControl(true); //debug

    const camera = new FreeCamera('Camera', new Vector3(0, 5, 0), scene);
    camera.rotation = new Vector3(Math.PI / 2, Math.PI, Math.PI / 4);
    //camera.detachControl();
    camera.attachControl(true);

    scene.activeCamera = camera;

    // Lights --------------------------------------------------------------------------------------
    // Creates a light, aiming 0,1,0 - to the sky
    // var hemiLight = new HemisphericLight('hemiLight', new Vector3(0, 1, 0), scene);
    // hemiLight.intensity = 0.1;

    var dirLight = new DirectionalLight("DirectionalLight", new Vector3(-0.7, -0.5, 0.4), scene);
    dirLight.position = new Vector3(9, 11, -17);
    dirLight.intensity = 0.2;
    dirLight.shadowMaxZ = 130;
    dirLight.shadowMinZ = 10;

    const ballLight = new PointLight('ballLight', new Vector3(ballStartPos.x, ballStartPos.y, ballStartPos.z), scene);
    ballLight.diffuse = Color3.FromHexString('#1f53ff');
    ballLight.intensity = 2;
    ballLight.radius = ballSize;

    var hdrTexture = new CubeTexture('./assets/abstract_blue.env', scene);
    var skyBoxMesh = scene.createDefaultSkybox(hdrTexture, true, 1000, 0.2);
    if (skyBoxMesh) {
        skyBoxMesh.name = 'skyBoxMesh';
        skyBoxMesh.isVisible = false;
    }

    // Meshes --------------------------------------------------------------------------------------

    let edgeWidth = 0.3;
    let planeEdgeWidth = 0.5;

    var ballSphere = MeshBuilder.CreateSphere('ballSphere', { diameter: 2, segments: 32 }, scene);
    ballSphere.position = new Vector3(ballStartPos.x, ballStartPos.y, ballStartPos.z);
    ballSphere.scaling = new Vector3(ballSize, ballSize, ballSize);

    // Built-in 'ground' shape.
    var ground = MeshBuilder.CreateGround('ground', { width: 60, height: 60 }, scene);

    var playBox = MeshBuilder.CreateBox('playBox', { size: 1 }, scene);
    playBox.position = new Vector3(0, midPointOfPlayCube, 0);
    playBox.scaling = new Vector3(playCubeSize.x, calculatedCubeHeight, playCubeSize.z);
    playBox.enableEdgesRendering();
    playBox.edgesWidth = edgeWidth;
    playBox.edgesColor = new Color4(1, 1, 1, 1);
    // playBox.isVisible = false;

    /*
    // make another smaller ground as a recenter ground
    // only show for debugging to check if it is aligned correctly
    var recenterGround = MeshBuilder.CreateGround('recenterGround', { width: 1, height: 1 }, scene);
    recenterGround.position = new Vector3(playerStartInfos[0].position.x, playerStartInfos[0].position.y, playerStartInfos[0].position.z);
    recenterGround.rotation = new Vector3(playerStartInfos[0].rotation.x, playerStartInfos[0].rotation.y, playerStartInfos[0].rotation.z);
    recenterGround.scaling = new Vector3(1, 1, 1);
    recenterGround.enableEdgesRendering();
    recenterGround.edgesWidth = edgeWidth;
    recenterGround.edgesColor = Color4.FromHexString(playerStartInfos[0].color);
    recenterGround.isVisible = false;
    */

    // Grounds for the Player Start Positions
    var player1Ground = MeshBuilder.CreateBox('player1Ground', { size: 1 }, scene);
    player1Ground.position = new Vector3(playerStartInfos[1].position.x, -25, 0);
    player1Ground.scaling = new Vector3(playerAreaDepth, 50, playCubeSize.z);
    player1Ground.enableEdgesRendering();
    player1Ground.edgesWidth = edgeWidth;
    player1Ground.edgesColor = Color4.FromHexString(playerStartInfos[1].color);

    var player2Ground = MeshBuilder.CreateBox('player2Ground', { size: 1 }, scene);
    player2Ground.position = new Vector3(playerStartInfos[2].position.x, -25, 0);
    player2Ground.scaling = new Vector3(playerAreaDepth, 50, playCubeSize.z);
    player2Ground.enableEdgesRendering();
    player2Ground.edgesWidth = edgeWidth;
    player2Ground.edgesColor = Color4.FromHexString(playerStartInfos[2].color);

    var player3Ground = MeshBuilder.CreateBox('player3Ground', { size: 1 }, scene);
    player3Ground.position = new Vector3(0, -25, playerStartInfos[3].position.z);
    player3Ground.scaling = new Vector3(playCubeSize.x, 50, playerAreaDepth);
    player3Ground.enableEdgesRendering();
    player3Ground.edgesWidth = edgeWidth;
    player3Ground.edgesColor = Color4.FromHexString(playerStartInfos[3].color);

    var player4Ground = MeshBuilder.CreateBox('player4Ground', { size: 1 }, scene);
    player4Ground.position = new Vector3(0, -25, playerStartInfos[4].position.z);
    player4Ground.scaling = new Vector3(playCubeSize.x, 50, playerAreaDepth);
    player4Ground.enableEdgesRendering();
    player4Ground.edgesWidth = edgeWidth;
    player4Ground.edgesColor = Color4.FromHexString(playerStartInfos[4].color);

    player1Ground.isVisible = player2Ground.isVisible = player3Ground.isVisible = player4Ground.isVisible = false;

    var player1GroundPlane = MeshBuilder.CreateBox('player1GroundPlane', { size: 1 }, scene);
    player1GroundPlane.position = new Vector3(playerStartInfos[1].position.x, 0, 0);
    player1GroundPlane.scaling = new Vector3(playerAreaDepth, 0.001, playCubeSize.z);
    player1GroundPlane.enableEdgesRendering();
    player1GroundPlane.edgesWidth = planeEdgeWidth;
    player1GroundPlane.edgesColor = Color4.FromHexString(playerStartInfos[1].color);

    var player2GroundPlane = MeshBuilder.CreateBox('player2GroundPlane', { size: 1 }, scene);
    player2GroundPlane.position = new Vector3(playerStartInfos[2].position.x, 0, 0);
    player2GroundPlane.scaling = new Vector3(playerAreaDepth, 0.001, playCubeSize.z);
    player2GroundPlane.enableEdgesRendering();
    player2GroundPlane.edgesWidth = planeEdgeWidth;
    player2GroundPlane.edgesColor = Color4.FromHexString(playerStartInfos[2].color);

    var player3GroundPlane = MeshBuilder.CreateBox('player3GroundPlane', { size: 1 }, scene);
    player3GroundPlane.position = new Vector3(0, 0, playerStartInfos[3].position.z);
    player3GroundPlane.scaling = new Vector3(playCubeSize.x, 0.001, playerAreaDepth);
    player3GroundPlane.enableEdgesRendering();
    player3GroundPlane.edgesWidth = planeEdgeWidth;
    player3GroundPlane.edgesColor = Color4.FromHexString(playerStartInfos[3].color);

    var player4GroundPlane = MeshBuilder.CreateBox('player4GroundPlane', { size: 1 }, scene);
    player4GroundPlane.position = new Vector3(0, 0, playerStartInfos[4].position.z);
    player4GroundPlane.scaling = new Vector3(playCubeSize.x, 0.001, playerAreaDepth);
    player4GroundPlane.enableEdgesRendering();
    player4GroundPlane.edgesWidth = planeEdgeWidth;
    player4GroundPlane.edgesColor = Color4.FromHexString(playerStartInfos[4].color);

    var player1Wall = MeshBuilder.CreateBox('player1Wall', { size: 1 }, scene);
    player1Wall.position = new Vector3(playCubeSize.x / 2 + 0, midPointOfPlayCube, 0);
    player1Wall.scaling = new Vector3(0.01, calculatedCubeHeight, playCubeSize.z);

    var player2Wall = MeshBuilder.CreateBox('player2Wall', { size: 1 }, scene);
    player2Wall.position = new Vector3(-playCubeSize.x / 2 - 0, midPointOfPlayCube, 0);
    player2Wall.scaling = new Vector3(0.01, calculatedCubeHeight, playCubeSize.z);

    var player3Wall = MeshBuilder.CreateBox('player3Wall', { size: 1 }, scene);
    player3Wall.position = new Vector3(0, midPointOfPlayCube, playCubeSize.z / 2 + 0);
    player3Wall.scaling = new Vector3(playCubeSize.x, calculatedCubeHeight, 0.01);

    var player4Wall = MeshBuilder.CreateBox('player4Wall', { size: 1 }, scene);
    player4Wall.position = new Vector3(0, midPointOfPlayCube, -playCubeSize.z / 2 - 0);
    player4Wall.scaling = new Vector3(playCubeSize.x, calculatedCubeHeight, 0.01);

    // create walls for the top and the bottom of the playcube
    var topWall = MeshBuilder.CreateBox('player5Wall', { size: 1 }, scene);
    topWall.position = new Vector3(0, playCubeSize.y, 0);
    topWall.scaling = new Vector3(playCubeSize.x, 0.01, playCubeSize.z);

    var bottomWall = MeshBuilder.CreateBox('player6Wall', { size: 1 }, scene);
    bottomWall.position = new Vector3(0, playCubeElevation, 0);
    bottomWall.scaling = new Vector3(playCubeSize.x, 0.01, playCubeSize.z);

    let HUDMesh = MeshBuilder.CreatePlane(`client_HUD`, { size: 1 }, scene);
    HUDMesh.position = new Vector3(0, 2.5, 0);
    HUDMesh.rotation = new Vector3(0, 0, 0);
    HUDMesh.scaling = new Vector3(playCubeSize.x, calculatedCubeHeight, 1);
    HUDMesh.isVisible = false;

    // GUI --------------------------------------------------------------------------------------

    var playerHUDTex = GUI.AdvancedDynamicTexture.CreateForMesh(HUDMesh);
    // Player Score
    var HUDRect = new GUI.Rectangle();
    HUDRect.width = "95%";
    HUDRect.height = "95%";
    HUDRect.thickness = 5;
    HUDRect.color = "red";
    HUDRect.alpha = 1;
    HUDRect.zIndex = 1;
    //HUDRect.isVisible = false;
    playerHUDTex.addControl(HUDRect);

    var HUDLabel = new GUI.TextBlock();
    HUDLabel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    HUDLabel.fontFamily = "loadedFont";
    HUDLabel.text = "";
    HUDLabel.color = "red";
    HUDLabel.fontSize = 50;
    HUDRect.addControl(HUDLabel);
    // add to guiTextElements
    guiRectElements[`client_HUDRect`] = HUDRect;
    guiTextElements[`client_HUDLabel`] = HUDLabel;

    // Materials --------------------------------------------------------------------------------------

    var wireframeTexture = new Texture('./assets/figma_grid_wireframe_white.png', scene);
    wireframeTexture.uScale = 1;
    wireframeTexture.vScale = 1;
    wireframeTexture.hasAlpha = true;
    // const simpleGridTexture = new Texture('./assets/figma_grid_wireframe_blue.png', scene);

    var wireframeMat = new StandardMaterial('wireframeMat', scene);
    wireframeMat.roughness = 1;
    wireframeMat.diffuseTexture = wireframeTexture;
    wireframeMat.diffuseTexture.hasAlpha = true;
    wireframeMat.emissiveTexture = wireframeTexture;
    wireframeMat.emissiveTexture.hasAlpha = true;
    wireframeMat.useAlphaFromDiffuseTexture = true;
    wireframeMat.backFaceCulling = false;
    wireframeMat.emissiveColor = Color3.Red();
    wireframeMat.diffuseColor = Color3.FromHexString('#ffffff');
    wireframeMat.alpha = 0.5;

    var playBoxMat = new StandardMaterial('playBoxMat', scene);
    playBoxMat.diffuseColor = Color3.FromHexString('#ffffff');
    playBoxMat.alpha = 0;
    playBoxMat.specularColor = new Color3(0, 0, 0);

    var ballMaterial = new PBRMaterial('ballMaterial', scene);
    ballMaterial.emissiveColor = Color3.FromHexString(ballColor);
    ballMaterial.metallic = 0.0;
    ballMaterial.emissiveIntensity = 10;

    var playerStartMat = new PBRMaterial('playerStartMat', scene);
    playerStartMat.albedoColor = Color3.FromHexString('#141414');
    playerStartMat.metallic = 1.0;
    playerStartMat.roughness = 0.0;

    var playerStartMatPlane = new PBRMaterial('playerStartMatPlane', scene);
    playerStartMat.albedoColor = Color3.FromHexString('#141414');
    playerStartMatPlane.alpha = 0.4;
    playerStartMatPlane.backFaceCulling = true;

    var playerWallMat = new PBRMaterial('playerWallMat', scene);
    playerWallMat.albedoColor = Color3.FromHexString('#000000');
    playerWallMat.alpha = 0.5;
    playerWallMat.metallic = 0.2;
    playerWallMat.roughness = 0.5;
    playerWallMat.backFaceCulling = false;

    var wallBounceMat = new PBRMaterial('wallBounceMat', scene);
    wallBounceMat.albedoColor = Color3.FromHexString('#575757');
    //wallBounceMat.emissiveColor = Color3.FromHexString('#ffffff');
    wallBounceMat.alpha = 0.5;
    wallBounceMat.metallic = 0.2;
    wallBounceMat.roughness = 0.5;
    wallBounceMat.backFaceCulling = false;

    // creating the player 0 Material if the player has no position yet
    var player0Mat = new PBRMaterial(`player0_mat`, scene);
    player0Mat.emissiveColor = Color3.FromHexString(ghostColor);
    player0Mat.alpha = 0.2;
    player0Mat.disableLighting = true;
    player0Mat.backFaceCulling = false;

    // creating the Materials for the players
    var player1Mat = new PBRMaterial(`player1_mat`, scene);
    player1Mat.emissiveColor = Color3.FromHexString(playerStartInfos[1].color);
    player1Mat.alpha = 0.2;
    player1Mat.disableLighting = true;
    player1Mat.backFaceCulling = false;
    var player1PaddleMat = new PBRMaterial(`player1_paddle_mat`, scene);
    player1PaddleMat.emissiveColor = Color3.FromHexString(playerStartInfos[1].color);
    player1PaddleMat.alpha = 0.2;
    player1PaddleMat.disableLighting = true;
    player1PaddleMat.backFaceCulling = false;

    var player2Mat = new PBRMaterial(`player2_mat`, scene);
    player2Mat.emissiveColor = Color3.FromHexString(playerStartInfos[2].color);
    player2Mat.alpha = 0.2;
    player2Mat.disableLighting = true;
    player2Mat.backFaceCulling = false;
    var player2PaddleMat = new PBRMaterial(`player2_paddle_mat`, scene);
    player2PaddleMat.emissiveColor = Color3.FromHexString(playerStartInfos[2].color);
    player2PaddleMat.alpha = 0.2;
    player2PaddleMat.disableLighting = true;
    player2PaddleMat.backFaceCulling = false;

    var player3Mat = new PBRMaterial(`player3_mat`, scene);
    player3Mat.emissiveColor = Color3.FromHexString(playerStartInfos[3].color);
    player3Mat.alpha = 0.2;
    player3Mat.disableLighting = true;
    player3Mat.backFaceCulling = false;
    var player3PaddleMat = new PBRMaterial(`player3_paddle_mat`, scene);
    player3PaddleMat.emissiveColor = Color3.FromHexString(playerStartInfos[3].color);
    player3PaddleMat.alpha = 0.2;
    player3PaddleMat.disableLighting = true;
    player3PaddleMat.backFaceCulling = false;

    var player4Mat = new PBRMaterial(`player4_mat`, scene);
    player4Mat.emissiveColor = Color3.FromHexString(playerStartInfos[4].color);
    player4Mat.alpha = 0.2;
    player4Mat.disableLighting = true;
    player4Mat.backFaceCulling = false;
    var player4PaddleMat = new PBRMaterial(`player4_paddle_mat`, scene);
    player4PaddleMat.emissiveColor = Color3.FromHexString(playerStartInfos[4].color);
    player4PaddleMat.alpha = 0.2;
    player4PaddleMat.disableLighting = true;
    player4PaddleMat.backFaceCulling = false;

    // Setting Materials
    ground.material = wireframeMat;
    ballSphere.material = ballMaterial;

    playBox.material = playBoxMat;

    for (let i = 1; i <= 4; i++) {
        let playerGround = scene.getMeshByName(`player${i}Ground`) as Mesh;
        let playerGroundPlane = scene.getMeshByName(`player${i}GroundPlane`) as Mesh;
        let playerWall = scene.getMeshByName(`player${i}Wall`) as Mesh;
        if (playerGround) {
            playerGround.material = playerStartMat;
            // playerGround.material = wireframeMat;
        }
        if (playerGroundPlane) {
            playerGroundPlane.material = playerStartMatPlane;
            // playerGroundPlane.material = wireframeMat;
        }
        if (playerWall) {
            playerWall.material = playerWallMat;
            // playerWall.material = wireframeMat;
        }
    }

    // recenterGround.material = playerStartMat;

    topWall.material = playerWallMat;
    bottomWall.material = playerWallMat;

    ground.isVisible = false;

    // Processing --------------------------------------------------------------------------------------

    // add a Glowlayer to let emissive materials glow
    var gl = new GlowLayer("glow", scene, {
        mainTextureFixedSize: 1024,
        blurKernelSize: 64,
    });
    gl.intensity = 0.6;
}