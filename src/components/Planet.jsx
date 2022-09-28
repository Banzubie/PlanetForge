import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function Planet ({ planetImg, planetSize }) {
  const myMesh = React.useRef();

  const planetMap = useLoader(TextureLoader, `/assets/2k_${planetImg}.jpeg`)
  https://www.solarsystemscope.com/textures/download/2k_mercury.jpg
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime() / 20;
    myMesh.current.rotation.y = a;
  });

  return (
    <mesh ref={myMesh} castShadow={true}>
      <sphereGeometry args={[Number(planetSize), 64, 64]} />
      <meshStandardMaterial map={planetMap} />
    </mesh>
  );
}

export default Planet;