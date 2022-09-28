import React, { useState, useEffect, useRef } from 'react';

const PlanetItem = ({ name, creator}) => {
  return (
    <div id='PlanetItem'>
      <h3>{name}</h3>
      <p>by: {creator}</p>
    </div>
  )
}

export default PlanetItem;