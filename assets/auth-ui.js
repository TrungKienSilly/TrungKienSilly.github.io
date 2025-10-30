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
  GoogleAuthProvider,
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

async function handleGoogleLogin(e){
  const errEl = $('#loginError') || $('#signupError'); showError(errEl,'');
  try{
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    location.href = '/';
  }catch(e){
    console.error('google login failed', e);
    // Friendly message for unauthorized-domain during development
    if(e && e.code === 'auth/unauthorized-domain'){
      showError(errEl, 'Lỗi: domain hiện tại chưa được phép cho OAuth. Thêm "localhost" hoặc domain của bạn vào Firebase Console → Authentication → Authorized domains.');
    } else {
      showError(errEl, e.message || 'Đăng nhập Google thất bại');
    }
  }
}

async function handleSignOut(e){
  try{
    await signOut(auth);
    // reload to update UI
    location.href = '/';
  }catch(err){
    console.error('sign out failed', err);
  }
}

function renderUserArea(user){
  const el = document.getElementById('userArea');
  if(!el) return;
  el.innerHTML = '';
  if(user){
    // avatar (photoURL) or initial
    if(user.photoURL){
      const img = document.createElement('img');
      img.src = user.photoURL;
      img.alt = user.displayName || 'avatar';
      img.style.width = '28px'; img.style.height = '28px'; img.style.borderRadius = '50%'; img.style.verticalAlign='middle'; img.style.marginRight='8px';
      el.appendChild(img);
    } else {
      const av = document.createElement('div');
      av.textContent = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
      av.style.display='inline-block'; av.style.width='28px'; av.style.height='28px'; av.style.lineHeight='28px'; av.style.textAlign='center'; av.style.borderRadius='50%'; av.style.background='#666'; av.style.color='#fff'; av.style.marginRight='8px';
      el.appendChild(av);
    }
    const name = document.createElement('span');
    name.textContent = user.displayName || user.email || '';
    name.style.marginRight = '8px';
    el.appendChild(name);
    const outBtn = document.createElement('button');
    outBtn.textContent = 'Đăng xuất';
    outBtn.addEventListener('click', handleSignOut);
    el.appendChild(outBtn);
  } else {
    el.innerHTML = '<a href="login.html">Đăng nhập</a>';
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
  const googleBtn = $('#googleLoginBtn');

  if(signupForm) signupForm.addEventListener('submit', handleSignup);
  if(loginForm) loginForm.addEventListener('submit', handleLogin);
  if(fbBtn) fbBtn.addEventListener('click', handleFbLogin);
  if(googleBtn) googleBtn.addEventListener('click', handleGoogleLogin);

  // optional: show a small UI indicator if signed in
  onAuthStateChanged(auth, user => {
    if(user){
      console.log('Auth: signed in', user.uid, user.displayName);
    } else {
      console.log('Auth: not signed in');
    }
    // update global user area if present on the page
    renderUserArea(user);
  });
});
