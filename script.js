var day = moment().format('dddd');
var date = moment().format("MMM Do YYYY");
console.log(day, date);
$("#wrapper").prepend(day, ", ", date)
day += " ";
day += date;
console.log(day);


function display(...students) {
    for (let i = 0; i < students.length; i++) {
        console.log(students[i]);
        var ulEl = $("#list");
        if (i === 0) {
            ulEl.append(`<li class="list-group-item">${students[i]} : 3:00 PM</li> `)
        } else if (i === 1) {
            ulEl.append(`<li class="list-group-item">${students[i]} : 3:15 PM</li> `)
        } else if (i === 2) {
            ulEl.append(`<li class="list-group-item">${students[i]} : 3:30 PM</li> `)
        }

    }
}

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
    'Zachary Smelcer'];

switch (day) {
    case "Monday Oct 19th 2020":
        display(...studentList.slice(0, 3))
        break;
    case "Tuesday Oct 20th 2020":
        display(...studentList.slice(3, 6))
        break;
    case "Wednesday Oct 21st 2020":
        display(...studentList.slice(6, 9))
        break;
    case "Thursday Oct 22nd 2020":
        display(...studentList.slice(9, 10))
        break;
    case "Friday Oct 23rd 2020":
        display(...studentList.slice(10, 13))
        break;
    case "Monday Oct 26th 2020":
        display(...studentList.slice(13, 16))
        break;
    case "Tuesday Oct 27th 2020":
        display(...studentList.slice(16, 19))
        break;
    case "Wednesday Oct 28th 2020":
        display(...studentList.slice(19, 22))
        break;
    case "Thursday Oct 29th 2020":
        display(...studentList.slice(22, 23))
        break;
    case "Friday Oct 30th 2020":
        display(...studentList.slice(23, 26))
        break;
    case "Monday Nov 2nd 2020":
        display(...studentList.slice(26, 30))
        break;

    default:
        break;
}