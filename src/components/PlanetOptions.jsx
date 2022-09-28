import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const PlanetOptions = ({ clickInfo, planetList, planetSpec, setPlanetSpec }) => {

  const planetPick = (e) => {
    var val = e.target.value
    setPlanetSpec(prevState => ({
      ...prevState, planetImg: val
    }))
  }

  const setRing = (e) => {
    var val = e.target.checked
    setPlanetSpec(prevState => ({
      ...prevState, hasRing: val
    }))
  }

  const sizeRing = (e) => {
    var val = e.target.value
    setPlanetSpec(prevState => ({
      ...prevState, ringSize: val
    }))
  }

  const sizePlanet = (e) => {
    var val = e.target.value
    setPlanetSpec(prevState => ({
      ...prevState, planetSize: val
    }))
  }

  const submitPlanet = async (e) => {
    setPlanetSpec(prevState => ({
      ...prevState, name: e.target.name.value, creator: e.target.creator.value, description: e.target.description.value
    }))
    e.preventDefault();
    axios.get(`/findPlanet?name=${e.target.name.value}`).then(res => {
      if (res.data.length > 0) {
        alert('Planet name already exists, please choose a new name.')
      } else {
        axios.post('/addPlanet', planetSpec)
        clickInfo();
      }
    })

  }
  return (
    <div id='planetOptions'>
      <label>Planet terrain: </label>
      <select onChange={planetPick}>
        <option value='earth_daymap'>Earth day</option>
        <option value='earth_nightmap'>Earth night</option>
        <option value='mars'>Mars</option>
        <option value='jupiter'>Jupiter</option>
        <option value='ceres_fictional'>Ceres</option>
        <option value='eris_fictional'>Eris</option>
        <option value='haumea_fictional'>Haumea</option>
        <option value='makemake_fictional'>Makemake</option>
        <option value='mercury'>Mercury</option>
        <option value='moon'>Moon</option>
        <option value='neptune'>Neptune</option>
        <option value='saturn'>Saturn</option>
        <option value='sun'>Sun</option>
        <option value='uranus'>Uranus</option>
        <option value='venus_atmosphere'>Venus</option>
        <option value='venus_surface'>Venus surface</option>
        <option value='earth_clouds'>Dark clouds</option>
      </select>
      <br/>
      <label>Planet size: </label>
      <input type='range' min='0.1' max='4.5' step="any" onChange={sizePlanet} />
      <br/>
      <label>Add ring: </label>
      <input type='checkbox' onChange={setRing} />
      <br/>
      <label>Ring size: </label>
      <input type='range' min='3.1' max='7' step="any" onChange={sizeRing} />
      <form onSubmit={submitPlanet}>
        <label>Planet Name: </label>
        <input type='text' id='name' required/>
        <br/>
        <label>Planet Creator: </label>
        <input type='text' id='creator' required/>
        <br/>
        <label>Planet Description: </label>
        <br/>
        <textarea id='description' required style={{height: '100px', width: '250px'}}/>
        <br/>
        <input type='submit' value='Create planet!'/>
      </form>
    </div>
  )
}

export default PlanetOptions;