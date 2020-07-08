//wait until the page is ready to load
$( document ).ready(function() {

    for (var i=0; i<31; i++) {
        var dayOption = $("<option>");
        dayOption.text(i+1);
        if (i<10) {
            dayOption.val("0"+(i+1));
        }
        else {
            dayOption.val(i+1);
        }
        
        $("#input-day").append(dayOption);
    }

    //object constructor holding the possible inner text for the card as well as the value of the selection
    function cardText (type, lines, paragraph) {
        this.type = type;
        this.lines = lines;
        this.paragraph = paragraph;
    }
    var cardTextOption = [
        new cardText ("book", ["Hope your birthday is one for the books!"," Here’s to your next chapter!","Have a happily-ever-after birthday!","Hope it’s lit(erary)!"], "This book was published on the day you were born!"),
        new cardText ("space", ["You’re out of this world!", "Houston, we have a birthday!", "You've made another voyage around the sun!", "Have a *stellar* birthday!"], "This image was taken by the hubble telescope on the day you were born!"),
        new cardText ("paper", ["Breaking news, it’s your birthday!", "Experts predict birthday wish comes true!", "I’m very font of you!", "Another birthday? Write on."], "Here is some noteworthy news from the day your were born!"),
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
            console.log(cardTitle.text());
        }

        //get the birthday 
            //user selected month (from dropdown menu)
                //the value of the month is from 0-11 so it can be used in a for-loop to get a specific month if wanted
            var inputMonth = $("#input-month").val();               
            //user selected day (from dropdown menu)
            var inputDay = $("#input-day").val();
            //user input year (typed)
            var inputYear = $("#input-year").val();

                //maybe if the user input year is not four characters less than 2020 return?? + give a warning? 
                    
            console.log(inputMonth + inputDay + inputYear);
            
            var nasaQueryURL = "https://api.nasa.gov/planetary/apod?api_key=PxXYhbxjF4qoZihVRPPnN3C4IpvxKF4N1eWiJVRx&date=" +
                "2019-" +
                inputMonth + "-" +
                inputDay;
            $.ajax({
                method:"GET",  
                url: nasaQueryURL,
            }).then(function(response){
                console.log(response);
                console.log (response.hdurl);
            })
            makeCard();
            

    });

    function makeCard() {
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
});