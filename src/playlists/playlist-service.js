'use strict';

const config = require('../config');

const PlaylistService = {
  getSavedSearches (db) {
    return db 
      .select('*')
      
      .from('saved_searches')
      .then((results) => results);
      
      

  },

  insertSavedSearch(db, savedSearch){
    return(db)
      .insert(savedSearch)
      .into('saved_searches')
      .returning('*')
      .then(([savedSearch]) => savedSearch);
  }



};

module.exports = PlaylistService;