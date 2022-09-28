const { Pool, Client } = require('pg')

const client = new Client()

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

const makeTables = async () => {

  await client.query('DROP TABLE IF EXISTS planets;');

  await client.query(`CREATE TABLE planets (
    planetImg text,
    planetSize text,
    hasRing boolean,
    ringSize text,
    name text,
    creator text,
    description text
    );`).then(res => {
      console.log('Planets created!')
    }).catch(err => {
      console.log('Table Creation failed: ', err)
    })

  await client.end();
}

makeTables();