for (var i=0; i<31; i++) {
    var dayOption = $("<option>");
    dayOption.text(i+1);
    $("#days").append(dayOption);
}