import * as THREE from "three";

// create a function that takes a scene and a textureLoader as arguments that will be passed in from main.js where the createCeiling is called
export const createCeiling = (scene, textureLoader) => {
  // Load the textures
  const colorTexture = textureLoader.load(
    "public/Poliigon_ClayCeramicGlossy_5212/4K/Poliigon_ClayCeramicGlossy_5212_BaseColor.jpg"
  );
  const displacementTexture = textureLoader.load(
    "public/Poliigon_ClayCeramicGlossy_5212/4K/Poliigon_ClayCeramicGlossy_5212_Displacement.tiff"
  );
  const aoTexture = textureLoader.load(
    "public/Poliigon_ClayCeramicGlossy_5212/4K/Poliigon_ClayCeramicGlossy_5212_AmbientOcclusion.jpg"
  );
  const metalnessTexture = textureLoader.load(
    "public/Poliigon_ClayCeramicGlossy_5212/4K/Poliigon_ClayCeramicGlossy_5212_Metallic.jpg"
  );
  const normalGLTexture = textureLoader.load(
    "public/Poliigon_ClayCeramicGlossy_5212/4K/Poliigon_ClayCeramicGlossy_5212_Normal.png"
  );
  const roughnessTexture = textureLoader.load(
    "public/Poliigon_ClayCeramicGlossy_5212/4K/Poliigon_ClayCeramicGlossy_5212_Roughness.jpg"
  );

  // Set texture parameters
  colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
  displacementTexture.wrapS = displacementTexture.wrapT = THREE.RepeatWrapping;
  aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping;
  metalnessTexture.wrapS = metalnessTexture.wrapT = THREE.RepeatWrapping;
  normalGLTexture.wrapS = normalGLTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;

  const ceilingGeometry = new THREE.PlaneGeometry(50, 25);
  const ceilingMaterial = new THREE.MeshStandardMaterial({
    map: colorTexture,
    displacementMap: displacementTexture,
    aoMap: aoTexture,
    metalnessMap: metalnessTexture,
    normalMap: normalGLTexture,
    roughnessMap: roughnessTexture,
    displacementScale: 0.1,
    side: THREE.DoubleSide,
  });
  
  const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

  ceilingPlane.rotation.x = Math.PI / 2;

  ceilingPlane.position.y = 15;

  scene.add(ceilingPlane);
};
