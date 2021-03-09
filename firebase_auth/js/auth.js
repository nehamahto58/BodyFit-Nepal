// //get data
// db.collection('guides').get().then(snapshot => {
//     setupGuides(snapshot.docs);
//   });


// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
 
  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
    
    
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  })
    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      if(errorCode == 'auth/weak-password'){
        document.querySelector("#register-error-password").innerHTML="Weak password. Please use the combination of letters, numbers, symbols."
      }
      else {
        alert(errorMessage);
      }
    })
  
  document.querySelector("#showmessage").innerHTML="Registered successfully! Login to continue."
});



// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    if(cred.user){
        window.location.href="/index.html"
    }
})
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorCode === 'auth/wrong-password'){
      document.querySelector("#login-error-password").innerHTML="Wrong Password. Try again!"
    }
    else {
      alert(errorMessage);
    }
});

});


