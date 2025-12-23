import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadBigDeskVases = (scene) => {
  const loader = new GLTFLoader();

  loader.load("../public/models/bigDesk_vase.glb", (gltf) => {
    const vaseModel = gltf.scene;
    console.log("Big Desk Vase Loaded", gltf);

    // Left wall is at X = -25
    // Curtain is at center (Z = 0)
    // Position vases on either side of the curtain
    const wallX = -24;
    const distanceFromCenter = 8; // Distance from curtain along Z-axis

    // Vase 1 - positive Z side
    const vase1 = vaseModel.clone();
    vase1.position.set(wallX, 0.8, distanceFromCenter);
    vase1.rotation.set(0, 0, 0);
    vase1.scale.set(8, 8, 8);
    scene.add(vase1);

    // Vase 2 - negative Z side
    const vase2 = vaseModel.clone();
    vase2.position.set(wallX, 0.8, -distanceFromCenter);
    vase2.rotation.set(0, 0, 0);
    vase2.scale.set(8, 8, 8);
    scene.add(vase2);
  });
};
