let sender = document.querySelector("#sender")
let email = document.querySelector("#email")
let phoneNumber = document.querySelector("#phoneNumber")
let subject = document.querySelector("#subject")
let message = document.querySelector("#message")
let button = document.querySelector("#button")

button.onclick = getData;

function getData() {
    // validation
    if (sender.value == "") {
      return alert("Name Required");
    } else if (email.value == "") {
      return alert("Email Required");
    } else if (phoneNumber.value == "") {
      return alert("Telephone Number Required");
    } else if (subject.value == "") {
      return alert("Subject Harus Required");
    } else if (message.value == "") {
      return alert("message Required");
    }
  
    const destination = "handikaalfalaq01@gmail.com";
    let link = document.createElement("a");
    link.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${destination}&su=${subject.value}&body=${message.value}. phone number : ${phoneNumber.value}`;
    link.click();
    
  sender.value = "";
  email.value = "";
  phoneNumber.value = "";
  subject.value = "";
  message.value = "";
}












