import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import useImage from 'use-image';
import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/NavigationBar/Navbar';

const App = () => {
  const imageRef = useRef();
  const imageRef2 = useRef();
  const stageRef = useRef();
  const transformerRef = useRef();
  const [shirtColor, setShirtColor] = useState({ r: 208, g: 2, b: 27 });
  const [imageURL, setImageURL] = useState(null);
  const [imageLayerUrl, setImageLayerUrl] = useState(null);

  const [textColor, setTextColor] = useState({ r: 144, g: 144, b: 144 });

  const [text, setText] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageURL(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageLayerUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [image] = useImage(imageURL);
  const [imageLayer] = useImage(imageLayerUrl);

  useEffect(() => {
    if (image) {
      const uploadedImage = new Konva.Image({
        image: image,
        x: 0,
        y: 0,
        draggable: true,
      });
      const stage = new Konva.Stage({
        container: 'container',
        width: 500,
        height: window.innerHeight,
      });

      const layer = new Konva.Layer();

      uploadedImage.cache();
      uploadedImage.filters([Konva.Filters.RGB]);
      layer.add(uploadedImage);

      // Add text box
      const textNode = new Konva.Text({
        text,
        x: 200,
        y: 200,
        fontSize: 20,
        fill: `rgb(${textColor.r},${textColor.g},${textColor.b})`,
        draggable: true,
      });

      layer.add(textNode);

      stage.add(layer);

      stageRef.current = stage;
      imageRef.current = uploadedImage;
    }
    if (imageLayerUrl) {
      const uploadedImageLayer = new Konva.Image({
        image: imageLayer,
        x: 0,
        y: 0,
        draggable: true,
      });
      const layer2 = new Konva.Layer();
      uploadedImageLayer.width(100);
      uploadedImageLayer.height(100);
      uploadedImageLayer.cache();

      layer2.add(uploadedImageLayer);

      stageRef.current.add(layer2);

      imageRef2.current = uploadedImageLayer;

      const transformer2 = new Konva.Transformer();
      const handleDoubleClick = () => {
        layer2.add(transformer2);
        transformerRef.current = transformer2;
        transformer2.attachTo(uploadedImageLayer);
      };
      const handleOutsideClick = (e) => {
        const container = document.getElementById('container');
        if (!container.contains(e.target)) {
          // Clicked outside the container
          if (transformerRef.current) {
            transformerRef.current.detach();
            transformerRef.current.destroy();
            transformerRef.current = null;
          }
        }
      };

      window.addEventListener('click', handleOutsideClick);
      window.addEventListener('dblclick', handleDoubleClick);
      return () => {
        window.removeEventListener('click', handleOutsideClick);
        window.removeEventListener('dblclick', handleDoubleClick);
      };
    }
  }, [imageURL, image, text, textColor, imageLayer, imageLayerUrl]);

  const handleColorChange = (color, property) => {
    switch (property) {
      case 'shirt':
        setShirtColor(color.rgb);
        imageRef.current.red(color.rgb.r);
        imageRef.current.green(color.rgb.g);
        imageRef.current.blue(color.rgb.b);
        break;
      case 'text':
        setTextColor(color.rgb);
        break;
      default:
        break;
    }

    stageRef.current.batchDraw();
  };

  const handleDownload = () => {
    const dataURL = stageRef.current.toDataURL();
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'edited_image.png';
    a.click();
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container_main">
        <div style={{ height: '500px', width: '500px' }} id="container"></div>
        <div id="controls">
          <div>
            <label htmlFor="imageUpload">Upload Image:</label>
            <input
              className="inputFile"
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {imageURL && (
            <>
              <div>
                <label htmlFor="colorPickerShirt">Shirt Color:</label>
                <SketchPicker
                  id="colorPickerShirt"
                  color={shirtColor}
                  onChangeComplete={(color) =>
                    handleColorChange(color, 'shirt')
                  }
                />
              </div>
              {text && (
                <div>
                  <label htmlFor="colorPickerText">Text Color:</label>
                  <SketchPicker
                    id="colorPickerText"
                    color={textColor}
                    onChangeComplete={(color) =>
                      handleColorChange(color, 'text')
                    }
                  />
                </div>
              )}

              <div>
                <label htmlFor="textBox">Text:</label>
                <input
                  className="inputFile"
                  type="text"
                  id="textBox"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </>
          )}
          {imageURL && (
            <div>
              <label htmlFor="imageUpload2">Edited Image:</label>
              <input
                className="inputFile"
                type="file"
                id="imageUpload2"
                accept="image/*"
                onChange={handleImageChange2}
              />
            </div>
          )}
          {imageURL && <button onClick={handleDownload}>Download</button>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
