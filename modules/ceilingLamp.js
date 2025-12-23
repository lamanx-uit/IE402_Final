import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { GUI } from "lil-gui";

export const loadCeilingLampModel = (scene) => {
  const loader = new GLTFLoader();
  const gui = new GUI();

  loader.load("../public/models/chandelier_2.glb", (glb) => {
    console.log("Ceiling Lamp", glb);

    // Create 3 chandeliers positioned along the room
    const positions = [
      { x: -15, z: 0, name: "Left" },
      { x: 0, z: 0, name: "Center" },
      { x: 15, z: 0, name: "Right" }
    ];

    positions.forEach((pos) => {
      const lamp = glb.scene.clone(); // Clone the model for each chandelier

      // Position and scale the lamp
      lamp.position.set(pos.x, 13, pos.z);
      lamp.scale.set(7, 7, 7); 
      
      // Add the lamp to the scene
      scene.add(lamp);

      // Add GUI controls for each lamp
      const lampFolder = gui.addFolder(`Chandelier ${pos.name}`);
      lampFolder.add(lamp.position, "x", -50, 50).name("X Position");
      lampFolder.add(lamp.position, "y", -50, 50).name("Y Position");
      lampFolder.add(lamp.position, "z", -50, 50).name("Z Position");
      lampFolder.add(lamp.scale, "x", 0, 10).name("Scale").onChange((value) => {
        lamp.scale.set(value, value, value);
      });
    });
  });
};
