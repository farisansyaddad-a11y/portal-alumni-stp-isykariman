import { database } from "./firebase-config.js";


import {

ref,

onValue

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";





const totalAlumni =
document.getElementById("totalAlumni");



const totalPrestasi =
document.getElementById("totalPrestasi");






onValue(
ref(database,"alumni"),

(snapshot)=>{


let jumlah = 0;

let prestasi = 0;




snapshot.forEach((data)=>{


jumlah++;




if(
data.val().prestasi &&
data.val().prestasi.trim() !== ""
){

prestasi++;

}



});




if(totalAlumni){

totalAlumni.innerHTML =
jumlah + "+";

}



if(totalPrestasi){

totalPrestasi.innerHTML =
prestasi + "+";

}



});
