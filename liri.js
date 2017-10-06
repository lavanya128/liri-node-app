var key = require('./keys.js');
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('node-spotify-api');


console.log(key);
var action = process.argv[2];
var trackName = process.argv.splice(3).join(' ');

console.log(action);

if(action === 'do-what-it-says')
{
	console.log("nothing yet");
}
else
{
	switchAction();
}

function switchAction()
{
	switch(action){
		case "my-tweets": myTweets();
							break;
		case "spotify-this-song": myTrack(trackName);
									break;
		case "movie-this": myMovie();
							break;
		default: break;

	} 
}

function myTweets()
{
	var client = new Twitter({
  this.consumer_key: key.consumer_key,
  this.consumer_secret: key.consumer_secret,
  this.access_token_key: key.access_token_key,
  this.access_token_secret: key.access_token_secret
});
	console.log(this.consumer_key);

	var params = {screen_name: '@lavs_subramany'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
    console.log(tweets);
    tweets.forEach(function (element) {
                fs.appendFile('log.txt', JSON.stringify(element, null, 2) + '\n', function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                console.log('Created at: ' + element.created_at);
                console.log(element.text);
                console.log("\n=============\n");
            });
            }
});
}

function myTrack(trackName)
{

	var spotify = new Spotify({
		id:,
		secret:
	});
	if(!trackName)
	{
		var newTrack = 'The Sign';
	}
	else
	{
		var newTrack = trackName;
	}
	Spotify.search({ type: 'track', query: newTrack}, function(err, data) {
  if (err) {
    console.error('Something went wrong', err.message);
    return;
  }
  console.log(JSON.stringify(data, null, 2));

  // Print some information about the results
  console.log('I got ' + data.tracks.total + ' results!');

  // Go through the first page of results
  var firstPage = data.tracks.items;
  console.log('The tracks details are:');

  /*
   * 0: All of Me (97)
   * 1: My Love (91)
   * 2: I Love This Life (78)
   * ...
   */
  firstPage.forEach(function(track, index) {
     //console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
 if(track.name.toLowerCase() === newTrack.toLowerCase())
   {
    console.log(track.name);
    console.log("Artist: ", track.album.artists[0].name);
    console.log("Track Name: ", track.name);
    console.log("Album Name: ", track.album.name);
  }
 });
  
});
}

function myMovie()
{
	var movieName;
	if(!process.argv[3])
	{
		movieName = 'Mr.Nobody';
	}
	else
	{
		movieName = process.argv.splice(3).join(" ");
	}
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {
    console.log(JSON.stringify(body, null, 2));
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("Your movie: " + JSON.parse(body).Title);
    console.log("The IMDB rating: " + JSON.parse(body).imdbRating);
  //console.log("The Rotten Tomatoes rating: " + JSON.parse(body).);
    console.log("The production country: " + JSON.parse(body).Country);
    console.log("The movie language: " + JSON.parse(body).Language);
    console.log("The plot: " + JSON.parse(body).Plot);
    console.log("The actors: " + JSON.parse(body).Actors);
  }
});
}

