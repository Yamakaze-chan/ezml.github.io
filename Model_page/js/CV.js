import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'

    // If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
    import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js'

    // Add Firebase products that you want to use
    import { getAuth } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
    import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'

    const firebaseConfig = {
    apiKey: "AIzaSyDRAme89YeF3N2fmyjGKTujp6jxyE9ZAL0",
    authDomain: "ezml-2ddce.firebaseapp.com",
    projectId: "ezml-2ddce",
    storageBucket: "ezml-2ddce.appspot.com",
    messagingSenderId: "198434711296",
    appId: "1:198434711296:web:41d196e34df029475a35e5",
    measurementId: "G-QEF7VZJT78"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log(app.name);
    const analytics = getAnalytics(app);

// Get The Date
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function checkTime() {
var date = new Date();
var sufix = '';
var hours = ('0' + date.getHours()).slice(-2);
var minutes = ('0' + date.getMinutes()).slice(-2);
var day = date.getDate();
var month = monthNames[date.getMonth()];
var weekday = dayNames[date.getDay()];
var year = date.getFullYear();
if (day > 3 && day < 21) sufix = 'th';
switch (day % 10) {
    case 1:
    sufix = "st";
    case 2:
    sufix = "nd";
    case 3:
    sufix = "rd";
    default:
    sufix = "th";}

document.getElementById('time').innerHTML = weekday + ' ' + day + sufix + ', ' + month + ' ' + year;
}
setInterval(checkTime(), 1000);





// Dark Mode Switcher
// Source: https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8
const toggleSwitch = document.querySelector('.dark_mode_switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
document.documentElement.setAttribute('data-theme', currentTheme);

if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
}
}

function switchTheme(e) {
if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
} else
{
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
}
}

toggleSwitch.addEventListener('change', switchTheme, false);
//# sourceURL=pen.js