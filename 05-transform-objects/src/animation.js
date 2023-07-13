// import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth , window.innerHeight);
document.body.appendChild(renderer.domElement)

const geometry = new THREE.ConeGeometry(2,2,32)
const material = new THREE.MeshBasicMaterial({color : 0x4323});
const cube = new THREE.Line(geometry,material);
scene.add(cube);

let flag = true;
function animate_cube() {
  if(cube.position.x > 5){
    material.color.setColorName('red')
    flag = false
  }else if(cube.position.x < -5){
    material.color.setColorName('grey')
    flag = true
  }

  if(flag){
    cube.position.x += 0.1;
  }else{
    cube.position.x -= 0.1;
  }
  requestAnimationFrame(animate_cube)
  cube.rotation.x += 0.05;
  cube.rotation.y += 0.05
  renderer.render(scene,camera)
}
animate_cube()

// There are more several properties instead of BoxGeometry like => CapsuleGeometry, CircleGeometry,BoxGeometry,ConeGeometry