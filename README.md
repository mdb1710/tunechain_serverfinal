# TuneChain 

Michael Bonner, Primary Developer

[LiveApp](https://tunechain-app.mdb1710.now.sh)

[Client Repo](https://github.com/mdb1710/tunechainclient_final)

## Summary

You have Spotify and you're looking for the music to match your current mood. Now you can chain your music to your mood with Tunechain.  With Tunechain you can search for used curated playlist to match the mood and genre you desire.  You can even save your searches.  This is the back-end api to perform those searches.

## Database

Please refer to the seed tables.  This database will help you with requests for saved searches
1.  Create a database called saved_playlists
2.  Create a role to own the db called tunechainer
3.  Run npm run migrate to create needed tables
4.  Use seed file in seeds folders for starter data

## API

GET /api/search

The Spotify Web API uses the request library for the mood and genre searches.  Because all Spotify request require a web token for authorization, we set up a POST request to receive/refresh that token for each search. Once the token is received a get request with the search query is immediately made the search endpoint to retrieve the data from Spotify.  This data is then sent to the client.

POST /api/saved

This request send the mood and genre you just searched to the database.  

GET /api/saved

This request will send to the client all of the saved searches the used made at that point from the database.


## Technology



For The Back End
- Spotify Web API
- NodeJs
- ExpressJs
- Request
- Mocha/Chai
- PostgreSQL
- Supertest


Deployed via Now



## Setup

To setup the application

1. Fork and clone the project to your machine.
2. `npm install`.


