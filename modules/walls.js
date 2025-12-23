import * as THREE from "three";

export function createWalls(scene, textureLoader) {
  let wallGroup = new THREE.Group();
  scene.add(wallGroup);

  const normalTexture = textureLoader.load(
    "public/img/69_clean fine plaster PBR texture-seamless.jpg"
  );
  const roughnessTexture = textureLoader.load(
    "public/img/69_clean fine plaster PBR texture-seamless.jpg"
  );

  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xadadae,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    side: THREE.DoubleSide,
  });
  // Front Wall (width direction)
  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 30, 0.001),
    wallMaterial
  );

  frontWall.position.z = -12.5;

  // Left Wall (length direction)
  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(30, 30, 0.001),
    wallMaterial
  );

  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.x = -25;

  // Right Wall (length direction)
  const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(30, 30, 0.001),
    wallMaterial
  );

  rightWall.position.x = 25;
  rightWall.rotation.y = Math.PI / 2;

  // Back Wall (width direction)
  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 30, 0.001),
    wallMaterial
  );
  backWall.position.z = 12.5;

  wallGroup.add(frontWall, backWall, leftWall, rightWall);

  return wallGroup;
}
