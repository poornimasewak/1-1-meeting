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
    if(calendarFormat==="daily") dayCalendar(initialDate);
    else if(calendarFormat==="monthly") monthCalendar();
}


function dayCalendar(UIDate){
    // UIDate is the date that the user is currently investigating, which may not necessarily
    // be the same as today's date
    
//    let appointments=studentArray.filter(trial);
    // console.log(appointments);
    for(x of studentArray) console.log(trial(x, test));
}
function trial(student, test){
    sdate=student.time;
    console.log(sdate);
    console.log(sdate.format("LL"));
    console.log(student.time.format("LL")); 
    
    console.log("Studnet: "+student.time.format("LL")); 
    return test===student.time.format("LL");
}


function organizeStudents(){
        // Make some students!
    // Each student has a name, from our array.
    // Every 1st student meets at 3:00, every 2nd at 3:15, and every third at 3:30, and then we start over
    // Every three students we increment the date. If it's a weekend, we advance up to Monday
    // Thursday is the one exception: only one student on Thursdays!
    let meetingSlot=1;
    let time=moment(initialDate);
    
    for(name of studentNameList){
        console.log(("Time: "+time.format("LLLL")));
        if(meetingSlot>3){
           time.subtract(45, "minutes");
           time.add(1,"days");
            if(time.format("dddd")==="Saturday") time.add(2,"days");
            meetingSlot=1;
        }
        else if(time.format("dddd")==="Thursday" && meetingSlot>1){
           time.subtract(15, "minutes");
           time.add(1,"day");
            meetingSlot=1;
        }        
        obj=new Student(name, time);
        console.log("Adding "+time.format("LLLL"));
        studentArray.push(obj);
       time.add(15, "minutes");
        meetingSlot++;
    }
}