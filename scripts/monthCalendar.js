function monthCalendar(userDate){
    // Huh. I thought there would be more initilization stuff needed here.
    buildMonthCalendar(userDate);
    $("#calendarDay").on("click",dayCalendar)

}


function buildMonthCalendar(userDate){
    $("#cardWrapper").empty();
    // let cal=$("<div>").addClass("row");
    // The heading should show the earliest and the last month in our array    
    let lastDate=studentArray[studentArray.length-1].date;
    let dateHeading=userDate.format("MMMM, YYYY")+" - "+lastDate.format("MMMM, YYYY");
    
    // $("#cardWrapper").append($("<div>").addClass("col-12 dateHeading").text(dateHeading));
    // cal.attr("id","cal");
    let newRow=$("<div>").addClass("row");
    let constructionDate=moment(userDate);
    let newDay;
    // Keep increasing the constructionDate until the day before the last date in our array
    while(constructionDate.isBefore(lastDate)){
        if(constructionDate.format("dddd")==="Saturday"){
            newDay=$("<div>").addClass("col-1 calendarDay weekend");
            newDay.append($("<div>").addClass("dayHeader").text(constructionDate.format("M/D")));
            newDay.append($("<div>").addClass("dayHeader").text(constructionDate.format("dddd")));
            newRow.append(newDay);
        }
        else if(constructionDate.format("dddd")==="Sunday"){
            
            newDay=$("<div>").addClass("col-1 calendarDay weekend");
            newDay.append($("<div>").addClass("dayHeader").text(constructionDate.format("M/D")));
            newDay.append($("<div>").addClass("dayHeader").text(constructionDate.format("dddd")));
            newRow.append(newDay);
            $("#cardWrapper").append(newRow);
            newRow=$("<div>").addClass("row");
        }
        else{
            newDay=$("<div>").addClass("col-2 calendarDay weekday");
            newDay.append($("<div>").addClass("dayHeader").text(constructionDate.format("M/D")));
            newDay.append($("<div>").addClass("dayHeader").text(constructionDate.format("dddd")));
            
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
        constructionDate.add(1,"days");
    }
    
    $("#cardWrapper").append(newRow);
    let header=$("<div>").addClass("dateHeading").text(dateHeading);
     $("#cardWrapper").prepend(header);
}