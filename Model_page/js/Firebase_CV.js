import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js'

// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
import { getFirestore, collection, addDoc, setDoc, doc, getDocs } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'


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
//console.log(app.name);
const analytics = getAnalytics(app);

// Get data from Firebase
const db = getFirestore(app);
//console.log(db);
const CVRef = collection(db, 'CV');

//set new data
// await setDoc(doc(CVRef), {
//     image: "San Francisco",
//     link: "CA", 
//     paragraph: "USA",
//     title: 860000,
//     writer: "aaaaa"});
// console.log(CVRef);

//get data
// const docSnap = await getDocs(CVRef);
// print(docSnap);
// docSnap.forEach((doc) => {console.log(doc.data())});
// docSnap.forEach((doc) => {console.log(doc.data().link)});

//Upload image
 //uploading file in storage
 function uploadimage(){
    var type = getInputVal('types');
    var storage = firebase.storage();
    var file=document.getElementById("files ").files[0];
    var storageref=storage.ref();
    var thisref=storageref.child(type).child(file.name).put(file);
    thisref.on('state_changed',function(snapshot) {
    }, function(error) {
    }, function() {
    // Uploaded completed successfully, now we can get the download URL
    thisref.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    //getting url of image
    document.getElementById("url ").value=downloadURL;
    alert('uploaded successfully');
    saveMessage(downloadURL);
    });
});

 // Get values
 var url = getInputVal('url');
 // Save message
 // saveMessage(url);
}
function getInputVal(id){
   document.getElementById('contactForm').reset();

}


// Function to get form values
function getInputVal(id){
 return document.getElementById(id).value;
}

// Save message to firebase database
function saveMessage(url){
 var newMessageRef = messagesRef.push();
 newMessageRef.set({
  imageurl:url,
 });
}


