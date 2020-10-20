function dayCalendar(userDate, e=null){
    // If we have an event, then we came here from dayCalendar (either the forwward or the backward
    // buttons). They're all jumbled up, so we should just make sure that none of the other click events
    // get called by mistake
    if(e) e.stopPropagation();
    else{
        // If we don't have an event, then either this is the first time we've loaded the page,
        // or else we've come from monthCalendar. Either way, we need to set up the basics.
        $("#cardWrapper").empty();
        $("#cardWrapper").html(
            `<div class="card dayCalendarPage" id="yesterday">
        <div class="card dayCalendarPage" id="today">
           <div class="card-body" ></div>
       </div>   
   <div class="card-body" ></div>
   <div class="card dayCalendarPage" id="tomorrow">
       <div class="card-body" ></div>
   </div>
   </div>`);
    }

    console.log("Turning off");
    calendarFormat="daily";
 //   $('#mode-toggle').bootstrapToggle('off');

    // userDate is the date that the user is currently investigating,(which may not necessarily
    // be the same as today's date). 
    // Filter the array to remove everyone that it's meeting on userDate
    let appointments=studentArray.filter(student =>student.date.format("LL")===userDate.format("LL"));
    if(appointments.length===0) {appointments=[{date:userDate}]}
    buildDayCalendar(appointments);
}


// Starting on a particular date (today, if coming from init(), but it could be other dates) 
// we build a card listing all of the meetings for that day. 
function buildDayCalendar(array){
    $("#today .card-body").empty();
    let today=$("<div>").addClass("row");
    // The heading is the date of this day, but since we're only getting students who will be meeting
    // on this day, we can just use array[0].date to make our heading (it's the same for any element)
    let userDate=array[0].date;
    today.append($("<div>").addClass("col-12").html("<span class='dateHeading'>"+userDate.format("LL")+"</span>"));

    let lastMeetingDate=studentArray[(studentArray.length-1)].date;
    // If the user hits "back" too many times, we'll be displaying dates from before any meetings were scheduled
    if(userDate.isBefore(initialDate)){
        today.append($("<div>").addClass("col-12").text("There were no meetings before October 19th, 2020."));
    }
    // Likewise, if the user hits "forward" too many times, we'll run out of meetings
    else if(userDate.isAfter(lastMeetingDate)){
        today.append($("<div>").addClass("col-12").text("There are no meetings scheduled after "+lastMeetingDate.format("LLLL")+"."));
    }
    // There are no meetings scheduled for the weekends
    else if(userDate.format("dddd")==="Saturday" || userDate.format("dddd")==="Sunday"){
        today.append($("<div>").addClass("col-12").text("No meetings on the weekend."));
    }
    // But, if we're within the range where meetings have been scheduled and it isn't a weekend, there will be 
    // at least one meeting. Iterate through the array and find out who will be there!
    else{
        for(student of array){
            today.append($("<div>").addClass("col-6").text(student.name));
            today.append($("<div>").addClass("col-6").text(student.date.format("hh:mma")));        
        }

    }
    // Lots of confusing and ugly code to get all the CSS to line up right.
    // The tricky bit is that I want #today to be on top, visually, but 
    // it obscures click events from the other two. So I had to put #today
    // inside #yesterday. Which means a lot of fiddly css to get it looking right.
    $("#today .card-body").append(today);
    fixStyling();
    let back=moment(userDate);
    back=back.subtract(1,"days");
    let forward=moment(userDate);
    forward=forward.add(1,"days");
    $("#tomorrow").on("click",function(e){dayCalendar(forward,e)});
    $("#yesterday").on("click",function(e){dayCalendar(back,e)});
 }
function fixStyling(){
    let h=$("#today").height();    
    let t=$("#today").position().top+20;
    let w=$("#today").width();
    
    $("#yesterday").height(h);
    $("#tomorrow").height(h);
    $("#yesterday").width(w);
    $("#tomorrow").width(w);
    $("#today").width(w);
    
    $("#tomorrow").css("top",t);
    $("#tomorrow").css("left",60);
    $("#tomorrow").off("click");
    $("#yesterday").off("click");
}
