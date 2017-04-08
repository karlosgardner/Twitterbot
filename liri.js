var app = (function () {

var  song = require("spotify"),
    rp = require("request-promise"),
    fs = require("fs"),
    command = require("inquirer")




  // reading file
var read = fs.readFileSync('./random.txt', 'utf8');


//movie search
	var movie = function (result) {
		var search = result;

		if(!search) search = "mr nobody";
		rp("http://www.omdbapi.com/?t=" + search )
		.then(function (data) {
			var obj = JSON.parse(data);
			console.log("Title: " + obj.Title);
			console.log("Year: " + obj.Year);
			console.log("Rating: " + obj.imdbRating);
			console.log("Country: " + obj.Country);
			console.log("Plot: " + obj.Plot);
			console.log("Actors: " + obj.Actors);
		})
		.catch(function (err) {
			console.log("Result not found");

			console.log(err.Error);

			});
	} // movie


///search for songs
var liriBot = function () {
		var cut = read.split(',');


		var params = {
			type: "track",
			limit:2,
			query: cut[1]

		};

		if(!params.query) {params.query = "The Sign"}
		song.search(params, function (err, data) {

		 data.tracks.items.map(function(el){
		    console.log("Album Name: " + el.album.name);
		    console.log("Href: " + el.preview_url);
		    console.log("Artist: " + el.album.artists[0].name);
		    console.log("Links: " + el.album.external_urls.spotify);

		    console.log("______________________________________________________");
		    console.log("______________________________________________________");
		    console.log("______________________________________________________");



  			});
		});
	} // liribot











	var	spotify = require("spotify");
		//rp = require("request-promise"),
		//fs = require("fs")
		//command = require("inquirer");
 var song = function(result){
   var params = {
  			type: "'artist OR album OR track'",
  			query: "Prince"
  		}
song.search(params,function(error,data){
  console.log(data);

});
 }

 var mainProcess = function () {
        command.prompt([
            {
                type:"list",
                name: "features",
                message: "Use your favorite feature:",
                choices: [ 'spotify-this-song', 'movie-this', 'do-what-it-says']
            },
            {
                type:"confirm",
                name:"verify",
                message: "Are you sure?"
            },

            {
                type:"input",
                name: "msg",
                message: "What do you want to search?"

            }

        ]).then(function (answer) {
            // console.log(answer.features);
            // console.log(answer.verify);
            // console.log(answer.msg);

            /////////////// Conditional Logic ///////////////
            switch(answer.features){

                case "spotify-this-song":
                    spotify(answer.msg);
                    break;

                case "movie-this":
                    movie(answer.msg);
                    break;

                case "post":
                    post(answer.msg);
                    break;

                case "do-what-it-says":
                    console.log(liriBot());
                    break;

            }; // Switch
        })
            .catch(function (err) {
                console.log(err);
            });
    } // main process


	/////////////// Returning values ///////////////
	return{
        spotify:spotify
        movie:movie
	}

})();

app.command();
