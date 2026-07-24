import { database } from "./firebase-config.js";


import {

ref,
push,
set

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";




const form =
document.getElementById("formAlumni");



const fotoInput =
document.getElementById("foto");





form.addEventListener("submit",(e)=>{


e.preventDefault();



const file =
fotoInput.files[0];





if(file){


const reader =
new FileReader();



reader.onload=function(){


simpanData(reader.result);


};



reader.readAsDataURL(file);



}

else{


simpanData("");



}



});








function simpanData(foto){



const dataAlumni = {


nama:
document.getElementById("nama").value,


angkatan:
document.getElementById("angkatan").value,


tahun:
document.getElementById("tahun").value,


email:
document.getElementById("email").value,


whatsapp:
document.getElementById("whatsapp").value,


sekolah:
document.getElementById("sekolah")?.value || "STP Isykariman",


status:
document.getElementById("status").value,


prestasi:
document.getElementById("prestasi").value,


foto:
foto


};





const dataBaru =
push(ref(database,"alumni"));





set(dataBaru,dataAlumni)

.then(()=>{


alert(
"✅ Data alumni berhasil dikirim!\n\nTerima kasih sudah bergabung."
);



form.reset();



// otomatis kembali ke halaman utama

setTimeout(()=>{


window.location.href="index.html";


},1000);



})



.catch((error)=>{


alert(
"Gagal mengirim data: "
+ error.message
);



});



}