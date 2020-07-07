var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=041542fa1899303e8c187b3a599c9d43&query?&language=en-US&include_adult=false&primary_release_year"

$(document).ready(function(){
    function movies() {
        $.ajax({
            method:"GET",  
            url: queryURL,
        }).then(function(response){
            console.log(response) 
            var movierelease = response.release_date
            console.log(movierelease)
            var movieposter = response.poster_path
            console.log(movieposter)
        })
    }
    movies();  
})