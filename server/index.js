const express = require('express');
const path = require('path');
const axios = require('axios');
const compression = require('compression')
const { getPlanets, findPlanet, addPlanet } = require('../controller/logic.js')

const app = express();

// middleware
app.use(compression())
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());

app.get('/getPlanets', (req, res) => {
  getPlanets().then(data => {
    console.log(data);
    res.status(200);
    res.send(data)
  }).catch(err => {
    console.log('Error: ', err)
    res.sendStatus(500);
  })
})

app.get('/findPlanet', (req, res) => {
  findPlanet(req.query.name).then(data => {
    console.log(data);
    res.status(200);
    res.send(data)
  }).catch(err => {
    console.log('Error: ', err)
    res.sendStatus(500);
  })
})

app.post('/addPlanet', (req, res) => {
  addPlanet(req.body).then(()=> {res.sendStatus(201)}).catch(err => {
    console.log('Error: ', err)
    res.sendStatus(500);
  })
})

const PORT = 8080;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);