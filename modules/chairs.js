import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadChairs = (scene) => {
  const loader = new GLTFLoader();

  loader.load("../public/models/chair.glb", (gltf) => {
    const chairModel = gltf.scene;
    console.log("Chair Model Loaded", gltf);

    // Table is at position (2, -2, 0) with rotation Math.PI/2
    // The table's length extends along the X-axis (length of the room)
    const tableX = 2;
    const tableY = -2;
    const tableZ = 0;

    // Number of chairs per side
    const chairsPerSide = 8;

    // Spacing between chairs along the table length (X-axis)
    const spacing = 3;

    // Distance from table center to chair (Z-axis, perpendicular to table length)
    const distanceFromTable = 5;

    // Calculate starting X position to center chairs along table
    const startX = tableX - ((chairsPerSide - 1) * spacing) / 2;

    // Create 10 chairs on one side (positive Z)
    for (let i = 0; i < chairsPerSide; i++) {
      const chair = chairModel.clone();
      chair.position.set(
        startX + i * spacing,
        tableY + 0.75,
        tableZ + distanceFromTable
      );
      chair.rotation.set(0, Math.PI, 0); // Face the table (face negative Z direction)
      chair.scale.set(5, 5, 5);
      scene.add(chair);
    }

    // Create 10 chairs on the other side (negative Z)
    for (let i = 0; i < chairsPerSide; i++) {
      const chair = chairModel.clone();
      chair.position.set(
        startX + i * spacing,
        tableY + 0.75,
        tableZ - distanceFromTable
      );
      chair.rotation.set(0, 0, 0); // Face the table (face positive Z direction)
      chair.scale.set(5, 5, 5);
      scene.add(chair);
    }
  });
};
