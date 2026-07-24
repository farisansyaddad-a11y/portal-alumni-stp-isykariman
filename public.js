import { database } 
from "./firebase-config.js";


import {

ref,

onValue

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";





const list =
document.getElementById("listAlumni");



const search =
document.getElementById("cariAlumni");



let semua=[];




onValue(
ref(database,"alumni"),

(snapshot)=>{


semua=[];


snapshot.forEach((data)=>{


semua.push(data.val());


});


tampilkan(semua);


});








function tampilkan(data){


list.innerHTML="";



data.forEach((alumni)=>{



list.innerHTML += `


<div class="card-alumni">



<img src="${alumni.foto || ''}">



<h2>

${alumni.nama}

</h2>



<span>
📅 Angkatan:
${alumni.angkatan}
</span>



<span>
🎓 Status:
${alumni.status}
</span>



<span>
🏆 Prestasi:
${alumni.prestasi}
</span>



</div>


`;



});



}







search.addEventListener(
"input",

()=>{


let keyword =
search.value.toLowerCase();



let hasil =
semua.filter((a)=>{


return a.nama
.toLowerCase()
.includes(keyword);



});



tampilkan(hasil);



});