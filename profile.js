import { database }
from "./firebase-config.js";


import {

ref,

get

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";





const params =
new URLSearchParams(
window.location.search
);



const id =
params.get("id");




if(id){


get(
ref(database,"alumni/"+id)

)

.then((snapshot)=>{


const alumni =
snapshot.val();




if(alumni){



document
.getElementById("fotoAlumni")
.src =
alumni.foto || "logo.jpg";



document
.getElementById("namaAlumni")
.innerHTML =
alumni.nama || "-";



document
.getElementById("angkatan")
.innerHTML =
alumni.angkatan || "-";



document
.getElementById("pendidikan")
.innerHTML =
alumni.pendidikan || "-";



document
.getElementById("pekerjaan")
.innerHTML =
alumni.pekerjaan || "-";



document
.getElementById("domisili")
.innerHTML =
alumni.domisili || "-";



document
.getElementById("prestasi")
.innerHTML =
alumni.prestasi || "-";



document
.getElementById("quote")
.innerHTML =
alumni.quote || 
"Terus belajar dan memberi manfaat";



}


});


}