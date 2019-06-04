'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const { CLIENT_ORIGIN, CLIENT_ID, CLIENT_SECRET} = require('./config');
const request = require('request');
const playlistRouter = require('./playlists/playlist-router');


const app = express();
const jsonParser = express.json();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(
  cors()
);
app.use(helmet());
app.use('/api/saved', playlistRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/api/search', handleGetPlaylists); 





function handleGetPlaylists(req, res){
  
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  
  
  
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      let token = body.access_token;
      let moodSearch = req.query.mood;
      let genreSearch = req.query.genre;
      
      let options = {
        url: `https://api.spotify.com/v1/search?q=${moodSearch}+${genreSearch}&type=playlist`,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          let playlistLink = body.playlists.href;
          
          let playlists = body.playlists.items.map(song => {
            
            return {
              id: song.id,
              name: song.name,
              external_urls: song.external_urls.spotify,
              href: song.href,
              tracks: song.tracks,
              uri: song.uri,
              images: song.images
            };
          });
          res.json(playlists).end();
          
        }
      
      });
    
    }
  });
  
}




module.exports = app;