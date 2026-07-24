import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


import { getDatabase } 
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


import { getAuth } 
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



const firebaseConfig = {

apiKey: "AIzaSyBOF251l8o3VSCHtWvTeUBD2-Ci91UbB4E",

authDomain: "portal-alumni-sekolah.firebaseapp.com",

databaseURL: "https://portal-alumni-sekolah-default-rtdb.asia-southeast1.firebasedatabase.app",

projectId: "portal-alumni-sekolah",

storageBucket: "portal-alumni-sekolah.firebasestorage.app",

messagingSenderId: "877534010407",

appId: "1:877534010407:web:e75f9ebaecfc5bc68c8202"

};



const app = initializeApp(firebaseConfig);


const database = getDatabase(app);


const auth = getAuth(app);



export {
database,
auth
};