import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PlanetItem from './PlanetItem.jsx'

const PlanetList = ({ clickInfo, planetList, setPlanetList, setPlanetSpec }) => {

    useEffect(() => {
      axios.get('/getPlanets').then(data => {
        setPlanetList(data.data);
      })
    }, [])

    const clickPlanet = (name) => {
      axios.get(`/findPlanet?name=${name}`).then(res => {
        console.log(res.data[0])
        setPlanetSpec(prevState => ({
          ...prevState,
          creator: res.data[0].creator,
          description: res.data[0].description,
          name: res.data[0].name,
          planetImg: res.data[0].planetimg,
          planetSize: res.data[0].planetsize,
          ringSize: res.data[0].ringsize,
          hasRing: res.data[0].hasring
        }))
        clickInfo();
      })
    }

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
            <PlanetItem key={planet.name} name={planet.name} creator={planet.creator} clickPlanet={clickPlanet}/>
          ))}
        </div>
      )
    }
}

export default PlanetList;