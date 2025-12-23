import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadBigPictureDesk = (scene) => {
  const loader = new GLTFLoader();

  loader.load("../public/models/bigPicture_desk.glb", (gltf) => {
    const desk = gltf.scene;
    console.log("Big Picture Desk Loaded", gltf);

    // Right wall is at X = 25
    // Rotate 180 degrees and position against the right wall
    desk.position.set(24, 2, 0);
    desk.rotation.set(0, Math.PI, 0); // 180 degree rotation
    desk.scale.set(23, 23, 23);

    scene.add(desk);

    // Add lights to illuminate the desk
    // Spotlight from above
    const spotlight = new THREE.SpotLight(0xffffff, 1.0);
    spotlight.position.set(24, 10, 0);
    spotlight.target.position.copy(desk.position);
    spotlight.angle = Math.PI / 4;
    spotlight.penumbra = 0.3;
    spotlight.castShadow = true;
    scene.add(spotlight);
    scene.add(spotlight.target);

    // Point light on the left side
    const pointLight1 = new THREE.PointLight(0xffffff, 2.0, 15);
    pointLight1.position.set(20, 4, 5);
    scene.add(pointLight1);

    // Point light on the right side
    const pointLight2 = new THREE.PointLight(0xffffff, 2.0, 15);
    pointLight2.position.set(20, 4, -5);
    scene.add(pointLight2);
  });
};
