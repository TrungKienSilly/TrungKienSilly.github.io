// assets/firebase-init.js
// ES module init for Firebase (modular SDK). Paste your Firebase config here.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
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
// Optional: sign in anonymously so users can write (for dev).
// Previously we automatically signed in anonymously for convenience during development:
//   signInAnonymously(auth).catch((e)=>{ console.warn('Anonymous sign-in failed:', e.message); });
// To require explicit user sign-in (Google / Email / Facebook), we disable automatic anonymous
// sign-in here. If you want to re-enable for development, uncomment the line below and enable
// Anonymous provider in Firebase Console > Authentication > Sign-in method.
// signInAnonymously(auth).catch((e)=>{ console.warn('Anonymous sign-in failed:', e.message); });
console.log('Anonymous sign-in is disabled by default. Users must sign in explicitly.');

// Log auth state for debugging (shows uid or null)
onAuthStateChanged(auth, (user)=>{
  if(user){
    console.log('Firebase auth state: signed in, uid=', user.uid);
  } else {
    console.log('Firebase auth state: NOT signed in');
  }
});

// Ensure a user document exists in `users/{uid}` with a default role='user'.
// This is a lightweight approach for role management in a frontend-only project.
async function ensureUserDoc(user){
  if(!user) return;
  try{
    const uref = doc(db, 'users', user.uid);
    const snap = await getDoc(uref);
    if(!snap.exists()){
      await setDoc(uref, {
        uid: user.uid,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        role: 'user',
        createdAt: serverTimestamp()
      });
      console.log('Created users doc for', user.uid);
    } else {
      // update basic profile info (but don't overwrite role)
      const data = snap.data();
      const patch = {};
      if(!data.displayName && user.displayName) patch.displayName = user.displayName;
      if(!data.photoURL && user.photoURL) patch.photoURL = user.photoURL;
      if(Object.keys(patch).length) await setDoc(uref, patch, { merge: true });
    }
  }catch(e){
    console.warn('ensureUserDoc error', e);
  }
}

// Keep user doc in sync on auth changes
onAuthStateChanged(auth, (user)=>{
  if(user){
    ensureUserDoc(user);
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
