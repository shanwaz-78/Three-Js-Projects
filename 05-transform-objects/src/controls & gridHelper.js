import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
// import { FlyControls } from "three/examples/jsm/controls/FlyControls";
// import { TransformControls } from "three/examples/jsm/controls/TransformControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10,10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambine_light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambine_light);

const point_light = new THREE.PointLight("blue", 3, 100);
point_light.position.set(5, 0, 1);
scene.add(point_light);

// const axis_helper = new THREE.AxesHelper(5);
// scene.add(axis_helper)

// group is used to move our particular object let's say i have multiple CornGeometry's in document and i want to move particular object then i will insert the all geometry's inside that group.

const group = new THREE.Group();

const geometry = new THREE.BoxGeometry(3,3,3);
const material = new THREE.MeshBasicMaterial({color : 'white'});
const Mesh = new THREE.Mesh(geometry , material);
group.add(Mesh)
scene.add(group)

// const geometry2 = new THREE.ConeGeometry(1, 5, 62);
// const material2 = new THREE.MeshBasicMaterial({color : 'green'});
// const Mesh2 = new THREE.Mesh(geometry2 , material2);
// group.add(Mesh2)
// scene.add(group)

// const geometry = new THREE.BoxGeometry(5,5,5);
// const material = new THREE.MeshStandardMaterial({ color: "white" });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// cube.position.normalize() 
// console.log(cube.position.length())

const grid_helper = new THREE.GridHelper(200, 30);
scene.add(grid_helper);

// const transform_control = new TransformControls(camera, renderer.domElement);
// transform_control.addEventListener("change", animate_cube);
// transform_control.addEventListener("dragging-changed", (event) => [
//   (controls2.enabled = !event.value)
// ]);
const clock = new THREE.Clock();

const controls2 = new OrbitControls(camera, renderer.domElement);
// const controls = new FirstPersonControls(camera, renderer.domElement);
// controls.movementSpeed = 150;
// controls.lookSpeed = 0.1;

// const fly_controls = new FlyControls(camera, renderer.domElement);
// fly_controls.movementSpeed = 1000;
// fly_controls.rollSpeed = 0.1;

function animate_cube() {
  requestAnimationFrame(animate_cube);
  controls2.update(clock.getDelta());
  renderer.render(scene, camera);
}

requestAnimationFrame(animate_cube);
