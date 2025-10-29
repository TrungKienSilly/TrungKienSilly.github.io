// assets/auth-ui.js
// Simple auth UI for signup/login using Firebase Auth (modular SDK)
import { auth } from './firebase-init.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  FacebookAuthProvider,
  signInWithPopup
} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js';

function $(sel){ return document.querySelector(sel); }

function showError(el, msg){ if(!el) return; el.textContent = msg || ''; }

async function handleSignup(e){
  e.preventDefault();
  const email = $('#signupEmail').value.trim();
  const pass = $('#signupPassword').value;
  const name = $('#signupName').value.trim();
  const errEl = $('#signupError');
  showError(errEl, '');
  try{
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if(name) await updateProfile(cred.user, { displayName: name });
    // redirect to home
    location.href = '/';
  }catch(e){
    console.error('signup failed', e);
    showError(errEl, e.message || 'Đăng ký thất bại');
  }
}

async function handleLogin(e){
  e.preventDefault();
  const email = $('#loginEmail').value.trim();
  const pass = $('#loginPassword').value;
  const errEl = $('#loginError');
  showError(errEl, '');
  try{
    await signInWithEmailAndPassword(auth, email, pass);
    location.href = '/';
  }catch(e){
    console.error('login failed', e);
    showError(errEl, e.message || 'Đăng nhập thất bại');
  }
}

async function handleFbLogin(e){
  const errEl = $('#loginError'); showError(errEl,'');
  try{
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider);
    location.href = '/';
  }catch(e){
    console.error('fb login failed', e);
    showError(errEl, e.message || 'Đăng nhập Facebook thất bại');
  }
}

// show basic auth state and wire up forms
document.addEventListener('DOMContentLoaded', ()=>{
  // redirect if already signed in
  if(auth && auth.currentUser){
    // if user is on login or signup page, send to home
    if(location.pathname.endsWith('/login.html') || location.pathname.endsWith('/signup.html')){
      location.href = '/';
      return;
    }
  }

  const signupForm = $('#signupForm');
  const loginForm = $('#loginForm');
  const fbBtn = $('#fbLoginBtn');

  if(signupForm) signupForm.addEventListener('submit', handleSignup);
  if(loginForm) loginForm.addEventListener('submit', handleLogin);
  if(fbBtn) fbBtn.addEventListener('click', handleFbLogin);

  // optional: show a small UI indicator if signed in
  onAuthStateChanged(auth, user => {
    if(user){
      console.log('Auth: signed in', user.uid, user.displayName);
    } else {
      console.log('Auth: not signed in');
    }
  });
});
