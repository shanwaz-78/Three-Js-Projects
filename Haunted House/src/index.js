import * as THREE from "three";
import doorImage from "../static/img/dorr.jpg";
import wallImage from "../static/img/wall2640.jpg";
import grassImage from "../static/img/Grow.jpg";
import grass2Image from "../static/img/grass2.jpg";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 3, 12);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const fog = new THREE.Fog("#262837", 4, 15);
scene.fog = fog;

const ambient_light = new THREE.AmbientLight("#b9d5ff", 0.2);
scene.add(ambient_light);

const house = new THREE.Group();
scene.add(house);

const door_light = new THREE.PointLight("#ff7d46", 2, 100);
door_light.position.set(0, 2.7, 2.8);
house.add(door_light);

// floor textures.
const floor_texture = new THREE.TextureLoader().load(grass2Image);
const ambient_texture = new THREE.TextureLoader().load(grassImage);

// Create a plane geometry
const geometry = new THREE.PlaneGeometry(30, 30);
const material = new THREE.MeshStandardMaterial({
  map: floor_texture,
  alphaMap: floor_texture,
  aoMap: ambient_texture,
});
const floor = new THREE.Mesh(geometry, material);

floor.rotation.x = -Math.PI / 2; // rotate the floor 90 degrees in radians.
floor.position.y = -1;
floor.receiveShadow = true; // Enable shadow receiving for the floor
house.add(floor);

// ghost.
const ghost1 = new THREE.PointLight("#ff00ff", 2, 10);
scene.add(ghost1);

// roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(5, 1.6, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = 3.7;
roof.rotation.y = 2.4;
house.add(roof);

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

// textures
const door_texture = new THREE.TextureLoader().load(doorImage);
const wall_texture = new THREE.TextureLoader().load(wallImage);

// door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.5, 3),
  new THREE.MeshStandardMaterial({
    map: door_texture,
  })
);
door.position.z = 2.5 + 0.01;
house.add(door);

const graves = new THREE.Group();
scene.add(graves);

// graves
const grave_geometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const grave_material = new THREE.MeshStandardMaterial({ color: "#bffff1" });

// stars
function generateStars() {
  const starGeometry = new THREE.SphereGeometry(0.05, 25, 25);
  const starMaterial = new THREE.MeshStandardMaterial({ color: "#ffffff" });
  const stars = new THREE.Group();

  for (const i = 0; i < 1000; i++) {
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

for (const i = 0; i < 70; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 6 + Math.random() * 3;
  const xPos = Math.sin(angle) * radius * 1.2;
  const zPos = Math.cos(angle) * radius * 1.2;

  const grave = new THREE.Mesh(grave_geometry, grave_material);
  grave.castShadow = true; // Enable shadow casting for the grave
  grave.position.set(xPos, -0.6, zPos);
  graves.add(grave);
}

// Shadows
renderer.shadowMap.enabled = true; // Enable shadow map
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Set shadow map type for smoother shadows

ghost1.castShadow = true; // Enable shadow casting for ghost1

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(6, 4, 5),
  new THREE.MeshStandardMaterial({
    map: wall_texture,
    aoMap: wall_texture,
    alphaMap: wall_texture,
    roughnessMap: wall_texture,
  })
);
walls.position.y = 1;
walls.receiveShadow = true; // Enable shadow receiving for walls
house.add(walls);

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
