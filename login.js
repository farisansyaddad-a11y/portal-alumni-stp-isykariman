import { auth } from "./firebase-config.js";


import {

signInWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";





const btn = document.getElementById("loginBtn");





btn.addEventListener("click",()=>{


const email =
document.getElementById("email").value;



const password =
document.getElementById("password").value;






signInWithEmailAndPassword(
auth,
email,
password
)


.then(()=>{


window.location.href="admin.html";


})


.catch((error)=>{


alert(
"Login gagal: "
+
error.message
);


});



});