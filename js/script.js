//wait until the page is ready to load
$( document ).ready(function() {

    //populate the day option drop-down with the days of the month up to 31
    //for each possible day of the month (31)
    for (var i=0; i<31; i++) {
        //make an option variable
        var dayOption = $("<option>");
        //the option variable's text is the current number (starting at 0) + 1 (to have that number start at 1)
        dayOption.text(i+1);
        //if the current number is less than 1
        if (i<9) {
            //the current value is equal to the current number (starting at 0) + 1
            //this way all values will have 2 digits when we use them in our api get
            dayOption.val("0"+(i+1));
        }
        //otherwise there is no 0 in front 
        else {
            dayOption.val(i+1);
        }
        //add each day option to our input day select
        $("#input-day").append(dayOption);
    }

    //get the last year to use as parameters for our API get
    //make a variable for this year using moment.js
    var currentYear = Number(moment().format("YYYY"));
    //subtract 1 from the current year to get last year
    lastYear = (currentYear-1);

    //object constructor holding the possible inner text for the card as well as the value of the selection
    function cardText (type, lines, paragraph) {
        this.type = type;
        this.lines = lines;
        this.paragraph = paragraph;
    }
    var cardTextOption = [
        new cardText ("book", ["Hope your birthday is one for the books!","Here’s to your next chapter!","Have a happily-ever-after birthday!","Hope it’s lit(erary)!"], 
            "This book was one of the top of the best-sellers on your birthday last year!", ),
        new cardText ("movie", ["You're a VIP!", "Enjoy your day in the spotlight!", "Lights, camera, happy birthday!"], 
            "Here is a movie from the year you were born that you may not have seen!", ),
        new cardText ("space", ["You’re out of this world!", "Houston, we have a birthday!", "You've made another voyage around the sun!", "Have a *stellar* birthday!"], 
            "This was nasa's image-of-the-day on your birthday last year!"),
        // new cardText ("paper", ["Breaking news, it’s your birthday!", "Experts predict birthday wish comes true!", "I’m very font of you!", "Another birthday? Write on."], "Here is some noteworthy news from the day your were born!"),
    ];

    //when the user submits their information...
    $("#submitBtn").on("click", function (){
        
        $(".card-title-area").empty();
        //get the users input name
        var inputName = $("#input-name").val();
        //if the user doesn't enter a name, return
        if (inputName === "") {
            return;
        }else {
            //make a new h3
            var cardTitle = $("<h3>");
            //give it the class card-title
            cardTitle.addClass("card-title");
            //make its inner text happy birthday and the input name
            cardTitle.text("Happy Birthday " + inputName + "!");
            //Make the card title display on the birthday card
            $(".card-title-area").append(cardTitle);
        }
        
        //run the make card function to add styling to the card
        makeCard();
        //run the get api image function to add the api image to our card
        getAPIImage();
            

    });

    function makeCard() {
        //clear out current text
        $(".card-text-area").empty();

        //user's selected card style is selected by value of book, space, or paper
        var cardStyle = $("#card-styles").val();
        console.log(cardStyle);

        if (cardStyle === null) {
            return;
        }else {
            //for each card-text option
            for (i=0; i<cardTextOption.length; i++) {
                //if the card style is the same as the card text option
                if (cardStyle === cardTextOption[i].type) {
                    $(".card").attr("id","");
                    //add the card style as a class to the card in the html, linking it to our special styling in our css
                    $(".card").attr("id", cardStyle);
                    
                    //generate a random clever line from our array
                    var randomLine = cardTextOption[i].lines[Math.floor(Math.random()*cardTextOption[i].lines.length)];
                    //make a new h4
                    var cardText = $("<h4>");
                    //give it the classes card-text and "selected card type" - font
                    cardText.addClass("card-text");
                    cardText.addClass(cardTextOption[i].type + "-font")
                    //assign the random line as the text
                    cardText.text(randomLine);
                    
                    //make a new p tag
                    var cardSubtext = $("<p>");
                    //give it the inner text from that card-text option's paragraph 
                    cardSubtext.text(cardTextOption[i].paragraph);

                    //give the card-title the styled font-class
                    $(".card-title").addClass(cardTextOption[i].type + "-font")

                    //append the h4 and p tags we made to the card-text-area
                    $(".card-text-area").append(cardText, cardSubtext);

                }
            }
            //unhide the bday card + send-button
            $(".bday-card").removeClass("hide");
            $(".send-button").removeClass("hide");
            
            $(document).scrollTop($(document).height());
        }
    }

    function getAPIImage() {
        //clear current image on click
        $(".api-image").empty();
        //make a variable getting the style choice
        var cardStyle = $("#card-styles").val();
        //get the birthday 
        //user selected month (from dropdown menu) value from 01 - 12
        var inputMonth = $("#input-month").val();               
        //user selected day (from dropdown menu)
        var inputDay = $("#input-day").val();
        //user input year (typed)
        var inputYear = $("#input-year").val();

        //make a variable to hold our card image or headlines
        var cardImage = $("<img>");
        
        //make api keys and get functions for each api 
        //nasa API Function
        function getNasaImage () {
            //make query url
            var nasaURL = "https://api.nasa.gov/planetary/apod?api_key=PxXYhbxjF4qoZihVRPPnN3C4IpvxKF4N1eWiJVRx&date=" +
                //last year from moment.js
                lastYear + "-" +
                //user selected month and day
                inputMonth + "-" +
                inputDay;
            
            //ajax function using our nasa URL
            $.ajax({
                method:"GET",  
                url: nasaURL,
            }).then(function(response){
                //add an src of the nasa high res imagery of the day
                cardImage.attr("src", response.hdurl);
                //add an alt
                cardImage.attr("alt", "space poster image");
                //apend it to displayed card
                $(".api-image").append(cardImage);
            })
        }
        //NYT Book API Function
        function getBookImage() {
            //make query url
            var bookURL = "https://api.nytimes.com/svc/books/v3/lists/" +
                //last year from moment.js
                lastYear + "-" +
                //user selected month and day
                inputMonth + "-" +
                inputDay +
                "/hardcover-fiction.json?api-key=PRpWMMh6gJsugEdDfDApTNqb7N7LiRkN";
            
            //ajax function using our book URL
            $.ajax({
                method:"GET",  
                url: bookURL,
            }).then(function(response){
                //this variable holds a random number between 0 and 9
                var x = Math.floor((Math.random() * 10));
                //make a variable holding the bool result at the value of x
                var bookCover = response.results.books[x].book_image;
                //add an src of the book cover image 
                cardImage.attr("src", bookCover);
                //add an alt
                cardImage.attr("alt", "book cover image");
                //apend it to displayed card
                $(".api-image").append(cardImage);
            })
        }
        //TMDB API Function
        function getMovieImage() {
            //make query URL
            var movieURL = "https://api.themoviedb.org/3/search/movie?api_key=041542fa1899303e8c187b3a599c9d43&language=en-US&query=e&include_adult=false&primary_release_year=" + 
                //user selected year    
                inputYear;
        
            //ajax function using our movie URL
            $.ajax({
                method:"GET",  
                url: movieURL,
            }).then(function(response){
                //find the movie poster in the API and then use that to make the full image url
                var poster = null;
                //until there is a non-null value for a movie poster, the api will continue to look
                for (i=0; i<response.results.length && !poster; i++) {
                    var current = response.results[i];
                    if (current.poster_path) {
                        poster=current.poster_path;
                        var moviePosterFull = "https://image.tmdb.org/t/p/original" + poster;
                    }
                }
                //add an src of the movie poster
                cardImage.attr("src", moviePosterFull);
                //add an alt
                cardImage.attr("alt", "movie poster image");
                //apend it to displayed card
                $(".api-image").append(cardImage);
            })            
        }
    
        //if the user selects "space", run the getNasaImage function
        if (cardStyle === "space") {
            getNasaImage();
        //if the user selects "book", run the getBookImage function
        } else if (cardStyle === "book") {
            getBookImage();
        // } else if (cardStyle === "paper") {
        //     getHeadlines();
        //if the user selects anything else (movie is all thats left), run the getMovieImage function
        }else {
            getMovieImage();
        }
    }

    //Opens a print dialogue to print the card
    function printCard() {
        var restorepage = document.body.innerHTML;
        var printcontent = document.getElementById("printCard").innerHTML;
        document.body.innerHTML = printcontent;
        window.print();
        document.body.innerHTML = restorepage;

    }

    //runs print function when print button is clicked
    $("#sendBtn").on("click", function() {
        printCard();
    });

});