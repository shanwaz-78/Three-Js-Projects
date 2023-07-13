import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
scene.background = new THREE.Color('grey');
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 25);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const texture_loader = new THREE.TextureLoader();
const texture = texture_loader.load('../img/wall2.jpg');
const geometry = new THREE.BoxGeometry(4, 4, 4);
const material = new THREE.MeshPhongMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const ambine_light = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambine_light);

const point_light = new THREE.PointLight(0xffffff, 2, 200);
point_light.position.set(6, 0, 5);
scene.add(point_light);

const grid_helper = new THREE.GridHelper(300, 30, 'red', 'black');
scene.add(grid_helper);

const axes_helper = new THREE.AxesHelper(5);
scene.add(axes_helper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

document.addEventListener('keypress', event => {
  event.preventDefault();
  if (event.key === 'f' || event.key === 'F') {
    if (!document.fullscreenElement) {
      document.body.requestFullscreen();
    } else {
      if (event.key === 'f' || event.key === 'F') {
        document.exitFullscreen();
      }
    }
  }
});

function animate_mesh() {
  requestAnimationFrame(animate_mesh);
  controls.update();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}
requestAnimationFrame(animate_mesh);
