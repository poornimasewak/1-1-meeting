// let moment=require("moment");
$(("document")).ready(init);
const initialDate=moment("2020-10-19 15:00", "YYYY-MM-DD HH:mm",true);
// A list of everyone's name
const studentNameList = ['Aaron Ray',
    'Adrian Mustafa',
    'Agnes Chueng',
    'Aida Blinstrubyte',
    'Alexandra Eesley',
    'Ben Resnicoff',
    'Benjamin Dionysus',
    'Christian Kalama',
    'Daniel Viramontes',
    'Elizabeth Reuter',
    'Erik Tomlinson',
    'Flory Ann Evia',
    'Jerry (Jake) Wagner',
    'John Cushing',
    'Justin Albert',
    'Justin Yocus',
    'Katie Reid-anderson',
    'Kevin Miller',
    'Matthew Hiatt',
    'Maxence Jeanty',
    'Michael Chang',
    'Owen Roth',
    'Ryan Wills',
    'Sam Fullerton',
    'Sarah Barkley',
    'Steve Kavuu',
    'Toni Rose Debelen',
    'Trey Jahner',
    'Zachary Smelcer'];
// An array of Student objects
const studentArray=[];

function init(){
    organizeStudents();
    let calendarFormat="daily";
    if(calendarFormat==="daily") dayCalendar(moment());
    else if(calendarFormat==="monthly") monthCalendar();
}

function dayCalendar(userDate, e){
    if(e) e.stopPropagation();
    // UIDate is the date that the user is currently investigating,(which may not necessarily
    // be the same as today's date). 
    // Filter the array to remove everyone that it's meeting on userDate
    let appointments=studentArray.filter(student =>student.date.format("LL")===userDate.format("LL"));
    buildDayCalendar(appointments);
}



function buildDayCalendar(array){
    $("#today .card-body").empty();
    let today=$("<div>").addClass("row");
    // The heading is the date of this day, but since we're only getting students who will be meeting
    // on this day, we can just use array[0].date to make our heading (it's the same for any element)
    let userDate=array[0].date;
    today.append($("<div>").addClass("col-12").html("<span class='dayCalendarDate'>"+userDate.format("LL")+"</span>"));
    for(student of array){
        today.append($("<div>").addClass("col-6").text(student.name));
        today.append($("<div>").addClass("col-6").text(student.date.format("hh:mma")));        
    }
    // Lots of confusing and ugly code to get all the CSS to line up right.
    // The tricky bit is that I want #today to be on top, visually, but 
    // it obscures click events from the other two. So I had to put #today
    // inside #yesterday. Which means a lot of fiddly css to get it looking right.
    $("#today .card-body").append(today);
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
    let td=userDate.add(1,"days");
    
    $("#tomorrow").off("click");
    $("#yesterday").off("click");
    $("#tomorrow").on("click",function(e){dayCalendar(userDate.add(1,"days"),e);});
    $("#yesterday").on("click",function(e){dayCalendar(userDate.subtract(1,"days"),e);});
 
}





//__--==^``''``^==--__--==v,,..,,v==--__--==^``''``^==--__--==v,,..,,v==--__--==^``''
//__                                                                               ''
//__ organizeStudents()                                                            ''
//__ Creates a new object with a .name and a .date, and pushes it into studentArray''
//__                                                                               ''
//__--==^``''``^==--__--==v,,..,,v==--__--==^``''``^==--__--==v,,..,,v==--__--==^``''
function organizeStudents(){
    const maxMeetingsPerDay=3;
    let meetingSlot=1;

    // Hugely important--I was setting date=initialDate, but that was a depp copy, so
    // when I would change the value of date, it also changed the value of initialDate
    // *That* took a while to debug!!
    let time=moment(initialDate);

    for(name of studentNameList){        
        // Every three students we increment the date.
        if(meetingSlot>maxMeetingsPerDay){
           time.subtract(45, "minutes");
           time.add(1,"days");
        //    If it's a weekend, we advance up to Monday
            if(time.format("dddd")==="Saturday") time.add(2,"days");
            meetingSlot=1;
        }        
    // Thursday is the one exception: only one student on Thursdays!
        else if(time.format("dddd")==="Thursday" && meetingSlot>1){
           time.subtract(15, "minutes");
           time.add(1,"day");
            meetingSlot=1;
        }        
        // Again, we don't want to pass time, because that's a deep copy, which is
        // being updated throughout this loop. We want a new moment() object *based* on time
        obj=new Student(name, moment(time));
        studentArray.push(obj);
        // Meetings are fifteen minutes each
       time.add(15, "minutes");    
        meetingSlot++;
    }
}