// // This .on("click") function will trigger the AJAX Call
// //$("#find-movie").on("click", function(event) {
// // event.preventDefault() can be used to prevent an event's default behavior.
// // Here, it prevents the submit button from trying to submit a form when clicked
// event.preventDefault();

// // Here we grab the text from the input box
// var movie = $("#movie-input").val();

// // Here we construct our URL

$(document).ready(function(){

var yeartbd = 1999
//http://www.omdbapi.com/?apikey=[yourkey]&

var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

        // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
        // and display it in the div with an id of movie-view

        // ------YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE.

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          $("#movie-view").text(JSON.stringify(response));
        });

        // ----

var queryURL = "https://www.omdbapi.com/?y=" + yeartbd + "&apikey=e0d3255c";
// // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
// // and display it in the div with an id of movie-view
// // ------YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE.
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
  //$("#movie-view").text(JSON.stringify(response));
    console.log(queryURL)
    console.log(response)
    console.log(data)
});
})