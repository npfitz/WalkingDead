/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */

var map;
var heat;
var data = [];
var marquee;

(function (io) {

  // as soon as this file is loaded, connect automatically, 
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    socket.get('/Tweet/subscribe', function gotResponse (message) {
      console.log(message);
    });

    // Listen for Comet messages from Sails
    socket.on('message', function messageReceived(message) {

      if (message.model == "tweet"){
        log("New Tweet: " + message.data.text);

        var marker = {
          location: new google.maps.LatLng(message.data.lat, message.data.lng)
        }
        data.push(marker);
        heat.setData(data);

        $("#ticker_orig").append("<p>" + message.data.text + "</p>");
        $("#ticker_copy1").append("<p>" + message.data.text + "</p>");
      }

      ///////////////////////////////////////////////////////////
      // Replace the following with your own custom logic
      // to run when a new message arrives from the Sails.js
      // server.
      ///////////////////////////////////////////////////////////
      log('New comet message received :: ', message);
      //////////////////////////////////////////////////////

    });

    socket.on('newTweet', function(tweet){
      
    })


    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to 
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' + 
        'e.g. to send a GET request to Sails, try \n' + 
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }
  

})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);


$(document).ready(function(){
  var options = {
    zoom: 4,
    center: new google.maps.LatLng(51.0834651334079, 258.7934140625),
    mapTypeControlOptions: {
         mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'greyscale']
    }
  }

  var style = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        { saturation: -100 }
      ]
    }
];

  map = new google.maps.Map($("#map-canvas")[0], options);

  var mapType = new google.maps.StyledMapType(style, { name:"Grayscale" });    
  map.mapTypes.set('greyscale', mapType);
  map.setMapTypeId('greyscale');

  heat = new google.maps.visualization.HeatmapLayer({
    map: map,
  });

  $.get("/Tweet/getTweets", function(response){

    response.forEach(function(tweet){
      var marker = {
        location: new google.maps.LatLng(tweet.lat, tweet.lng)
      }
      data.push(marker);
    });

    for(var i = response.length - 1; i > response.length - 6; i--){
      $("#ticker").append("<p>" + response[i].text + "</p>");
    }

    marquee = new Marquee({id:"ticker"}).init();

    heat.setData(data);

  })
})



























