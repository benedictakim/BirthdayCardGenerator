var inputMonth = $("#input-month").val();
            //user selected day (from dropdown menu)
            var inputDay = $("#input-day").val();
            //user input year (typed)
            var inputYear = $("#input-year").val();

// var pubdate = 19991231 YYYYMMDD
var headlinequeryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date="
+ inputYear + inputMonth + inputDay + "&end_date="
+ inputYear + inputMonth + inputDay + "&fq=print_page:1&print_section:A&api-key=l150AJIrBZQqHoU50PKwaI3cMa29A9da";

$(document).ready(function(){
    function headlines() {
        $.ajax({
            method:"GET",  
            url: headlinequeryURL,
        }).then(function(response){
            console.log(response)
            for (var i=0; i<10; i++) {
                var asection = response.response.docs[i].print_section
                //10 headlines on page 1 of sections A thru E etc
                var printheadline = response.response.docs[i].headline.print_headline
                console.log(printheadline)  
            }
        });
    }

    headlines();  
})
