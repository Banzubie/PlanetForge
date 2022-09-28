import React, { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom";
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three';
import Ring from './components/Ring.jsx';
import Planet from './components/Planet.jsx';
import PlanetOptions from './components/PlanetOptions.jsx';
import axios from 'axios';

function App() {

  const [planetSpec, setPlanetSpec] = useState({
    planetImg: 'earth_daymap',
    planetSize: '2.5',
    hasRing: false,
    ringSize: '3.1',
    name: 'Planet Forge',
    creator: 'Banzubie',
    description: 'Welcome to Planet Forge! Select a planet from the list or create your own for others to see!'
  })

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

  const clickButton = (e) =>{
    console.log('Button clicked!')
  }

  return (
    <div>
      <h1>Planet Forge</h1>
      <p id="description">{planetSpec.description}</p>
      <button onClick={clickButton}>Info</button>
      <button onClick={clickButton}>Planet</button>
      <button onClick={clickButton}>Create</button>
      <PlanetOptions planetSpec={planetSpec} setPlanetSpec={setPlanetSpec}/>
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
