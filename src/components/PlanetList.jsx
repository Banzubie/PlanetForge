import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PlanetItem from './PlanetItem.jsx'

const PlanetList = () => {
  const [planetList, setPlanetList] = useState([]);

    useEffect(() => {
      axios.get('/getPlanets').then(data => {
        setPlanetList(data);
      })
    }, [])
    return (
      <div id='PlanetList'>
        {planetList.map(planet => {
          return (<PlanetItem name={planet.name} creator={planet.creator}/>)
        })}
      </div>
    )
}

export default PlanetList;