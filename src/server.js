'use strict';

const express = require('express');
const app = require('./app');
const knex = require('knex');
const { PORT, DB_URL } = require('./config');



const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

// const PORT = process.env.PORT || 8000;

const db = knex ({
  client: 'pg',
  connection: DB_URL
});

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.set('db', db);




app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};