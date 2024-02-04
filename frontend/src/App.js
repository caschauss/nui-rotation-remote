import React, { useState } from "react";
import * as THREE from 'three';

var camera, scene, renderer;
var geometry, material, mesh;
var orientationdata;
var ori = false;

//init();
//animate();


function App() {

  const [rot1, setRot1] = useState(0.01);
  const [rot2, setRot2] = useState(0);
  const [rot3, setRot3] = useState(0);

  init();
  //if (ori){
  animate();//}

  const startService = () => {
    // adding DevOrEvent to doc
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    } else {
      console.log("Device orientation not supported.");
    }
  };

  // defining JSON object
  const handleOrientation = (event) => {
    const orientationData = {
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma
    };// die daten zur rotation des globus nutzen
    ori = true;
    // CHANGE URL IF NECESSARY
    fetch("http://192.168.119.125:3001/testAPI", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orientationData })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.orientationData);
      });
  };

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

  function animate() {
    requestAnimationFrame(animate);

    fetch("http://192.168.119.125:3001/getData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "" })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.orientationData) {
          setRot1(data.orientationData.alpha);
          setRot2(data.orientationData.beta);
          setRot3(data.orientationData.gamma);
        }
        
      });

    mesh.rotation.x = rot1;
    mesh.rotation.y = rot2;
    mesh.rotation.z = rot3;//hier orientatio data reinhauen

    renderer.render(scene, camera);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button style={{ width: "100%", height: "10vh" }} onClick={startService}>
          Start Service
        </button>
      </header>
    </div>
  );
}

export default App;
