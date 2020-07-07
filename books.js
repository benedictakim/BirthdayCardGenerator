var inputMonth = $("#input-month").val();
            //user selected day (from dropdown menu)
            var inputDay = $("#input-day").val();
            //user input year (typed)
            var inputYear = $("#input-year").val();

var queryURL = "https://api.nytimes.com/svc/books/v3/lists/" +
    inputYear + "-" +
    inputMonth + "-" +
    inputDay +
    "/hardcover-fiction.json?api-key=PRpWMMh6gJsugEdDfDApTNqb7N7LiRkN"

$(document).ready(function(){
    function books() {
        $.ajax({
            method:"GET",  
            url: queryURL,
        }).then(function(response){
            console.log(response)
            var bookcover = response.results.books[0].book_image
            console.log(bookcover)
        })
    }
    books();  
})