var database = firebase.database();
var ref = database.ref('trainerRequests');

 document.querySelector('#trainerReqForm').addEventListener('submit',submitRequest);
 const trainerName = document.querySelector("#selectTrainer");
 const phone = document.querySelector("#phone");
  
function submitRequest(e){
    e.preventDefault();
    var data = {
        name: trainerName.value,
        phone: phone.value,
        reqOn: Date()
    }
    console.log(data);
    ref.push(data);
    document.querySelector('#trainerReqForm').reset();
    alert('Request made. You will shortly receive a call for confirmation.');    
// document.querySelector("#reqmade").innerHTML = `${data.name}`;
}



