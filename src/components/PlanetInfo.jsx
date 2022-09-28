import React, { useState, useEffect, useRef } from 'react';

const PlanetInfo = ({ planetSpec }) => {
  const { name, creator, description } = planetSpec;

  return (
    <div id='PlanetInfo'>
      <h2>{name}</h2>
      <h4>Made by: {creator}</h4>
      <p>{description}</p>
    </div>
  )
}

export default PlanetInfo;