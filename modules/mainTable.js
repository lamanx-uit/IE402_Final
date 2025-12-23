import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { GUI } from "lil-gui";

export const loadMainTable = (scene) => {
  const loader = new GLTFLoader();
  const gui = new GUI();

  loader.load("../public/models/main_table.glb", (gltf) => {
    const table = gltf.scene;
    console.log("Main Table", gltf);

    // Position the table in the center of the room
    table.position.set(2, -2, 0);
    table.rotation.set(0, Math.PI / 2, 0); // Rotate 90° around Y-axis to align with room length
    table.scale.set(35, 25, 25);

      // Add multiple lights focused on the table
      // Top spotlight
      const topLight = new THREE.SpotLight(0xffffff, 2.0);
      topLight.position.set(0, 8, 0);
      topLight.target.position.copy(table.position);
      topLight.angle = Math.PI / 6;
      topLight.penumbra = 0.5;
      topLight.castShadow = true;
      scene.add(topLight);
      scene.add(topLight.target);

      // Side lights
      const light1 = new THREE.PointLight(0xffffff, 2.0, 20);
      light1.position.set(10, 2, 0);
      scene.add(light1);

      const light2 = new THREE.PointLight(0xffffff, 2.0, 20);
      light2.position.set(-10, 2, 0);
      scene.add(light2);

      // Front/back lights
      const light3 = new THREE.PointLight(0xffffff, 2, 15);
      light3.position.set(0, 1, 8);
      scene.add(light3);

      const light4 = new THREE.PointLight(0xffffff, 2, 15);
      light4.position.set(0, 1, -8);
      scene.add(light4);

    // Add the table to the scene
    scene.add(table);

    // Add GUI controls for the table
    const tableFolder = gui.addFolder("Main Table");
    tableFolder.add(table.position, "x", -50, 50).name("X Position");
    tableFolder.add(table.position, "y", -10, 10).name("Y Position");
    tableFolder.add(table.position, "z", -50, 50).name("Z Position");
    tableFolder.add(table.rotation, "y", 0, Math.PI * 2).name("Rotation");
    tableFolder.add(table.scale, "x", 0, 10).name("Scale").onChange((value) => {
      table.scale.set(value, value, value);
    });
  });
};
