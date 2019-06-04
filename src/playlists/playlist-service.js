'use strict';

const config = require('../config');

const PlaylistService = {
  getSavedSearches (db) {
    return db
      .from('saved_searches')
      .first();

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