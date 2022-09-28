const { Pool, Client } = require('pg')
const pool = new Pool()

pool.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('Pool open')
    poolOpen = true;
  }
})

const getPlanets = async () => {
  return await pool.query(`SELECT name, creator FROM planets;`)
}

const findPlanet = async (name, creator) => {
 return await pool.query(`SELECT * FROM planets WHERE name = $1 LIMIT 1;`, [name, creator])
}

const addPlanet = async ({ planetImg, planetSize, hasRing, ringSize, name, creator, description}) => {
  return await pool.query(`INSERT INTO planets (planetImg, planetSize, hasRing, ringSize, name, creator, description) VALUES ($1, $2, $3, $4, $5, $6, $7);`, [planetImg, planetSize, hasRing, ringSize, name, creator, description])
}

module.exports = {getPlanets, findPlanet, addPlanet}