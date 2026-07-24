import { database } from "./firebase-config.js";


import {

ref,
onValue,
remove

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";





const table =
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


table.innerHTML="";


let totalData=0;

let totalKuliah=0;

let totalKerja=0;

let totalUsaha=0;





snapshot.forEach((item)=>{


const data=item.val();


totalData++;




if(data.status=="Kuliah")
totalKuliah++;



if(data.status=="Kerja")
totalKerja++;



if(data.status=="Usaha")
totalUsaha++;







let row=document.createElement("tr");



row.innerHTML=`

<td>

<img src="${data.foto || 'logo.jpg'}"
width="50">

</td>


<td>
${data.nama || "-"}
</td>


<td>
${data.angkatan || "-"}
</td>


<td>
${data.status || "-"}
</td>


<td>
${data.prestasi || "-"}
</td>



<td>

<button onclick="hapusAlumni('${item.key}')">

Hapus

</button>

</td>

`;



table.appendChild(row);



});




total.innerHTML=totalData;

kuliah.innerHTML=totalKuliah;

kerja.innerHTML=totalKerja;

usaha.innerHTML=totalUsaha;



});







window.hapusAlumni=function(id){


if(confirm("Hapus data alumni ini?")){


remove(
ref(database,"alumni/"+id)
);


}


}