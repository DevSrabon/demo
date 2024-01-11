import { Button, InputLabel, TextField } from '@mui/material';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { BiDownload, BiUpload } from 'react-icons/bi';
import { Image, Layer, Stage, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/NavigationBar/Navbar';
import tshirt from './assets/tshirt.webp';
import useWidth from './hooks/useWidth';
const App = () => {
  const stageRef = useRef();
  const imageRef = useRef();
  const textRef = useRef();
  const imageTransformerRef = useRef();
  const textTransformerRef = useRef();
  const [shirtColor, setShirtColor] = useState({});
  const [imageURL, setImageURL] = useState(null);
  const [imageLayerUrl, setImageLayerUrl] = useState(null);
  const [textColor, setTextColor] = useState({ r: 144, g: 144, b: 101 });
  const [text, setText] = useState('');
  const [image] = useImage(imageURL);
  const [layerImage] = useImage(imageLayerUrl);
  const [width] = useWidth();
  const layerImageRef = useRef();

  const layerTransformerRef = useRef();
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
  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageLayerUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color, property) => {
    switch (property) {
      case 'shirt':
        setShirtColor(color.rgb);
        if (imageRef.current) {
          // Update image color properties
          imageRef.current.cache();
          imageRef.current.filters([Konva.Filters.RGB]);
          imageRef.current.red(color.rgb.r);
          imageRef.current.green(color.rgb.g);
          imageRef.current.blue(color.rgb.b);
          imageRef.current.draw();
        }
        break;
      case 'text':
        setTextColor(color.rgb);
        break;
      default:
        break;
    }
  };

  const handleDownload = () => {
    const dataURL = stageRef.current.toDataURL();
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'edited_image.png';
    a.click();
  };

  const handleImageClick = () => {
    if (imageTransformerRef.current) {
      imageTransformerRef.current.nodes([imageRef.current]);
      imageTransformerRef.current.show();
      stageRef.current.batchDraw();
    }
  };

  const handleTextClick = () => {
    if (textTransformerRef.current) {
      textTransformerRef.current.nodes([textRef.current]);
      textTransformerRef.current.show();
      stageRef.current.batchDraw();
    }
  };
  const handleLayerImageClick = () => {
    if (layerTransformerRef.current) {
      layerTransformerRef.current.nodes([layerImageRef.current]);
      layerTransformerRef.current.show();
      stageRef.current.batchDraw();
    }
  };
  useEffect(() => {
    setImageURL(tshirt);
  }, []);
  return (
    <div className="App">
      <Navbar />
      <div className="container_main">
        <div id="container">
          {imageURL && (
            <Stage
              container="container"
              width={width > 600 ? 600 : width * 0.9}
              height={500}
              onClick={() => {
                if (imageTransformerRef.current) {
                  imageTransformerRef.current.hide();
                }
                if (textTransformerRef.current) {
                  textTransformerRef.current.hide();
                }
                if (layerTransformerRef.current) {
                  layerTransformerRef.current.hide();
                }
                stageRef.current.batchDraw();
              }}
            >
              <Layer>
                {image && (
                  <>
                    <Image
                      image={image}
                      x={0}
                      y={0}
                      draggable
                      onClick={handleImageClick}
                      ref={imageRef}
                    />
                    <Transformer ref={imageTransformerRef} />
                  </>
                )}
                {text && (
                  <>
                    <Text
                      text={text}
                      x={200}
                      y={200}
                      fontSize={20}
                      fill={`rgb(${textColor.r},${textColor.g},${textColor.b})`}
                      draggable
                      onClick={handleTextClick}
                      ref={textRef}
                    />
                    <Transformer ref={textTransformerRef} />
                  </>
                )}
              </Layer>
              {layerImage && (
                <Layer>
                  <Image
                    image={layerImage}
                    x={0}
                    y={0}
                    draggable
                    width={200}
                    height={200}
                    onClick={handleLayerImageClick}
                    ref={layerImageRef}
                  />
                  <Transformer
                    ref={layerTransformerRef}
                    enabledAnchors={[]}
                    enabled={false}
                  />
                </Layer>
              )}
            </Stage>
          )}
        </div>
        <div id="container2">
          <div id="controls">
            <div>
              <InputLabel htmlFor="imageUpload">Image:</InputLabel>
              <Button
                component="label"
                variant="outlined"
                startIcon={<BiUpload />}
                sx={{ width: '100%' }}
              >
                Upload New Image
                <input
                  type="file"
                  hidden
                  id="imageUpload"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setImageURL)}
                />
              </Button>
            </div>
            {imageURL && (
              <>
                <div>
                  <InputLabel htmlFor="colorPickerShirt">
                    Change Image Color:
                  </InputLabel>
                  <SketchPicker
                    id="colorPickerShirt"
                    color={shirtColor}
                    onChangeComplete={(color) =>
                      handleColorChange(color, 'shirt')
                    }
                  />
                </div>
                <div>
                  <InputLabel htmlFor="outlined-basic">Text:</InputLabel>
                  <TextField
                    variant="outlined"
                    className="inputFile"
                    label="Enter text here"
                    type="text"
                    id="outlined-basic"
                    sx={{ width: '100%' }}
                    multiline
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
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
              </>
            )}
            {imageURL && (
              <div>
                <InputLabel htmlFor="imageUpload2">Add Your Logo:</InputLabel>
                <Button
                  component="label"
                  variant="outlined"
                  sx={{ width: '100%' }}
                  size="small"
                  startIcon={<BiUpload />}
                >
                  Upload Image
                  <input
                    type="file"
                    id="imageUpload2"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImage2Change(e)}
                  />
                </Button>
              </div>
            )}
            {imageURL && (
              <Button
                onClick={handleDownload}
                variant="contained"
                size="large"
                startIcon={<BiDownload />}
              >
                Download
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
