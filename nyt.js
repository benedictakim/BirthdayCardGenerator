var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline.search+fq=pub.date&api-key=l150AJIrBZQqHoU50PKwaI3cMa29A9da";

$(document).ready(function(){
    function headlines() {
        $.ajax({
            method:"GET",  
            url: queryURL,
        }).then(function(response){
            console.log(response)
            var printheadline = response.response.docs[0].headline.print_headline
            console.log(printheadline)  
        })
    }
    headlines();  
})
var nasaQueryURL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-02-18"
