require("dotenv").config();
// setting up keys for spotify api
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

// liri can take in the following commands:
var input = process.argv;
var dothis = input[2];
var lookthis = input[3];

switch (dothis) {
    case "concert-this":
        bands(lookthis);
        break;
    case "spotify-this-song":
        spotify(lookthis);
        break;
    case "movie-this":
        movie(lookthis);
        break;
    case "do-what-it-says":
        doit();
        break;
};

// concert-this --> searches the bands in town artist events api for an artist and gives back: name of venue, venue location, date of event (MM/DD/YYYY)
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

function concert(lookthis) {

}

// spotify-this-song --> artist(s), song name, preview link of song, album | if no song, a default song
// uses the node spotify api package (node-spotify-api)

function spotify(lookthis) {
    var spotify = new Spotify(keys.spotify);
    if (!lookthis) {
        lookthis = "The Sign";
    }
    spotify.search({ type: "track", query: lookthis }, function (err, data) {
        if (err) {
            console.log("Oops! Something went wrong \n" + err)
            return;
        }

        var songInfo = data.tracks.items;
        console.log("Artist(s): " + songInfo[0].artists[0].name);
        console.log("Song Name: " + songInfo[0].name);
        console.log("Preview Link: " + songInfo[0].preview_url);
        console.log("Album: " + songInfo[0].album.name);
    });
};


// movie-this  --> looks on OMDB title of movie, year of release, imdb rating, rotten tomatoes rating, country of production, language, short plot, actors
// if no movie, then default movie
// uses axios package (api key trilogy)

function movie(lookthis) {
    var queryUrl = "http://www.omdbapi.com/?t=" + lookthis + "&y=&plot=short&apikey=trilogy";

    request(queryURL, function (error, response, body) {
        if (!lookthis) {
            lookthis = "Mr Nobody";
        }
        if (error) {
            console.log("Oops! Something went wrong \n" + err)
            return;
        }
        if (response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating + " | Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
};


// do-what-it-says
// using node package fs: takes the text inside of random and calls a command
function doit() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("Oops! Something went wrong \n" + err)
            return;
        }
        // split to make more readable, and remove quotes
        var dataArray = data.split(",");
        var rand = dataArray[1].slice(1, -1);

        if (dataArray[0] === "concert-this") {
            concert(rand);
        } else if (dataArray[0] === "spotiify-this-song") {
            spotify(rand);
        } else if (dataArray[0] === "movie-this") {
            movie(rand);
        }
    })
}


// bonus: log to a text file called log.txt

