import { database } from "./firebase-config.js";


import {

ref,
onValue,
remove,
update

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


let jumlah=0;

let k=0;

let kr=0;

let u=0;





snapshot.forEach((item)=>{


const id=item.key;

const data=item.val();



jumlah++;



if(data.status==="Kuliah")
k++;


if(data.status==="Kerja")
kr++;


if(data.status==="Usaha")
u++;







const tr=document.createElement("tr");



tr.innerHTML=`

<td>

<img 
src="${data.foto || 'logo.jpg'}"
width="50"
height="50"
style="object-fit:cover;border-radius:50%;">

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


<button onclick="editAlumni('${id}')">

✏️ Edit

</button>



<button onclick="hapusAlumni('${id}')">

🗑️ Hapus

</button>



</td>

`;



table.appendChild(tr);



});




total.innerHTML=jumlah;

kuliah.innerHTML=k;

kerja.innerHTML=kr;

usaha.innerHTML=u;



});









window.hapusAlumni=function(id){



if(confirm("Yakin hapus data alumni?")){


remove(

ref(database,"alumni/"+id)

)

.then(()=>{


alert("Data berhasil dihapus");


});


}


};









window.editAlumni=function(id){



const nama =
prompt(
"Nama Alumni baru:"
);



const angkatan =
prompt(
"Angkatan:"
);



const status =
prompt(
"Status (Kuliah/Kerja/Usaha):"
);



const prestasi =
prompt(
"Prestasi:"
);





if(nama){



update(

ref(database,"alumni/"+id),


{

nama:nama,

angkatan:angkatan,

status:status,

prestasi:prestasi

}

)



.then(()=>{


alert("Data berhasil diperbarui");


});


}


};