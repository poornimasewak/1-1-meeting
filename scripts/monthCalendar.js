function monthCalendar(){
    calendarFormat="monthly";
    console.log("Turning on");
  //  $('#mode-toggle').bootstrapToggle('on');
    buildMonthCalendar();
    $(".calendarDay").on("click",function(){
        
        $("#mode-toggle").bootstrapToggle('off');
        // Each .calendarDay has its date in a data-date attribute, in unix format
        // So we can just package it up as a moment and send it off to dayCalendar
        dayCalendar(moment($(this).attr("data-date"),"x"));
    });
}

function buildMonthCalendar(){
    $("#cardWrapper").empty();
    // The heading should show the earliest and the last month in our array    
    let firstDate=studentArray[0].date;
    let lastDate=studentArray[studentArray.length-1].date;
    let dateHeading=firstDate.format("MMMM, YYYY")+" - "+lastDate.format("MMMM, YYYY");
    let newRow=$("<div>").addClass("row");
    let constructionDate=moment(firstDate);
    let newDay;
    // Keep increasing the constructionDate until the day before the last date in our array
    // Unfortunately, the coide is almost identical for every day, but there are minor differences on the weekends
    while(constructionDate.isBefore(lastDate)){
        // Saturday and Sunday get the "weekend" tag, and are also only a one-column
        if(constructionDate.format("dddd")==="Saturday" || constructionDate.format("dddd")==="Sunday"){
            newDay=$("<div>").addClass("col-1 calendarDay weekend").attr("data-date",constructionDate.format("x"));
            newDay.append($("<div>").addClass("dayHeader").text(constructionDate.format("M/D")));
            newDay.append($("<div>").addClass("dayHeader").text(constructionDate.format("dddd")));
            newRow.append(newDay);
            // In addition, Sunday is the last day of the week, so it needs to append the full row and then
            // start a new one.
            if(constructionDate.format("dddd")==="Sunday"){
                $("#cardWrapper").append(newRow);
                newRow=$("<div>").addClass("row");
            }
        }
        else{
            newDay=$("<div>").addClass("col-2 calendarDay weekday").attr("data-date",constructionDate.format("x"));
            newDay.append($("<div>").addClass("dayHeader").text(constructionDate.format("M/D")));
            newDay.append($("<div>").addClass("dayHeader").text(constructionDate.format("dddd")));
            
            // On weekdays we also need to add all of the students who have appointments that day
            let appointments=studentArray.filter(student =>student.date.format("LL")===constructionDate.format("LL"));
            let tempRow;
            for(student of appointments){
                tempRow=$("<div>").addClass("row");
                tempRow.append($("<div>").addClass("studentList mr-1").html(`${student.date.format("hh:mma")}`)); 
                tempRow.append($("<div>").addClass("studentList").html(`${student.name}`));       
                newDay.append(tempRow);         
            }
            newRow.append(newDay);
        }
        // And then we move on the the next day
        constructionDate.add(1,"days");
    }
    // After the while loop is done, there is one last row that we still need to add to the document
    $("#cardWrapper").append(newRow);
    // And then we can make a header showing the range of dates
    let header=$("<div>").addClass("dateHeading").text(dateHeading);
    // And prepend it so that it shows up at hte top of the page
     $("#cardWrapper").prepend(header);
}