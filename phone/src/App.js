import React from "react";

var orientationData;

const handleOrientation = (event) => {
  orientationData = {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  };
};

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", handleOrientation);
} else {
  console.log("Device orientation not supported.");
}

const startService = () => {
  fetch("http://192.168.119.125:3001/testAPI", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orientationData })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

function App() {
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
