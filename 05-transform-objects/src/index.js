import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
scene.background = new THREE.Color('grey');

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.ConeGeometry(1, 3, 66);
const material = new THREE.MeshBasicMaterial({ color: 'black' });
const cube = new THREE.Line(geometry, material);
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);

function animate_cube() {
  requestAnimationFrame(animate_cube);
    controls.update();
    cube.rotation.x += 0.04;
    cube.rotation.y += 0.04;
    renderer.render(scene, camera);
  };

requestAnimationFrame(animate_cube);