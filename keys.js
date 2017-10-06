var Twitter = require('twitter');
 
var tkey = new Twitter({
  consumer_key: 'A4dasehCs61FpPZroXSO8kx0F',
  consumer_secret: 'D0EYa3SYTzDNa7mPkN854s4dxvnNvHJJNo7arymO7Cu5ODBWg8',
  access_token_key: '914881094327119872-8hKRiZmtGORgGN67YggxmzsrGJdYvZW',
  access_token_secret: 'ThNt80rmlMiupaNN7uVQGyfIwLEox3sG6dEfhA5sU2rat'
});

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: '4eb3b11c18084196b6a805fb68c4e797',
  secret: '169d993e04ba4f839fab628167b0a996'
});
 
// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

//spotify details.
// Client ID = 4eb3b11c18084196b6a805fb68c4e797
// Client Secret = 169d993e04ba4f839fab628167b0a996


module.exports = tkey;
module.exports = spotify;