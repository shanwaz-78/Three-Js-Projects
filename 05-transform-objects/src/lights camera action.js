// import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0.5,0.5,0.5)
const camera = new THREE.PerspectiveCamera(65,window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const coneGeometry = new THREE.ConeGeometry(1,2,62);
const material = new THREE.MeshBasicMaterial({color : 'black'});
const cone = new THREE.Line(coneGeometry, material);
scene.add(cone);

let flag = true;
function animate_cone() {
  requestAnimationFrame(animate_cone);
  if(cone.position.x > 5){
    material.color.setColorName('green');
    flag = false;
  }else if(cone.position.x < -5){
    material.color.setColorName('purple');
    flag = true;
  }

  if(flag){
    cone.position.x += 0.1;
  }else{
    cone.position.x -= 0.1;
  }

  cone.rotation.x += 0.06;
  cone.rotation.y += 0.6;

  renderer.render(scene, camera);
}
requestAnimationFrame(animate_cone);
