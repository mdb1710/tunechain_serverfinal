'use strict';

const path = require('path');
const express = require('express');
const PlaylistService = require('./playlist-service');



const playlistRouter = express.Router();
const jsonParser = express.json();
const bodyParser = express.json();

const serializeSavedPlaylists = search => ({
  id: search.id,
  mood: search.user_mood,
  genre: search.user_genre,
  
});

playlistRouter
  .get('/', async (req, res, next) => {
    try {
      const list = await PlaylistService.getSavedSearches(
        req.app.get('db')
      );

      res.json(list)
        .end();

       
    } catch (error){
      next(error);
    }
  })

  .post('/', bodyParser, (req, res, next) => {
    const { mood, genre } = req.body;

    const newSearch = {
      user_mood: mood,
      user_genre: genre
    };

    console.log(newSearch);

    const searchList = PlaylistService.insertSavedSearch(
      req.app.get('db'),
      newSearch
    );

    res.status(201).json(searchList);

  });

module.exports = playlistRouter; 