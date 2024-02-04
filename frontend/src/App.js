import React, { useState } from "react";
import * as THREE from 'three';

var camera, scene, renderer;
var geometry, material, mesh;

function init() {
  camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 750;

  scene = new THREE.Scene();

  geometry = new THREE.OctahedronGeometry(400, 0);
  material = new THREE.MeshBasicMaterial({
    color: 0x0077ff,
    wireframe: true,
    wireframeLinewidth: 30
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
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
    fetch("http://192.168.119.125:3001/getData", {
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

    mesh.rotation.x = rot1;
    mesh.rotation.y = rot2;
    mesh.rotation.z = rot3;

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
