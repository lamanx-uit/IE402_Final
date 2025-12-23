import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { EXRLoader } from "three/addons/loaders/EXRLoader";

export const loadLeftWallDecor = (scene) => {
  const loader = new GLTFLoader();

  // Front wall is at Z = -12.5
  const wallZ = -12;

  // Pattern: curtain -> curtain -> vase -> curtain -> vase -> curtain -> vase -> curtain -> curtain
  const pattern = ['curtain', 'curtain', 'vase', 'curtain', 'vase', 'curtain', 'vase', 'curtain', 'curtain'];

  // Item widths
  const curtainWidth = 2.5;     // Curtain width at scale 5
  const vaseWidth = 1.5;        // Vase width at scale 5

  // Front wall boundaries
  const startX = -22.5; // Start position (left side with spacing from corner)
  const endX = 20;    // End position (right side with spacing from corner)
  const totalDistance = endX - startX; // Total available distance

  // Count curtains in pattern
  const curtainCount = pattern.filter(item => item === 'curtain').length; // 6 curtains

  // Calculate equal spacing between curtain centers
  const curtainSpacing = totalDistance / (curtainCount - 1);

  // Calculate gaps based on curtain spacing
  // For adjacent curtains: gap = curtainSpacing - curtainWidth
  const curtainToCurtainGap = curtainSpacing - curtainWidth;

  // For curtain -> vase -> curtain: total distance is curtainSpacing
  // curtainSpacing = curtainWidth/2 + gap1 + vaseWidth + gap2 + curtainWidth/2
  // With symmetric gaps: gap1 = gap2
  // curtainSpacing = curtainWidth + 2*gap1 + vaseWidth
  const curtainToVaseGap = (curtainSpacing - curtainWidth - vaseWidth) / 2;
  const vaseToCurtainGap = curtainToVaseGap;

  let curtainModel, vaseModel, lightModel, glassTexture;
  let curtainsLoaded = false;
  let vasesLoaded = false;
  let lightsLoaded = false;
  let glassLoaded = false;

  // Load curtain model
  loader.load("../public/models/curtain.glb", (gltf) => {
    curtainModel = gltf.scene;
    console.log("Small Curtain Loaded", gltf);
    curtainsLoaded = true;
    if (vasesLoaded && lightsLoaded && glassLoaded) placeItems();
  });

  // Load small vase model
  loader.load("../public/models/smallDesk_vase.glb", (gltf) => {
    vaseModel = gltf.scene;
    console.log("Small Desk Vase Loaded", gltf);
    vasesLoaded = true;
    if (curtainsLoaded && lightsLoaded && glassLoaded) placeItems();
  });

  // Load light model
  loader.load("../public/models/light.glb", (gltf) => {
    lightModel = gltf.scene;
    console.log("Light Model Loaded", gltf);
    lightsLoaded = true;
    if (curtainsLoaded && vasesLoaded && glassLoaded) placeItems();
  });

  // Load glass texture
  const exrLoader = new EXRLoader();
  exrLoader.load("../public/models/glass.exr", (texture) => {
    glassTexture = texture;
    glassTexture.mapping = THREE.EquirectangularReflectionMapping;
    console.log("Glass Texture Loaded");
    glassLoaded = true;
    if (curtainsLoaded && vasesLoaded && lightsLoaded) placeItems();
  });

  function placeItems() {
    let currentX = startX;
    const itemPositions = []; // Track center positions of items
    const curtainPositions = []; // Track curtain X positions for panorama mapping

    // First pass: collect all item and curtain positions
    let tempX = startX;
    pattern.forEach((itemType, index) => {
      const itemWidth = itemType === 'curtain' ? curtainWidth : vaseWidth;
      const centerX = tempX + itemWidth / 2;

      itemPositions.push({ x: centerX, type: itemType, index });

      if (itemType === 'curtain') {
        curtainPositions.push(centerX);
      }

      if (index < pattern.length - 1) {
        const nextItemType = pattern[index + 1];
        let gap;
        if (itemType === 'curtain' && nextItemType === 'curtain') {
          gap = curtainToCurtainGap;
        } else if (itemType === 'curtain' && nextItemType === 'vase') {
          gap = curtainToVaseGap;
        } else if (itemType === 'vase' && nextItemType === 'curtain') {
          gap = vaseToCurtainGap;
        } else {
          gap = 0.5;
        }
        tempX += itemWidth + gap;
      }
    });

    // Second pass: place items with UV-mapped glass
    currentX = startX;
    let curtainIndex = 0;

    pattern.forEach((itemType, index) => {
      const itemWidth = itemType === 'curtain' ? curtainWidth : vaseWidth;
      const centerX = currentX + itemWidth / 2;

      if (itemType === 'curtain') {
        const curtain = curtainModel.clone();
        curtain.position.set(centerX, 5.5, wallZ);
        curtain.rotation.set(0, 3 * Math.PI / 2, 0);
        curtain.scale.set(7.5, 18, 7.5);
        scene.add(curtain);

        // Calculate UV offset for this curtain's slice in the panorama
        const sliceWidth = 1 / curtainPositions.length; // Each curtain gets 1/6th of the panorama
        const uvOffset = curtainIndex * sliceWidth; // Start of this curtain's slice

        // Clone texture for this specific curtain
        const curtainGlassTexture = glassTexture.clone();
        curtainGlassTexture.needsUpdate = true;
        curtainGlassTexture.offset.x = uvOffset;
        curtainGlassTexture.repeat.set(sliceWidth, 1);
        curtainGlassTexture.wrapS = THREE.ClampToEdgeWrapping;
        curtainGlassTexture.wrapT = THREE.ClampToEdgeWrapping;

        // Add glass plane with UV mapping for panorama slice
        const glassGeometry = new THREE.PlaneGeometry(2, 4);
        const glassMaterial = new THREE.MeshPhysicalMaterial({
          map: curtainGlassTexture,
          transparent: true,
          opacity: 0.5,
          transmission: 0.9,
          roughness: 0.1,
          metalness: 0.0,
          envMapIntensity: 1.0,
        });

        const glass = new THREE.Mesh(glassGeometry, glassMaterial);
        glass.position.set(centerX, 6, wallZ);
        glass.rotation.set(0, 0, 0);
        glass.scale.set(2.5, 13.5, 2.5);
        scene.add(glass);

        curtainIndex++;
      } else if (itemType === 'vase') {
        const vase = vaseModel.clone();
        vase.position.set(centerX, 0, wallZ + 1);
        vase.rotation.set(0, 3 * Math.PI / 2, 0);
        vase.scale.set(6, 6, 6);
        scene.add(vase);
      }

      // Calculate gap to next item based on current and next item types
      if (index < pattern.length - 1) {
        const nextItemType = pattern[index + 1];
        let gap;

        if (itemType === 'curtain' && nextItemType === 'curtain') {
          gap = curtainToCurtainGap;
        } else if (itemType === 'curtain' && nextItemType === 'vase') {
          gap = curtainToVaseGap;
        } else if (itemType === 'vase' && nextItemType === 'curtain') {
          gap = vaseToCurtainGap;
        } else {
          gap = 0.5; // vase to vase (shouldn't happen in this pattern)
        }

        currentX += itemWidth + gap;
      }
    });

    // Add 5 light models:
    // - 1 between first curtain pair (indices 0-1)
    // - 3 above vases (indices 2, 4, 6)
    // - 1 between last curtain pair (indices 7-8)

    // Light between first curtain pair
    const light1X = (itemPositions[0].x + itemPositions[1].x) / 2;
    const light1 = lightModel.clone();
    light1.position.set(light1X, 7, wallZ);
    light1.rotation.set(0, -Math.PI / 2, 0); // Rotate 90° to the left
    light1.scale.set(2, 2, 2);
    scene.add(light1);

    // Lights above vases (indices 2, 4, 6)
    [2, 4, 6].forEach(idx => {
      const light = lightModel.clone();
      light.position.set(itemPositions[idx].x, 7, wallZ);
      light.rotation.set(0, -Math.PI / 2, 0); // Rotate 90° to the left
      light.scale.set(2, 2, 2);
      scene.add(light);
    });

    // Light between last curtain pair
    const light5X = (itemPositions[7].x + itemPositions[8].x) / 2;
    const light5 = lightModel.clone();
    light5.position.set(light5X, 7, wallZ);
    light5.rotation.set(0, -Math.PI / 2, 0); // Rotate 90° to the left
    light5.scale.set(2, 2, 2);
    scene.add(light5);
  }
};
