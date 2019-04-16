# LIRI

LIRI is kinda like SIRI, but it's a Language Interprettaion and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

LIRI can search the Bands in Town API for concerts:
![concert-this](/assets/concert.PNG)

the Spotify API for songs:
![spotify-this-song](/assets/spotify.PNG)

the OMDB API for movies:
![movie-this](/assets/movie.PNG)

as well as read commands from a text file:
![read concert-this](/assets/doit_1.PNG)
![read spotify-this-song](/assets/doit_2.PNG)
![read movie-this](/assets/doit_3.PNG)


## Running this Application
To run this application successfully, you will need to run npm install (which will install axios, dotenv, moment, and the node-spotify-api).
Additionally, you will need to request credentials to use the Spotify API (https://developer.spotify.com/my-applications/#!/), and save them in a file named key.js using the following notation:

```js
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```

In another file named `.env`, add the following, replacing the values with API keys

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```