import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.set(0, 0, 25);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambient_light = new THREE.AmbientLight(0xffffff, 1);

const point_light = new THREE.PointLight(0xffffff, 1, 100);
point_light.position.set(0, 0, 25);

const directional_light = new THREE.DirectionalLight(0x2fffff, 1);

const hemisphere_light = new THREE.HemisphereLight(0x3fffff, 0xffffff, 2);
hemisphere_light.position.y += 4; // default position is -1
scene.add(ambient_light, point_light, directional_light, hemisphere_light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const texture_loader = new THREE.TextureLoader().load("./space.jpg", () => {
  animate_mesh();
});
scene.background = texture_loader;

const clock = new THREE.Clock();

const geometry = new THREE.TorusGeometry(10, 3, 12, 100);
const material = new THREE.MeshNormalMaterial();
material.flatShading = true;
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

document.addEventListener("keypress", (event) => {
  event.preventDefault();
  if (event.key === "f" || event.key === "F") {
    if (!document.fullscreenElement) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
});

function add_gui() {
  const gui = new dat.GUI();
  gui.add(mesh.position, "y", -5, 10, 0.05);
  gui.add(mesh.position, "x", -5, 10, 0.05);
  gui.add(mesh.position, "z", -5, 10, 0.05);
  gui.add(mesh, "visible");
  gui.add(material, "wireframe");
}
add_gui();

function animate_mesh() {
  requestAnimationFrame(animate_mesh);
  mesh.rotation.y = 0.5 * clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
}
