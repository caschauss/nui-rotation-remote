import React, { useState, useEffect } from 'react';

const OrientationComponent = () => {
  var orientationData = null;
  const [intervalId, setIntervalId] = useState(null);

  const handleOrientationChange = (event) => {
    orientationData = {
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    };
  };

  const sendOrientationData = () => {
    const apiUrl = 'http://192.168.43.22:3001/testAPI';
    if (orientationData !== null) {
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orientationData }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const startSendingData = () => {
    setIntervalId(setInterval(sendOrientationData, 15));
  };

  const stopSendingData = () => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    window.addEventListener('deviceorientation', handleOrientationChange);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientationChange);
    };
  }, []);

  return (
    <div>
      <h1>Device Orientation Component</h1>
      <p>This component sends device orientation data to the backend server continuously every 15ms after the button is pressed.</p>
      <button onClick={startSendingData}>START</button>
      <button onClick={stopSendingData}>STOP</button>
    </div>
  );
};

export default OrientationComponent;
