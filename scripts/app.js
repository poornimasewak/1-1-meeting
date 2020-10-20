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
    'Katie Reid-Anderson',
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
    let calendarFormat="monthly";
    $(window).on("resize", ()=>{if (calendarFormat==="daily") fixStyling();});
    // If we call dayCalendar, we'll pass it today's date. But for the monthly,
    // we can use the initialDate
    if(calendarFormat==="daily") dayCalendar(moment());
    else if(calendarFormat==="monthly") monthCalendar(moment(initialDate));
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