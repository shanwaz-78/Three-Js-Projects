import * as THREE from 'three';
import { OrbitControls } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x6345 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);

function animate_cube() {
  requestAnimationFrame(animate_cube);
  controls.update();
  cube.rotation.x += 0.04;
  cube.rotation.y += 0.04;
  renderer.render(scene, camera);
}
animate_cube()
