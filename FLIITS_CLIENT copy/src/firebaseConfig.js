import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDDVtH7ufU6ybFZ8s_rMjo0JeyI6FLRHgQ",
  authDomain: "fliits.firebaseapp.com",
  projectId: "fliits",
  storageBucket: "fliits.firebasestorage.app",
  messagingSenderId: "508681812684",
  appId: "1:508681812684:web:a720b8339f8df0341f6069",
  measurementId: "G-5FFRVH8MQ5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); 
