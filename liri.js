var key = require('./keys.js');
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

console.log(key);
var action = process.argv[2];

console.log(action);

if(action === 'do-what-it-says')
{
	//console.log("nothing yet");
	fs.readFile("random.txt", "utf8", function(err, data) {
    		if (err) {
      		return console.log(err);
      	}
      	console.log(data);
      	
	action = data;
	console.log(action);
	switchAction(action);

	//var arrData = [];
	var result = [];
	result = data.split(","); 
	console.log(result);
	action = result[0];
	trackName = result[1];
	console.log(action);
	console.log(trackName);
	switchAction();

	});
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
		case "spotify-this-song": var trackName = process.argv.splice(3).join(' ');
		     						myTrack(trackName);
									break;
		case "movie-this": myMovie();
							break;
		default: break;

	} 
}

function myTweets()
{
	var client = new Twitter({
  	consumer_key: key.tkey.consumer_key,
 	consumer_secret: key.tkey.consumer_secret,
  	access_token_key: key.tkey.access_token_key,
  	access_token_secret: key.tkey.access_token_secret
});
	console.log(key.tkey);

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
    var newTrack
	var spotify = new Spotify({
		id: key.spotifyKey.id,
		secret: key.spotifyKey.secret
	});
	if(!trackName)
	{
		newTrack = 'The Sign';
	}
	else
	{
		newTrack = trackName;
	}
	spotify.search({ type: 'track', query: newTrack, limit: 10}, function(err, data) {
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
    //console.log(track.name);
    console.log("Artist: ", track.album.artists[0].name);
    console.log("Track Name: ", track.name);
    console.log("Album Name: ", track.album.name);
  }
 });
  
});
}

function myMovie()
{
	//var movieName;
	if(process.argv[3])
	{
		var movieName = process.argv.splice(3).join(' ');
	}
	else
	{
		var movieName = 'Mr.Nobody';
	}
	console.log(movieName);
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
    console.log("Movie: " + JSON.parse(body).Title);
    console.log("The IMDB rating: " + JSON.parse(body).imdbRating);
  //console.log("The Rotten Tomatoes rating: " + JSON.parse(body).);
    console.log("The production country: " + JSON.parse(body).Country);
    console.log("The movie language: " + JSON.parse(body).Language);
    console.log("The plot: " + JSON.parse(body).Plot);
    console.log("The actors: " + JSON.parse(body).Actors);
  }
});
}

