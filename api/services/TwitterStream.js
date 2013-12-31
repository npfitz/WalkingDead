var twitter = require("ntwitter");
var twit = new twitter({
	consumer_key: '4jiZ5GX2miAAh4HFqoJeJw',
  consumer_secret: 'zrTzxJqrjKLz27TnSvOC6hXaP8TdzdfhfMrZaxEmA',
  access_token_key: '507581436-n39DyWmkSglqrBFhxgiAdNhEpQsrbNeBYftKnrIM',
  access_token_secret: 'iewtyGsAB1UHZkubGWLX6YvJMaBnikUqI1jm3INATUk3a'
})

exports.start = function(){


	var options = {
		'track':'walking dead,talking dead,zombies'
	}


	twit.stream("statuses/filter", options, function(stream){
		stream.on("data", function(data){
			
			if(data.geo != null){
				

				var params = {
					text: data.text,
					lat: data.geo.coordinates[0],
					lng: data.geo.coordinates[1],
					twitter_id: data.id,
					twitter_createdAt: data.created_at,
					
				}

				Tweet.create(params, function(tweet){

				});

				params.id = params.twitter_id;

				Tweet.publishCreate(params, function(tweet){
				});
			}
		})
	})
}