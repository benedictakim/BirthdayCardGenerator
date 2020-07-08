var inputMonth = $("#input-month").val();
            //user selected day (from dropdown menu)
            var inputDay = $("#input-day").val();
            //user input year (typed)
            var inputYear = $("#input-year").val();

var tmdbqueryURL = "https://api.themoviedb.org/3/search/movie?api_key=041542fa1899303e8c187b3a599c9d43&language=en-US&query=e&include_adult=false&primary_release_year=" + 
inputYear;

$(document).ready(function(){
    function movies() {
        $.ajax({
            method:"GET",  
            url: tmdbqueryURL,
        }).then(function(response){
            console.log(response)
            var movieposter = response.results[0].poster_path
            console.log(movieposter)
            var movieposterfullpath = "https://image.tmdb.org/t/p/original" + movieposter
            console.log(movieposterfullpath)
        })
    }
    movies();  
})
