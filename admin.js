import { database } from "./firebase-config.js";


import {

ref,
onValue,
remove

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";





const dataTable =
document.getElementById("dataAlumni");



const total =
document.getElementById("jumlahAlumni");



const kuliah =
document.getElementById("jumlahKuliah");



const kerja =
document.getElementById("jumlahKerja");



const usaha =
document.getElementById("jumlahUsaha");






onValue(

ref(database,"alumni"),

(snapshot)=>{


dataTable.innerHTML="";


let totalData=0;

let k=0;

let kr=0;

let u=0;





snapshot.forEach((item)=>{


const data=item.val();


totalData++;





if(data.status=="Kuliah")
k++;



if(data.status=="Kerja")
kr++;



if(data.status=="Usaha")
u++;







const tr=document.createElement("tr");



tr.innerHTML=`

<td>

${data.foto ? 
"<img src='"+data.foto+"' width='50'>"
:
"Tidak ada foto"}

</td>


<td>${data.nama || "-"}</td>


<td>${data.angkatan || "-"}</td>


<td>${data.status || "-"}</td>


<td>${data.prestasi || "-"}</td>


<td>

<button class="hapus" data-id="${item.key}">

Hapus

</button>

</td>

`;





dataTable.appendChild(tr);






});





total.innerHTML=totalData;

kuliah.innerHTML=k;

kerja.innerHTML=kr;

usaha.innerHTML=u;






document
.querySelectorAll(".hapus")
.forEach((btn)=>{


btn.onclick=()=>{


if(confirm("Hapus data alumni?")){


remove(
ref(database,"alumni/"+btn.dataset.id)
);


}


}



});





}

);