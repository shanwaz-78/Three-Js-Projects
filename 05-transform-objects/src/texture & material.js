import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
scene.background = new THREE.Color('grey');

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(2,2,2);
const texture = new THREE.TextureLoader().load('./wall2.jpeg');
const material = new THREE.PointsMaterial({color : 'red', size : 0.2});
const cube = new THREE.Points(geometry, material);
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);

function animate_cube() {
  requestAnimationFrame(animate_cube);
  controls.update();
  renderer.render(scene, camera);
}
requestAnimationFrame(animate_cube);