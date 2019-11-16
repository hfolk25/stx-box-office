
const express = require("express");
const _ = require("lodash");
const app = express();
const util = require("util");
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.post("/api", (req, res) => {

    // ================== Create variables ================== //

    var movieURI = req.body.movieURI;
    var whichTab = req.body.whichTab;
    var week = req.body.week;
    var dayOfWeek = req.body.dayOfWeek;
    var weekRevInput = req.body.weekRevInput;
    var numYearsInput = req.body.numYearsInput;
    var genreRevInput = req.body.genreRevInput;
    var movies = [];
    
    const axios = require("axios");
    
    axios.get("https://access.opusdata.com/session/create?email=hfolk25@gmail.com&password=opusdatat43")
    .then(function (response) {

        const options = {
          headers: {"Authorization": "opusdata " + response.data.session_id}
        };

        var dataURL = "http://" + response.data.server + movieURI;

        // =================== FOR THE MOVIE TAB ===================== //
        // @EDDIE add production year

        if (whichTab === "movieBox") {
          
          axios.get(dataURL, options).then(function(data) {
              
              for (var i = 0; i < data.data.length; i++) {

                var responseInfos = [
                  daysInRelease = data.data[i].days_in_release,
                  revenue = "$" + data.data[i].revenue,
                  totalRevenue = "$" + data.data[i].total_revenue,
                  theaterCount = data.data[i].theater_count
                ];

                var movie = {
                  movieTitle: data.data[i].movie_display_name,
                  responseInfos: responseInfos
                }
                movies.push(movie);
              };
              
              res.json({
                movies: movies,
                colTitles: ["Movie Name", "Number of Days in Release", "Daily Revenue", "Total Revenue in Chosen Frequency", "Theater Count"]
              });
          });
        } else if (whichTab === "movieSummary") {
          
          axios.get(dataURL, options).then(function(data) {
            console.log(data.data[0]);
            for (var i = 0; i < data.data.length; i++) {
                var responseInfos = [
                  domesticBoxOffice = "$" + data.data[i].domestic_box_office,
                  internationalBoxOffice = "$" + data.data[i].international_box_office,
                  productionBudget = "$" + data.data[i].production_budget
                ];

                var movie = {
                  movieTitle: data.data[i].movie_display_name,
                  responseInfos: responseInfos
                };
                
                // @Eddie Replace "100000" with user-inputted minimum revenue
                if (data.data[i].domestic_box_office >= 100000) {
                  movies.push(movie);
                };
            };

            // Send the data from server-side to client-side in JSON (because OpusData is dumb)
            res.json({
              movies: movies,
              colTitles: ["Movie Name", "Production Budget", "Domestic Box Office", "International Box Office"]
            });
          });
        }

        // =================== FOR THE WEEKEND TAB ===================== //

        else if (whichTab === "movieRange") {
          axios.get(dataURL, options).then(function(data) {
            
            // console.log(data.data);

            var sorted = _.groupBy(data.data, "movie_display_name");
            var sortedArray = Object.keys(sorted);

            for (var i = 0; i < sortedArray.length; i++) {
              var responseInfos = [];
              var totalWeekendRevenue = 0;

              for (var j = 0; j < sorted[sortedArray[i]].length; j++) {

                var day = "$" + sorted[sortedArray[i]][j].revenue;
                totalWeekendRevenue += parseInt(sorted[sortedArray[i]][j].revenue);

                responseInfos.push(day);

              };

              console.log(sorted[sortedArray[i]].length);
              if (sorted[sortedArray[i]].length === 1 || sorted[sortedArray[i]].length === 2) {
                for (var k = 0; k < 3 - sorted[sortedArray[i]].length; k++) {
                  responseInfos.push("$ ---------");
                };
              };

              responseInfos.push("$" + totalWeekendRevenue);
              responseInfos.push("$" + sorted[sortedArray[i]][sorted[sortedArray[i]].length - 1].total_revenue);
              responseInfos.push(sorted[sortedArray[i]][0].movie_genre_display_name);
              
              var movie = {
                movieTitle: sorted[sortedArray[i]][0].movie_display_name,
                responseInfos: responseInfos
              };

              movies.push(movie);
            }

            var colTitles = ["Movie Name", //"Release Year", 
            "Friday Revenue", "Saturday Revenue", "Sunday Revenue", "Total Weekend Revenue", "Total Revenue", "Genre"];

            res.json({
              movies: movies,
              colTitles: colTitles
            });
            
            // res.json(util.inspect(data.data));

          });
        }

        // =================== FOR THE GENRE TAB ===================== //
        else if (whichTab === "movieGenre") {
          axios.get(dataURL, options).then(function(data) {

            for (var i = 0; i < data.data.length; i++) {
                var responseInfos = [
                  openingWeekendRevenue = "$" + data.data[i].opening_weekend_revenue,
                  openingWeekendTheaters = data.data[i].opening_weekend_theaters,
                  releaseDate = data.data[i].release_date,
                  productionYear = data.data[i].production_year,
                  productionStudio = data.data[i]
                  .movie_theatrical_distributor_display_name
                ];

                var movie = {
                  movieTitle: data.data[i].movie_display_name,
                  responseInfos: responseInfos
                };

                if (data.data[i].opening_weekend_revenue >= genreRevInput && data.data[i].opening_weekend_revenue > 100000) {
                  movies.push(movie);
                };
            };

            // Send the data from server-side to client-side in JSON (because OpusData is dumb)
            res.json({
              movies: movies,
              colTitles: ["Movie Name", "Opening Weekend Revenue", "Opening Weekend Theaters", "Release Date", "Production Year", "Production Studio"]
            });
          });
        };
    });
});

app.listen(PORT, () => {
  console.log("App listening on port 3000!");
});