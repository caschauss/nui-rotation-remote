import React from "react";

function App() {
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
    // CHANGE URL IF NECESSARY
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
