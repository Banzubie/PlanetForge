const express = require('express');
const path = require('path');
const axios = require('axios');
const compression = require('compression')

const app = express();

// middleware
app.use(compression())
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());

const PORT = 8080;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);