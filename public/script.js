$(document).ready(function() {
    var movieInput = "";
    var boxFrequency = "";
    var numYearsInput = "";
    var weekRevInput = "";
    var genreInput = "";
    var subGenreInput = "";
    var limitInput = "";
    var genreRevInput = ""; 
    var week = "";
    var dayOfWeek ="";
    function generateData(event) {
        event.preventDefault();

//================== stores input values referencing INDEX.HTML ==================//

        if ($("#movie-input").val() !== null && $("#movie-input").val() !== "") {
            movieInput = $("#movie-input").val().trim();
            $("#movie-input").val("");
        }

        if ($("#daily").checked) {
            boxFrequency = $("#daily").val();
            console.log("hello");
        }

        if ($("#weekend").checked) {
            boxFrequency = $("#weekend").val();
        }

        if ($("#week").checked) {
            boxFrequency= $("#week").val();
        }

        if ($("#total").checked) {
            boxFrequency = $("#total").val();
        }

//================ stores input values referencing WEEKEND.HTML ==================

        if ($("#num-years-input").val() !== null && $("#num-years-input").val() !== "" && isNaN($("#num-years-input").val()) === false) {
            numYearsInput = $("#num-years-input").val().trim();
            $("#num-years-input").val("");
        }

        if ($("#weekend-revenue-input").val() !== null && $("#weekend-revenue-input").val() !== "" && isNaN($("#weekend-revenue-input").val()) === false) {
            weekRevInput = $("#weekend-revenue-input").val().trim();
            $("#weekend-revenue-input").val("");
        }

        if ($())

//@Eddie store on/off toggle button for movies released that weekend


//=================== stores input values referenceing GENRE.HTML ==================     


        if ($("#genre-input").val() !== null && $("#genre-input").val().trim() !== "") {
            genreInput = $("#genre-input").val().trim();
            $("#genre-input").val("");
        }

        if ($("#genre-revenue-input").val() !== null && $("#genre-revenue-input").val() !== "" && isNaN($("#genre-revenue-input").val()) === false) {
            genreRevInput = $("#genre-revenue-input").val().trim();
            $("#genre-revenue-input").val("");
        }

        week = moment(start, "MM-DD-YYYY").week().toString();
        dayOfWeek = moment(start, "MM-DD-YYYY").format("ddd").toString();
        
        $.post("/api", {
            week: week,
            dayOfWeek: dayOfWeek,
            movieInput: movieInput,
            numYearsInput: numYearsInput,
            weekRevInput: weekRevInput,
            genreInput: genreInput,
            subGenreInput: subGenreInput,
            limitInput: limitInput,
            genreRevInput: genreRevInput,
            boxFrequency: boxFrequency,
        }).then(function(response) {
            console.log(response);
        });
    };

    // Opens the date range picker and stores the user-selected date range
        

    var today = moment().format("MM-DD-YYYY");
    
    $(".searchBtn").on("click", generateData);


   var startDate = $('#daterange').data('daterangepicker').getStartDate();
  console.log(startDate);

    // For movie range:
        // User inputs the weekend that they want using the datepicker
        // On our side, we find out which weekend in the year it is, using moment.js
        // Return the last (user-inputted-number) of years of movies that were in theaters on that weekend
        // If the movie's number of days_in_release is less than 5,
            // that movie was released that weekend
            // highlight or bold it
        // otherwise, movie is in chase
    // Ask Omar how to host privately without paying on GitHub
    // Ask Omar how to host in general lol
        // Does the user need to install node? probably not
    // Ask Omar how to grab data from client-side js and put into server-side js
    // Format data in table in browser
    // If time: create Excel export button, format data in Excel
    // Ask Marie to format the card and make it look pretty
    // Ask Marie to change icons

    // If it is opening weekend or not

    // Take the user-inputted-weekend
    // Store the week in a variable, like how December 25th is the 52nd or sometimes 51st week of the year
    // Subtract the year by one (two, 3, ...)
    // Return the day of each year
    var week1 = moment("10-11-2019", "MMDDYYYY").week();
    var day1 = moment("10-11-2019", "MMDDYYYY").format("dddd");
    var blah = moment(week1, "W").subtract(1, "years").format("MMDDYYYY");

    // console.log(week1);
    // console.log(day1);
    // console.log(blah);

});


// name depend weeker. 
