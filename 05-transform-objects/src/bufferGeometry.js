import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  95,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;
scene.background = new THREE.Color("grey");

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const ambine_light = new THREE.AmbientLight(0xffffff, 0.2);
// scene.add(ambine_light);

const point_light = new THREE.PointLight(0x0343, 1, 100);
point_light.position.set(5, 0, 1);
scene.add(point_light);

const square_light = new THREE.SphereGeometry(1, 20, 20);
const square_material = new THREE.MeshStandardMaterial({ color: "white" });
const square_light_mesh = new THREE.Mesh(square_light, square_material);
square_light_mesh.position.set(5, 0, 1);
scene.add(square_light_mesh);

const buffer_geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, 
   1.0, -1.0, 1.0,
   1.0,  1.0, 1.0,

   1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0
]);

const colors = new Float32Array([
  // rgb
  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 
  0.0, 0.0, 1.0,
  1.0, 1.0, 1.0
]);

const normals = new Float32Array([
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0, 
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0
]);

buffer_geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(vertices, 3)
);
buffer_geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
buffer_geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));

const material = new THREE.MeshBasicMaterial({ vertexColors: true });
const cube = new THREE.Mesh(buffer_geometry, material);
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);

function animate_cube() {
  requestAnimationFrame(animate_cube);
  controls.update();
  renderer.render(scene, camera);
}
animate_cube();


// ambine light available for entire document whereas the pointLight available for specific object.