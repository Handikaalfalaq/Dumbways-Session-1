let button = document.getElementById("button");
let nama = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let subject = document.getElementById("subject");
let message = document.getElementById("message");

button.onclick = getData;

function getData() {
  // validation
  if (nama.value == "") {
    return alert("Nama Harus Di Isi");
  } else if (email.value == "") {
    return alert("Email Harus Di Isi");
  } else if (phone.value == "") {
    return alert("No Telpon Harus Di Isi");
  } else if (subject.value == "") {
    return alert("Subject Harus Dipilih");
  } else if (message.value == "") {
    return alert("Pesan Harus Di Isi");
  }

  const destination = "handikaalfalaq01@gmail.com";
  let link = document.createElement("a");
  link.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${destination}&su=${subject.value}&body=${message.value}`;
  link.click();

  // let data = {
  //   nama: nama.value,
  //   email: email.value,
  //   telp: phone.value,
  //   subject: subject.value,
  //   pesan: message.value,
  // };

  // console.log(data);

  nama.value = "";
  email.value = "";
  phone.value = "";
  subject.value = "";
  message.value = "";
}
















