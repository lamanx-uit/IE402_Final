import * as THREE from "three";
import { scene, setupScene } from "./modules/scene.js";
import { createPaintings } from "./modules/paintings.js";
import { createWalls } from "./modules/walls.js";
import { setupLighting } from "./modules/lighting.js";
import { setupFloor } from "./modules/floor.js";
import { createCeiling } from "./modules/ceiling.js";
import { createBoundingBoxes } from "./modules/boundingBox.js";
import { setupRendering } from "./modules/rendering.js";
import { setupEventListeners } from "./modules/eventListeners.js";
import { addObjectsToScene } from "./modules/sceneHelpers.js";
import { setupPlayButton } from "./modules/menu.js";
import { setupAudio } from "./modules/audioGuide.js";
import { clickHandling } from "./modules/clickHandling.js";
import { setupVR } from "./modules/VRSupport.js";
import { loadCeilingLampModel } from "./modules/ceilingLamp.js";
import { loadMainTable } from "./modules/mainTable.js";
import { loadChairs } from "./modules/chairs.js";
import { loadBigPictureDesk } from "./modules/bigPictureDesk.js";
import { loadCurtain } from "./modules/bigDeskCurtain.js";
import { loadBigDeskVases } from "./modules/bigDeskVases.js";
import { loadLeftWallDecor } from "./modules/leftWallDecor.js";
import { loadBackWallDecor } from "./modules/backWallDecor.js";

let { camera, controls, renderer } = setupScene();

setupAudio(camera);

const textureLoader = new THREE.TextureLoader();

const walls = createWalls(scene, textureLoader);
const floor = setupFloor(scene);
const ceiling = createCeiling(scene, textureLoader);
// const paintings = createPaintings(scene, textureLoader); // REMOVED
const lighting = setupLighting(scene, null); // paintings removed

createBoundingBoxes(walls);
// createBoundingBoxes(paintings); // REMOVED

// addObjectsToScene(scene, paintings); // REMOVED

setupPlayButton(controls);

setupEventListeners(controls);

// clickHandling(renderer, camera, paintings); // REMOVED - no paintings

setupRendering(scene, camera, renderer, [], controls, walls); // empty array for paintings


loadCeilingLampModel(scene);

loadMainTable(scene);

loadChairs(scene);

loadBigPictureDesk(scene);

loadCurtain(scene);

loadBigDeskVases(scene);

loadLeftWallDecor(scene);

loadBackWallDecor(scene);

setupVR(renderer);
