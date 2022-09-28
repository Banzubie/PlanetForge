import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three';

function Ring ({ ringSize }) {
  const texture = new THREE.TextureLoader().load(
    "/assets/2k_saturn_ring_alpha.png"
  );
  const ringGeo = new THREE.RingGeometry(2, Number(ringSize), 64);
  var pos = ringGeo.attributes.position;
  var v3 = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++){
  v3.fromBufferAttribute(pos, i);
  ringGeo.attributes.uv.setXY(i, v3.length() < 3 ? 0 : 1, 1);
  }
  const material = new THREE.MeshLambertMaterial({
    map: texture,
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true
  });
  return (
    <mesh geometry={ringGeo} material={material} rotation-x={Math.PI * -0.48} rotation-y={Math.PI * 0.02} />
  )
}

export default Ring;