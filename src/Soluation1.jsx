import React, { useState } from 'react';
import './App.css'; // Make sure to create your CSS file with the required styles
import shirt1 from './assets/shirt.png';
import shirt2 from './assets/shirt2.png';
const App = () => {
  const [shirtColor, setShirtColor] = useState('#ff0000');

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setShirtColor(newColor);
  };

  return (
    <div className="app">
      <div className="product">
        <img src={shirt1} alt="Shirt 1" className="img-1" />
        <img src={shirt2} alt="Shirt 2" className="img-2" />

        <div className="color" style={{ backgroundColor: shirtColor }}></div>
      </div>

      <div>
        <h1>Jack & Jones T-Shirt</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
          reprehenderit quas ea quo sed odit, quis iure consequuntur a ratione
          eligendi eum. Facere, quis.
        </p>
        <b>Customize shirt color: </b>
        <input
          type="color"
          className="color-input"
          value={shirtColor}
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
};

export default App;
