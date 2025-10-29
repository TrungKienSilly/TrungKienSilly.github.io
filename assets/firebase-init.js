// assets/firebase-init.js
// ES module init for Firebase (modular SDK). Paste your Firebase config here.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-storage.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdg0ObsfyA0ir_ca7hHp0FjSJrq-6N5g4",
  authDomain: "fconlineclanout.firebaseapp.com",
  projectId: "fconlineclanout",
  storageBucket: "fconlineclanout.firebasestorage.app",
  messagingSenderId: "9366390105",
  appId: "1:9366390105:web:fece5b2403762b71ee3848",
  measurementId: "G-GECLVJKCP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Optional: sign in anonymously so users can write (for dev). Enable Anonymous in Firebase Auth.
signInAnonymously(auth).catch((e)=>{
  console.warn('Anonymous sign-in failed:', e.message);
});

// Log auth state for debugging (shows uid or null)
onAuthStateChanged(auth, (user)=>{
  if(user){
    console.log('Firebase auth state: signed in, uid=', user.uid);
  } else {
    console.log('Firebase auth state: NOT signed in');
  }
});

// Export app for advanced debugging if needed
export const firebaseApp = app;

// Expose debug helpers on window for easy console inspection during development
if(typeof window !== 'undefined'){
  window.firebaseDebug = {
    app: app,
    auth: auth,
    db: db,
    storage: storage
  };
  console.log('firebaseDebug available on window.firebaseDebug');
}
