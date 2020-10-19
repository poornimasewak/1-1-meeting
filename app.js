var day = moment().format('dddd');
var date = moment().format("MMM Do YYYY");
console.log(day, date);

$("#wrapper").prepend(day,", ",date)

var begin = moment().startOf('week').add(1, "day").format("MMM Do YYYY");
var week2 = moment().startOf('week').add(1, "week").add(1,"day").format("MMM Do YYYY");
// var end = moment().add(1, 'week').endOf('week').subtract(1, "day").format("MMM Do YYYY");

console.log(begin, " - ", week2);



var studentList = ['Aaron Ray',
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
    'Zachary Smelcer']
function display(...students){
for (let i = 0; i < students.length; i++) {
    console.log(students[i]);
    var ulEl = $("#list");
    // ulEl.append(`<li>${students[i]}</li>`)
    if(i === 0){
        ulEl.append(`<li class="list-group-item">${students[i]}</li> : 9:15`)
    }else if(i===1){
        ulEl.append(`<li class="list-group-item">${students[i]}</li> : 3:00`)
    }else if(i===2){
        ulEl.append(`<li class="list-group-item">${students[i]}</li> : 3:15`)
    }else if(i===3){
        ulEl.append(`<li class="list-group-item">${students[i]}</li> : 3:30`)
    }
    
}
}

function test() {
    if (begin === "Oct 12th 2020") {

        switch (day) {
            case "Monday":
                console.log(studentList[0], studentList[1], studentList[2], studentList[3]);
                break;
            case "Tuesday":
                console.log(studentList[4], studentList[5], studentList[6], studentList[7]);
                break;
            case "Wednesday":
                console.log(studentList[8], studentList[9], studentList[10], studentList[11]);
                break;
            case "Thursday":
                console.log(studentList[12], studentList[13]);
                break;
            case "Friday":
                // console.log(studentList[14], studentList[15], studentList[16], studentList[17]);
                display(studentList[14], studentList[15], studentList[16], studentList[17]);
                break;

            default:
                break;
        }
    }
    else if(week2 === "Oct 19th 2020"){
        switch (day) {
            case "Monday":
                console.log(studentList[18], studentList[19], studentList[20], studentList[21]);
                display(studentList[18], studentList[19], studentList[20], studentList[21]);

                break;
            case "Tuesday":
                display(studentList[22], studentList[23], studentList[24], studentList[25]);
                break;
            case "Wednesday":
                display(studentList[26], studentList[27], studentList[28]);
                break;
            case "Thursday":
                display(["open"]);
                break;
            case "Friday":
                display(["open"]);
                break;

            default:
                break;
        }
    }
}

test();