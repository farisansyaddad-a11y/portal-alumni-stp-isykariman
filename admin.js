import { database, auth } from "./firebase-config.js";


import {
    ref,
    onValue,
    remove,
    update
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";




// =======================
// CEK LOGIN
// =======================

onAuthStateChanged(auth,(user)=>{


    if(!user){

        window.location.href="login.html";

    }


});





// =======================
// ELEMENT
// =======================


const tabel =
document.getElementById("tabelAlumni");


const search =
document.getElementById("searchAlumni");


const total =
document.getElementById("totalAlumni");


const kuliah =
document.getElementById("jumlahKuliah");


const kerja =
document.getElementById("jumlahKerja");


const usaha =
document.getElementById("jumlahUsaha");



let semuaAlumni=[];

let idEdit=null;








// =======================
// AMBIL DATA FIREBASE
// =======================


onValue(ref(database,"alumni"),(snapshot)=>{


    semuaAlumni=[];



    snapshot.forEach((data)=>{


        semuaAlumni.push({

            id:data.key,

            ...data.val()

        });



    });



    tampilkanData(semuaAlumni);


    hitungStatistik(semuaAlumni);



});









// =======================
// TAMPIL DATA
// =======================


function tampilkanData(data){


    tabel.innerHTML="";



    data.forEach((alumni)=>{



        tabel.innerHTML += `


<tr>



<td>

${
alumni.foto

?

`<img src="${alumni.foto}"
width="60"
height="60"
style="border-radius:50%;object-fit:cover;">`

:

"-"

}

</td>




<td>

<button class="namaAlumni"
data-id="${alumni.id}">

${alumni.nama || "-"}

</button>


</td>




<td>
${alumni.angkatan || "-"}
</td>



<td>
${alumni.status || "-"}
</td>



<td>
${alumni.prestasi || "-"}
</td>




<td>


<button class="editBtn"
data-id="${alumni.id}">

✏️ Edit

</button>



<button class="hapusBtn"
data-id="${alumni.id}">

🗑️ Hapus

</button>



</td>



</tr>


`;



    });



    aktifkanDetail();

    aktifkanEdit();

    aktifkanHapus();



}









// =======================
// STATISTIK
// =======================


function hitungStatistik(data){


let cKuliah=0;

let cKerja=0;

let cUsaha=0;




data.forEach((alumni)=>{


let status =
alumni.status?.toLowerCase();



if(status==="kuliah")
cKuliah++;



if(status==="kerja")
cKerja++;



if(status==="usaha")
cUsaha++;



});



total.innerHTML=data.length;

kuliah.innerHTML=cKuliah;

kerja.innerHTML=cKerja;

usaha.innerHTML=cUsaha;



}









// =======================
// SEARCH
// =======================


search.addEventListener("input",()=>{


let keyword =
search.value.toLowerCase();



let hasil =
semuaAlumni.filter((alumni)=>{


return alumni.nama
.toLowerCase()
.includes(keyword);



});



tampilkanData(hasil);



});









// =======================
// DETAIL
// =======================


function aktifkanDetail(){


document
.querySelectorAll(".namaAlumni")
.forEach((button)=>{


button.onclick=()=>{


let alumni =
semuaAlumni.find(
(a)=>a.id===button.dataset.id
);



detailFoto.src =
alumni.foto || "";

detailNama.innerHTML =
alumni.nama || "-";


detailAngkatan.innerHTML =
alumni.angkatan || "-";


detailEmail.innerHTML =
alumni.email || "-";


detailWhatsapp.innerHTML =
alumni.whatsapp || "-";


detailSekolah.innerHTML =
alumni.sekolah || "-";


detailStatus.innerHTML =
alumni.status || "-";


detailPrestasi.innerHTML =
alumni.prestasi || "";



detailModal.style.display="flex";



};



});



}









// =======================
// EDIT
// =======================


function aktifkanEdit(){


document
.querySelectorAll(".editBtn")
.forEach((button)=>{


button.onclick=()=>{


let alumni =
semuaAlumni.find(
(a)=>a.id===button.dataset.id
);



idEdit = alumni.id;



editNama.value =
alumni.nama || "";


editAngkatan.value =
alumni.angkatan || "";


editEmail.value =
alumni.email || "";


editWhatsapp.value =
alumni.whatsapp || "";


editSekolah.value =
alumni.sekolah || "";


editStatus.value =
alumni.status || "";


editPrestasi.value =
alumni.prestasi || "";



editModal.style.display="flex";



};



});


}









document
.getElementById("saveEdit")
.onclick=()=>{


update(
ref(database,"alumni/"+idEdit),

{


nama:editNama.value,

angkatan:editAngkatan.value,

email:editEmail.value,

whatsapp:editWhatsapp.value,

sekolah:editSekolah.value,

status:editStatus.value,

prestasi:editPrestasi.value


}

);



editModal.style.display="none";


alert("Data berhasil diperbarui");


};









// =======================
// HAPUS
// =======================


function aktifkanHapus(){


document
.querySelectorAll(".hapusBtn")
.forEach((button)=>{


button.onclick=()=>{


let yakin =
confirm(
"Yakin hapus data alumni?"
);



if(yakin){


remove(
ref(database,"alumni/"+button.dataset.id)
);


alert("Data berhasil dihapus");


}



};


});


}








// =======================
// CLOSE MODAL
// =======================


closeModal.onclick=()=>{

detailModal.style.display="none";

};



closeEdit.onclick=()=>{

editModal.style.display="none";

};









// =======================
// EXPORT EXCEL
// =======================


exportBtn.onclick=()=>{


let dataExcel =
semuaAlumni.map((a)=>{


return {

Nama:a.nama,

Angkatan:a.angkatan,

Email:a.email,

WhatsApp:a.whatsapp,

Sekolah:a.sekolah,

Status:a.status,

Prestasi:a.prestasi

};


});



let ws =
XLSX.utils.json_to_sheet(dataExcel);


let wb =
XLSX.utils.book_new();



XLSX.utils.book_append_sheet(
wb,
ws,
"Alumni"
);



XLSX.writeFile(
wb,
"Data-Alumni.xlsx"
);



};









// =======================
// LOGOUT
// =======================


logoutBtn.onclick=()=>{


signOut(auth);


window.location.href="login.html";


};