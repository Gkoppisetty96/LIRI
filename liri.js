require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require ("moment");
// setting up keys for spotify api
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


// liri can take in the following commands:
var dothis = process.argv[2];
var lookthis = process.argv.slice(3).join(" ");

switch (dothis) {
    case "concert-this":
        concert(lookthis);
        break;
    case "spotify-this-song":
        spotify_song(lookthis);
        break;
    case "movie-this":
        movie(lookthis);
        break;
    case "do-what-it-says":
        doit();
        break;
};

// concert-this --> searches the bands in town artist events api for an artist and gives back: name of venue, venue location, date of event (MM/DD/YYYY)

function concert(lookthis) {
    if(lookthis) {
        artist = lookthis;
    }
    else {
        console.log ("\nYou didn't search anything?");
    }

    var queryURL= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios(queryURL).then(function(results){
        console.log ("\nName of Venue: " + results.data[0].venue.name);
        console.log("Location: " + results.data[0].venue.city + ", " + results.data[0].venue.country);
        console.log("Date: " + moment(results.data[0].datetime).format("MM/DD/YYYY"));
    }) .catch (function (error) {
        console.log("Oops! Something went wrong \n" + error)
        return;
    })

}

// spotify-this-song --> artist(s), song name, preview link of song, album | if no song, a default song
// uses the node spotify api package (node-spotify-api)

function spotify_song(lookthis) {
    // var spotify = new Spotify(keys.spotify);
    if (!lookthis) {
        lookthis = "The Sign";
    }
    spotify.search({ type: "track", query: lookthis }, function (error, data) {
        if (error) {
            console.log("Oops! Something went wrong \n" + error)
            return;
        }

        var songInfo = data.tracks.items;
        console.log("\nArtist(s): " + songInfo[0].artists[0].name);
        console.log("Song Name: " + songInfo[0].name);
        console.log("Preview Link: " + songInfo[0].preview_url);
        console.log("Album: " + songInfo[0].album.name);
    });
};


// movie-this  --> looks on OMDB title of movie, year of release, imdb rating, rotten tomatoes rating, country of production, language, short plot, actors
// if no movie, then default movie
// uses axios package (api key trilogy)

function movie(lookthis) {
    if (!lookthis) {
        lookthis = "Mr Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + lookthis + "&y=&plot=short&apikey=trilogy";


    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
            console.log("\nTitle: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating + " | Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }).catch(function (error) {
            console.log("Oops! Something went wrong \n" + error);
            return;
        });

}

// do-what-it-says
// using node package fs: takes the text inside of random and calls a command
function doit() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("Oops! Something went wrong \n" + error)
            return;
        }
        // split to make more readable, and remove quotes
        var dataArray = data.split(",");
        var rand = dataArray[1].slice(1, -1);

        if (dataArray[0] === "concert-this") {
            concert(rand);
        } else if (dataArray[0] === "spotify-this-song") {
            spotify_song(rand);
        } else if (dataArray[0] === "movie-this") {
            movie(rand);
        }
    })
}

// bonus: log everything to a text file