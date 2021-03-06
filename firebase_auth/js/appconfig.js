
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAG7fzoVn4UWZiPZdOE10Vto08JpSZQejU",
    authDomain: "bodyfit-73046.firebaseapp.com",
    databaseURL: "https://bodyfit-73046.firebaseio.com",
    projectId: "bodyfit-73046",
    // storageBucket: "bodyfit-73046.appspot.com",
    // messagingSenderId: "725182438087",
    // appId: "1:725182438087:web:e61638d0589a9a7e653ce2",
    // measurementId: "G-6EFLCXMLMB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  var database = firebase.database();
  var userInformation;
  
  auth.onAuthStateChanged(user => {
    if (user) {
       console.log("user logged in");
       userInformation = user.email;
       console.log(userInformation);
       document.querySelector(".email-user").innerHTML = `${userInformation}`;
    } else {
      console.log('user logged out');
    }
  })
  //--------TRAINER REQUEST PART-----------//
  var ref = database.ref('trainerRequests');

  document.querySelector('#trainerReqForm').addEventListener('submit',submitRequest);
  const trainerName = document.querySelector("#selectTrainer");
  const phone = document.querySelector("#phone");
   
 function submitRequest(e){
     e.preventDefault();
     var data = {
         email: userInformation,
         name: trainerName.value,
         phone: phone.value,
         reqOn: Date()
     }
    //  console.log(data);
     ref.push(data);
     document.querySelector('#trainerReqForm').reset();
     alert('Request made. You will shortly receive a call for confirmation.');    
    document.querySelector("#reqmade").innerHTML = `You have requested for special training with ${data.name}`;
    retrieveReqInfo();
 }

 //Retrieve training info details
function retrieveReqInfo(){
  let requestInfo = firebase.database().ref("trainerRequests");
  requestInfo.on("value",reqData, errInfo);
}
function reqData(data){

// console.log(data.val());
let infos = data.val();
let keys = Object.keys(infos);
console.log(keys);
for(let i = 0; i < keys.length; i++){
    let k = keys[i];
    let userEmail = infos[k].email;
    console.log(userEmail);
    if(userInformation == userEmail){
      document.querySelector("#reqmade").innerHTML = `You have already made a request. <br> Please have patience while we get back to you.`;
      document.getElementById("noreq").disabled = true;
      console.log(userInformation == userEmail);
      
    }else{
      document.querySelector("#reqmade").innerHTML = `You have not made any requests yet. <br> Submit the details to make one.`;
    }
}
// if(keys.length == 0){
//   document.querySelector("#reqmade").innerHTML = `You have not made any requests yet. Submit the details to make one.`;
// } else if(keys == 1) {
//   document.querySelector("#reqmade").innerHTML = `You have requested for special training with ${data.name}.`;
// } else if(keys.length > 1){
//   document.querySelector("#reqmade").innerHTML = `You have already made a request. Please have patience while we get back to you.`;
//   document.getElementById("noreq").disabled = true;
// }
// for(let i = 0; i < keys.length; i++){
//   let k = keys[i];
//   let name = info[k].name;
//   let subsOn = infos[k].reqOn;
//   console.log(name,subsOn);


//   var bookingDetails = document.querySelector(".bookingDetails");
//   bookingDetails.innerHTML += `<div class="classList">
//                                <p><strong>Class: </strong> ${name} <br>
//                                <a><strong>Subscribed On: </strong> ${subscribedOn}</a> <br>
//                                <a><strong>Subscribed For: </strong> ${subscription}</a></p>
//                                </div>`;
// document.querySelector("#count").innerText = keys.length;
// }

}
function errInfo(err){
console.log("Error!");
console.log(err);
}

retrieveReqInfo();


  //--------CONTACT US PART-----------//
  let contactInfo = database.ref("contactData");

  document.querySelector(".contact-form").addEventListener("submit", submitForm);
  
  function submitForm(e) {
   e.preventDefault();
    //Get input values 
       
      let name = document.querySelector("#name").value;
      // let email = document.querySelector("#email").value;
      
      // auth.onAuthStateChanged(user => {
      //   if (user!=null) {
      //     userInformation = user.email;
      //     console.log(userInformation);
      //     document.querySelector(".email-user").innerHTML = `${userInformation}`;
      //     document.querySelector('[placeholder = "Email"').innerText = `${userInformation}`;
          
      //   }})
      // var email = auth.currentUser;
      // console.log(email);
      // document.querySelector("#email").innerHTML = email.email;
      // console.log(email);
      
     let message = document.querySelector("#message").value;
     console.log(name, message);
      
     saveContactInfo(name, message);

     document.querySelector(".contact-form").reset();
     document.querySelector(".alertmessage").innerHTML = "<h4> Message sent successfully. </h4>"
}

function saveContactInfo(name, message) {
 let newContactInfo = contactInfo.push();

 newContactInfo.set({
   name: name,
   email: userInformation,
   message: message,
 });
}

//Booking classes
var className;
var bookRef = database.ref('classData');

document.querySelector('#booking-form').addEventListener('submit', bookNowForm);

function reply_click(clicked_id){
  className = clicked_id.value;
  console.log(className);
  document.querySelector('.classChosen').innerHTML = `${className}`;
}
 
function bookNowForm(e){
   e.preventDefault();
   let timeFrame = document.querySelector("#selectTiming").value;
   let phoneno = document.querySelector("#phoneno").value;
  
   console.log(className,timeFrame,phoneno);
   saveBookingInfo(className,timeFrame,phoneno);
   document.querySelector('#booking-form').reset();
   document.getElementById("alert-confirm").innerHTML = `Request made. You will shortly receive a call for confirmation.`;
}

function saveBookingInfo(className,timeFrame,phoneno){
     let newBookingInfo = bookRef.push();

     newBookingInfo.set({
       email: userInformation,
       name: className,
       subscribedFor: timeFrame,
       phoneno: phoneno,
       reqOn: Date()
     });
     retrieveClassInfo();
}

//Retrieve class details
function retrieveClassInfo(){
    let detailsInfo = firebase.database().ref("classData");
    detailsInfo.on("value",gotData, errData);
}
function gotData(data){
  var classLists = document.querySelectorAll(".classList");
  for (var i = 0; i<classLists.length; i++){
    classLists[i].remove();
  }

  // console.log(data.val());
  let info = data.val();
  let keys = Object.keys(info);

  for(let i = 0; i < keys.length; i++){
    let k = keys[i];
    let usermail = info[k].email;
    let name = info[k].name;
    let subscription = info[k].subscribedFor;
    let subscribedOn = info[k].reqOn;
    console.log(usermail,name,subscription,subscribedOn);
    
    var bookingDetails = document.querySelector(".bookingDetails");

    if(userInformation == usermail){
    document.querySelector(".hidethis").style.display = "none";
    bookingDetails.innerHTML += `<div class="classList"> 
                                 <p><strong>Class Joined: </strong> ${name} <br>
                                 <a><strong>Subscribed On: </strong> ${subscribedOn}</a> <br>
                                 <a><strong>Subscribed For: </strong> ${subscription}</a></p>
                                 </div>`;
  }
}
  
}
function errData(err){
  console.log("Error!");
  console.log(err);
}

retrieveClassInfo();