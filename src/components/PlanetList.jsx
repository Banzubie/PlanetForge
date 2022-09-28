import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PlanetItem from './PlanetItem.jsx'

const PlanetList = ({ planetList, setPlanetList }) => {

    useEffect(() => {
      axios.get('/getPlanets').then(data => {
        setPlanetList(data.data);
      })
    }, [])

    if (planetList.length === 0) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    } else {
      return (
        <div id='PlanetList'>
          {planetList.map((planet) => (
            <PlanetItem key={planet.name} name={planet.name} creator={planet.creator}/>
          ))}
        </div>
      )
    }
}

export default PlanetList;