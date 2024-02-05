import React, { useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

var camera, scene, renderer;
var geometry, material, mesh, light;
const loader = new GLTFLoader();

function init() {
  scene = new THREE.Scene();
  loader.load("https://ipfs.io/ipfs/QmYqwNYxqmu4z39emTo7h9D62rbwm1esAmbAf2PctAyUvu?filename=Flamingo.glb", function (gltf) {
    mesh = gltf.scene.children[0];
    mesh.scale.set(6,6,6);
    mesh.position.set(0,0,0);
    light = new THREE.HemisphereLight( 0xbbbbff, 0x444422, 10 );
    light.position.set( 1, 1, 0 );
    scene.add( light );
    scene.add(mesh);
  });


  camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0,0,1000);
  camera.lookAt(0,0,0);

  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
}
init();

function App() {

  const [rot1, setRot1] = useState(0.01);
  const [rot2, setRot2] = useState(0);
  const [rot3, setRot3] = useState(0);

  const [intervalId, setIntervalId] = useState(null);

  animate();

  const getOrientationData = () => {
    fetch("http://192.168.5.156:3001/getData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "" })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.orientationData) {
          setRot1(THREE.MathUtils.degToRad(data.orientationData.alpha));
          setRot2(THREE.MathUtils.degToRad(data.orientationData.beta));
          setRot3(THREE.MathUtils.degToRad(data.orientationData.gamma));
        }
      });
  }

  const startGettingData = () => {
    setIntervalId(setInterval(getOrientationData, 15));
  };

  const stopGettingData = () => {
    clearInterval(intervalId);
  };

  function animate() {
    requestAnimationFrame(animate);

    if (mesh != null) {
      mesh.rotation.x = rot2;
      mesh.rotation.y = rot1;
      mesh.rotation.z = -rot3;
    }

    renderer.render(scene, camera);
  }

  return (
    <div className="App">
      <header className="App-header">
      <button onClick={startGettingData}>START</button>
      <button onClick={stopGettingData}>STOP</button>
      </header>
    </div>
  );
}

export default App;
