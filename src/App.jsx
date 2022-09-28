import React, { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom";
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three';
import axios from 'axios';
import Ring from './components/Ring.jsx';
import Planet from './components/Planet.jsx';
import PlanetOptions from './components/PlanetOptions.jsx';
import PlanetList from './components/PlanetList.jsx';
import PlanetInfo from './components/PlanetInfo.jsx';

function App() {
  const [planetList, setPlanetList] = useState([]);
  const [planetSpec, setPlanetSpec] = useState({
    planetImg: 'earth_daymap',
    planetSize: '2.5',
    hasRing: false,
    ringSize: '3.1',
    name: 'Earth',
    creator: 'Nature',
    description: 'You probably live here.'
  })
  const [showInfo, setShowInfo] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);

        controls.minDistance = 3;
        controls.maxDistance = 20;
        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };

  const clickInfo = () => {
    setShowInfo(true)
    setShowList(false)
    setShowOptions(false)
  }
  const clickList = () => {
    setShowInfo(false)
    setShowList(true)
    setShowOptions(false)
  }
  const clickOptions = () => {
    setShowInfo(false)
    setShowList(false)
    setShowOptions(true)
  }

  return (
    <div>
      <h1>Planet Forge</h1>
      <p id="description">Welcome to Planet Forge! Select a planet from the list or create your own for others to see!</p>
      <button onClick={clickOptions}>Create</button>
      <button onClick={clickList}>List</button>
      <button onClick={clickInfo}>Info</button>
      {showInfo ? <PlanetInfo planetSpec={planetSpec}/> : null}
      {showList ? <PlanetList planetList={planetList} setPlanetList={setPlanetList}/> : null}
      {showOptions ? <PlanetOptions clickInfo={clickInfo} planetList={planetList} planetSpec={planetSpec} setPlanetSpec={setPlanetSpec}/> : null}
      <div id="canvas-container" >
        <Canvas>
          <CameraController />
          <Planet planetImg={planetSpec.planetImg} planetSize={planetSpec.planetSize}/>
          {planetSpec.hasRing ? <Ring ringSize={planetSpec.ringSize} /> : null}
          <directionalLight intensity={0.1} castShadow={true}/>
          <directionalLight position={[2.5, 7.5, 5]} />
        </Canvas>
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
