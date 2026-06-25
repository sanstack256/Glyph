import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDOURaSHJR50k1mZPqNg54VPXLzwyrEiL4",
    authDomain: "glyph-303e8.firebaseapp.com",
    projectId: "glyph-303e8",
    storageBucket: "glyph-303e8.firebasestorage.app",
    messagingSenderId: "1084593043949",
    appId: "1:1084593043949:web:79a032f16e975381fdcfe4",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);