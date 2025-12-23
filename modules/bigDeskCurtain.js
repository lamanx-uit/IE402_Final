import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadCurtain = (scene) => {
  const loader = new GLTFLoader();

  loader.load("../public/models/main_curtain.glb", (gltf) => {
    const curtain = gltf.scene;
    console.log("Curtain Loaded", gltf);

    // Left wall is at X = -25
    // Position curtain at the center of the left wall
    curtain.position.set(-24.5, 5.5, 0);
    curtain.rotation.set(0, 0, 0); // Face into the room
    curtain.scale.set(17, 18, 17);

    scene.add(curtain);

    // Add lights to illuminate the curtain and surrounding area
    // Balanced to match the right side lighting
    // Spotlight from above targeting the curtain
    const spotlight = new THREE.SpotLight(0xffffe0, 1.0);
    spotlight.position.set(-24.5, 12, 0);
    spotlight.target.position.copy(curtain.position);
    spotlight.angle = Math.PI / 4;
    spotlight.penumbra = 0.3;
    spotlight.castShadow = true;
    scene.add(spotlight);
    scene.add(spotlight.target);

    // Point light on positive Z side (near vase 1)
    const pointLight1 = new THREE.PointLight(0xffffe0, 2.0, 15);
    pointLight1.position.set(-20, 4, 8);
    scene.add(pointLight1);

    // Point light on negative Z side (near vase 2)
    const pointLight2 = new THREE.PointLight(0xffffe0, 2.0, 15);
    pointLight2.position.set(-20, 4, -8);
    scene.add(pointLight2);
  });
};
