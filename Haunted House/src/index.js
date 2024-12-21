import * as THREE from "three";
import doorImage from "../static/img/dorr.jpg";
import doorAlphaImage from "../static/door/alpha.jpg";
import doorOccutionImage from "../static/door/ambientOcclusion.jpg";
import doorMetalnessImage from "../static/door/metalness.jpg";
import doorDsiplacementImage from "../static/door/height.jpg";
import wallImage from "../static/img/wall2640.jpg";
import grassImage from "../static/img/Grow.jpg";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";
import alphaImg from "../static/floor/alpha.jpg";
import floorImg from "../static/texture/coast_sand_rocks_02_diff_1k.jpg";
import floorNormalImg from "../static/texture/coast_sand_rocks_02_nor_gl_1k.jpg";
import floorRoughnessImg from "../static/texture/coast_sand_rocks_02_rough_1k.jpg";
import floorDisplacementImg from "../static/texture/displacement.jpg";
import audio from "../static/audio/ghost-whispers-6030.mp3";
const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 3, 15);
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Shadows
renderer.shadowMap.enabled = true; // Enable shadow map
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const fog = new THREE.Fog("#262837", 2, 15);
scene.fog = fog;

const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 40;

scene.add(directionalLight);

const ambient_light = new THREE.AmbientLight("#86cdff", 0.2);
scene.add(ambient_light);

const house = new THREE.Group();
const miniHouse = new THREE.Group();
scene.add(house, miniHouse);

// door light
const door_light = new THREE.PointLight("#ff7d46", 3, 100);
door_light.position.set(0, 2.7, 2.8);
house.add(door_light);

// mini houe door light
const door_light2 = new THREE.PointLight("#ff7d46", 2, 100);
door_light2.castShadow = true;
door_light2.position.set(-4.1, -0.1, 2.8);
miniHouse.add(door_light2);
// floor textures.
const textureLoader = new THREE.TextureLoader();

const floorTexture = textureLoader.load(floorImg);
const floorNormalTexture = textureLoader.load(floorNormalImg);
const floorRoughnessTexture = textureLoader.load(floorRoughnessImg);
const floorDisplacementMap = textureLoader.load(floorDisplacementImg);
const floorAlphaTexture = textureLoader.load(alphaImg);
floorTexture.colorSpace = THREE.SRGBColorSpace;

// Create a plane geometry
const geometry = new THREE.PlaneGeometry(30, 30);
const floorMaterial = new THREE.MeshStandardMaterial({
  map: floorTexture, // Diffuse texture
  normalMap: floorNormalTexture, // Normal Map
  roughnessMap: floorRoughnessTexture, // Roughness Map
  alphaMap: floorAlphaTexture, // Alpha Map for transparency
  displacementMap : doorDsiplacementTexture,
  displacementScale : 0.5,
  transparent: true, // Enable transparency for alpha map
});

const floor = new THREE.Mesh(geometry, floorMaterial);

floor.rotation.x = -Math.PI / 2; // rotate the floor 90 degrees in radians.
floor.position.y = -1;
floor.receiveShadow = true; // Enable shadow receiving for the floor
house.add(floor);

// ghost.
const ghost1 = new THREE.PointLight("#ff00ff", 2, 10);
scene.add(ghost1);

// roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(5, 1.7, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = 3.7;
roof.rotation.y = 2.4;
roof.castShadow = true;
floor.receiveShadow = true;
house.add(roof);

// mini house roof
const miniRoof = new THREE.Mesh(
  new THREE.ConeGeometry(1, 0.3, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f41" })
);
miniRoof.position.set(-4, 0.1, 2);
miniRoof.rotation.y = 0.7;
miniRoof.castShadow = true;
miniHouse.add(miniRoof);
const bush_geometry = new THREE.SphereGeometry(1, 17, 17);
const bush_material = new THREE.MeshStandardMaterial({
  color: "#89c854",
  roughness: 2,
});

const bush1 = new THREE.Mesh(bush_geometry, bush_material);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, -0.4, 3);
bush1.castShadow = true; // Enable shadow casting for the bush
house.add(bush1);

const bush2 = new THREE.Mesh(bush_geometry, bush_material);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.5, -0.7, 3);
bush2.castShadow = true; // Enable shadow casting for the bush
house.add(bush2);

const bush3 = new THREE.Mesh(bush_geometry, bush_material);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-1, -0.6, 3);
bush3.castShadow = true; // Enable shadow casting for the bush
house.add(bush3);

const bush4 = new THREE.Mesh(bush_geometry, bush_material);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1.5, -0.7, 3);
bush4.castShadow = true; // Enable shadow casting for the bush
house.add(bush4);

bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

// textures
const door_texture = new THREE.TextureLoader().load(doorImage);
const wall_texture = new THREE.TextureLoader().load(wallImage);
const doorAlphaTexture = new THREE.TextureLoader().load(doorAlphaImage);
const doorOccutionTexture = new THREE.TextureLoader().load(doorOccutionImage);
const doorMetalnessTexture = new THREE.TextureLoader().load(doorMetalnessImage);
const doorDsiplacementTexture = new THREE.TextureLoader().load(
  doorDsiplacementImage
);

// door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: door_texture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    metalnessMap: doorMetalnessTexture,
    roughness: 2,
    displacementMap: doorDsiplacementTexture,
    displacementScale: 0.3,
  })
);
door.position.set(0, -0.1, 2.4);
house.add(door);

// mini door
const Minidoor = new THREE.Mesh(
  new THREE.PlaneGeometry(0.6, 0.6),
  new THREE.MeshStandardMaterial({
    map: door_texture,
  })
);
Minidoor.position.set(-4, -0.7, 2.5 + 0.01);
miniHouse.add(Minidoor);

const graves = new THREE.Group();
scene.add(graves);

// graves
const grave_geometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const grave_material = new THREE.MeshStandardMaterial({ color: "#bffff1" });

// stars
function generateStars() {
  const starGeometry = new THREE.SphereGeometry(0.06, 25, 25);
  const starMaterial = new THREE.MeshStandardMaterial({ color: "#ffffff" });
  const stars = new THREE.Group();

  for (let i = 0; i < 1000; i++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);

    const radius = 15;
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * Math.PI;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi) * 2;
    star.position.set(x, y, z);
    stars.add(star);
  }

  return stars;
}
const starGroup = generateStars();
scene.add(starGroup);

for (let i = 0; i < 70; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 6 + Math.random() * 3;
  const xPos = Math.sin(angle) * radius * 1.2;
  const zPos = Math.cos(angle) * radius * 1.2;

  const grave = new THREE.Mesh(grave_geometry, grave_material);
  grave.castShadow = true; // Enable shadow casting for the grave
  grave.position.set(xPos, -0.6, zPos);
  graves.add(grave);
}
graves.children.forEach((grave) => {
  grave.castShadow = true;
});

ghost1.castShadow = true; // Enable shadow casting for ghost1

// house walls
const BoxGeometry = new THREE.BoxGeometry(6, 4, 5);
const miniBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
  map: wall_texture,
  aoMap: wall_texture,
  alphaMap: wall_texture,
  roughnessMap: wall_texture,
  side: THREE.DoubleSide,
});
const walls = new THREE.Mesh(BoxGeometry, boxMaterial);
const miniWalls = new THREE.Mesh(miniBoxGeometry, boxMaterial);
miniWalls.position.set(-4, -0.5, 2);
walls.position.y = 1.001;
walls.receiveShadow = true; // Enable shadow receiving for walls
house.add(walls);
miniHouse.add(miniWalls);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();

// debug panel.
function add_gui() {
  const gui = new dat.GUI();
  gui.add(ambient_light, "intensity", -2, 2).name("Light Intensity");
  gui.add(ghost1, "intensity", -2, 3).name("Ghost Light Intensity");
}
add_gui();

document.addEventListener("keypress", (event) => {
  if (event.key === "f" || (event.key === "F" && !document.fullscreenElement)) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// audio listner
// const audioFile = new Audio(audio);

// document.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => {
//     audioFile.volume = 0.5;
//     audioFile.play();
//   }, 1200);
// });

function tick() {
  requestAnimationFrame(tick);
  const elapsed_time = clock.getElapsedTime() * 1;
  // Update ghost position
  ghost1.position.x = Math.cos(elapsed_time) * 7;
  ghost1.position.z = Math.sin(elapsed_time) * 7;
}

tick();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
