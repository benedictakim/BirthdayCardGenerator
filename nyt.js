var inputMonth = $("#input-month").val();
            //user selected day (from dropdown menu)
            var inputDay = $("#input-day").val();
            //user input year (typed)
            var inputYear = $("#input-year").val();

function getHeadlines() {
            var headlineArea = $("<div>");
            var headlines = $("<h5>");
            var links = $("<a>");

            var headlinequeryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date="
                + inputYear + inputMonth + inputDay + "&end_date="
                + inputYear + inputMonth + inputDay + "&fq=print_page:1&print_section:A&api-key=l150AJIrBZQqHoU50PKwaI3cMa29A9da";
    
            $.ajax({
                method:"GET",  
                url: headlinequeryURL,
            }).then(function(response){
                console.log(response)
                var printheadline = response.response.docs[0].headline.print_headline;
                headlines.text('"' + printheadline + '"');
                headlines.addClass("paper-headlines");

                var articleLink = response.response.docs[0].web_url;
                links.attr('href', articleLink);
                links.text(articleLink);
                links.addClass("paper-links");

                headlineArea.addClass("headline-area");
                headlineArea.append(headlines, links);

                $(".api-image").append(headlineArea);
            });