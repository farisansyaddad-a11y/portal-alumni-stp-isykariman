import { database } from "./firebase-config.js";


import {
    ref,
    push,
    set
} 
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";




// Ambil form

const form =
document.getElementById("formAlumni");



const fotoInput =
document.getElementById("foto");






form.addEventListener("submit",(e)=>{


    e.preventDefault();



    const file =
    fotoInput.files[0];



    // Jika ada foto

    if(file){



        const reader =
        new FileReader();



        reader.onload = function(){


            simpanData(reader.result);


        };



        reader.readAsDataURL(file);



    }


    // Jika tidak ada foto

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



        whatsapp:
        document.getElementById("whatsapp").value,



        email:
        document.getElementById("email").value,



        sekolah:
        document.getElementById("sekolah").value,



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


        alert("Data alumni berhasil dikirim");


        form.reset();



    })


    .catch((error)=>{


        alert(
        "Gagal menyimpan data : "
        + error.message
        );


    });



}