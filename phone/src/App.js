import React, { useState } from 'react';

const OrientationComponent = () => {
  const [orientationData, setOrientationData] = useState(null);

  const handleOrientationChange = (event) => {
    setOrientationData({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    })
  }

  const sendOrientationData = () => {
    window.addEventListener('deviceorientation', handleOrientationChange);
    const apiUrl = 'http://192.168.119.125:3001/testAPI';
    if (orientationData !== null) {
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "orientationData": orientationData }),
      })
        .then((res => res.json()))
        .then(data => {
          console.log(data);
        })
      window.removeEventListener('deviceorientation', handleOrientationChange);
    }
  };


  return (
    <div>
      <h1>Device Orientation Component</h1>
      <p>This component sends device orientation data to the backend server when the button is pressed.</p>
      <button onClick={sendOrientationData}>
        SEND
      </button>
    </div>
  );
};

export default OrientationComponent;
