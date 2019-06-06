'use strict';

const path = require('path');
const express = require('express');
const PlaylistService = require('./playlist-service');



const playlistRouter = express.Router();
const jsonBodyParser = express.json()
const bodyParser = require('body-parser')

const serializeSavedPlaylists = search => ({
  id: search.id,
  mood: search.user_mood,
  genre: search.user_genre,
  
});

playlistRouter
  .route('/')
  .get(async (req, res, next) => {
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

  .post(jsonBodyParser, async (req, res, next) => {
    const { mood, genre } = req.body;
    console.log(req.headers, req.body);


    const newSearch = {
      user_mood: mood,
      user_genre: genre
    };

    console.log(newSearch);
    console.log(req.body.mood, req.body.genre);
    try {
      const searchList = await PlaylistService.insertSavedSearch(
        req.app.get('db'),
        newSearch
      );

      res.status(201).json(serializeSavedPlaylists(searchList));
    } catch (error) {
      next(error);
    }
    

    

  });

module.exports = playlistRouter;