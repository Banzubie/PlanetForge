import React, { useState, useEffect, useRef } from 'react';

const PlanetItem = ({ name, creator, clickPlanet}) => {


  return (
    <div id='PlanetItem' onClick={() => {clickPlanet(name)}}>
      <h3>{name}</h3>
      <p>by: {creator}</p>
    </div>
  )
}

export default PlanetItem;