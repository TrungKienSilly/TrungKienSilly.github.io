// assets/script-firebase.js
// App logic using Firebase modular SDK. Handles creating posts (with optional image),
// rendering realtime feed and adding comments (stored under posts/{postId}/comments).

import { db, storage } from './firebase-init.js';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-storage.js';

function createEl(tag, cls){ const e = document.createElement(tag); if(cls) e.className = cls; return e; }

async function uploadImageFile(file){
  if(!file) return null;
  const name = `images/${Date.now()}_${file.name.replace(/\s+/g,'_')}`;
  const r = storageRef(storage, name);
  try{
    console.log('Uploading image to storage:', name);
    const snap = await uploadBytes(r, file);
    const url = await getDownloadURL(snap.ref);
    console.log('Uploaded image URL:', url);
    return url;
  }catch(err){
    console.error('uploadImageFile error:', err);
    alert('Lỗi khi upload ảnh: ' + (err.message || err));
    return null;
  }
}

async function createPost(author, text, file){
  try{
    let imageURL = null;
    if(file) imageURL = await uploadImageFile(file);
    const docRef = await addDoc(collection(db, 'posts'), {
      author: author || 'Khách',
      text: text || '',
      imageURL: imageURL || null,
      createdAt: serverTimestamp()
    });
    console.log('Created post doc:', docRef.id);
    return docRef.id;
  }catch(err){
    console.error('createPost error:', err);
    alert('Lỗi khi tạo bài: ' + (err.message || err));
    throw err;
  }
}

function renderPosts(docs){
  const feedEl = document.getElementById('feed');
  if(!feedEl) return;
  feedEl.innerHTML = '';
  if(docs.length === 0){
    const c = createEl('div','card');
    c.innerHTML = '<p style="color:#606770">Chưa có bài viết nào.</p>';
    feedEl.appendChild(c);
    return;
  }
  docs.forEach(docSnap => {
    const p = docSnap.data();
    const id = docSnap.id;
    const card = createEl('div','post-card');
    const header = createEl('div','post-header');
    const avatar = createEl('div','avatar'); avatar.textContent = (p.author||'A').charAt(0).toUpperCase();
    const meta = createEl('div','post-meta');
    meta.innerHTML = `<strong>${p.author||'Khách'}</strong><div class="when" style="color:var(--muted);font-size:0.85rem">${p.createdAt ? new Date(p.createdAt.seconds*1000).toLocaleString() : ''}</div>`;
    header.appendChild(avatar); header.appendChild(meta);
    card.appendChild(header);
    const body = createEl('div','post-body');
    body.innerHTML = `<div>${(p.text||'').replace(/\n/g,'<br>')}</div>`;
    if(p.imageURL){ const img = createEl('img'); img.src = p.imageURL; img.style.maxWidth='100%'; img.style.marginTop='8px'; body.appendChild(img); }
    card.appendChild(body);

    const actions = createEl('div','post-actions');
    const btnToggle = createEl('button'); btnToggle.textContent = 'Bình luận';
    actions.appendChild(btnToggle);
    card.appendChild(actions);

    const commentsBox = createEl('div','post-comments'); commentsBox.style.display='none';
    commentsBox.innerHTML = `<ul class="comment-list"></ul>
      <form class="comment-form">
        <input name="name" placeholder="Tên (hoặc để trống)"/>
        <textarea name="text" rows="2" placeholder="Viết bình luận..."></textarea>
        <button type="submit">Gửi</button>
      </form>`;
    card.appendChild(commentsBox);

    btnToggle.addEventListener('click', ()=>{
      commentsBox.style.display = commentsBox.style.display === 'none' ? 'block' : 'none';
      // load comments realtime when opened
      if(commentsBox.style.display === 'block') {
        startCommentsListener(id, commentsBox.querySelector('.comment-list'));
      }
    });

    const form = commentsBox.querySelector('.comment-form');
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const name = form.querySelector('input[name="name"]').value || 'Khách';
      const text = form.querySelector('textarea[name="text"]').value || '';
      if(!text.trim()) return;
      await addDoc(collection(db, 'posts', id, 'comments'), {
        name, text, createdAt: serverTimestamp()
      });
      form.querySelector('textarea[name="text"]').value = '';
    });

    feedEl.appendChild(card);
  });
}

function startCommentsListener(postId, ulEl){
  const { query: qf, orderBy: ob, collection: coll } = { query, orderBy, collection };
  // dynamically import functions to avoid duplicate bindings (firestore functions already imported at top)
  import('https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js').then(fs=>{
    const q = fs.query(fs.collection(db, 'posts', postId, 'comments'), fs.orderBy('createdAt','asc'));
    fs.onSnapshot(q, snapshot=>{
      ulEl.innerHTML = '';
      if(snapshot.empty){ ulEl.innerHTML = '<li style="color:var(--muted)">Chưa có bình luận.</li>'; return; }
      snapshot.forEach(d=>{
        const c = d.data();
        const li = createEl('li','comment');
        li.innerHTML = `<div class="who">${c.name||'Khách'}</div><div class="when">${c.createdAt ? new Date(c.createdAt.seconds*1000).toLocaleString() : ''}</div><div class="text">${c.text}</div>`;
        ulEl.appendChild(li);
      });
    });
  });
}

function startFeedListener(){
  const q = query(collection(db,'posts'), orderBy('createdAt','desc'));
  onSnapshot(q, snapshot=>{
    renderPosts(snapshot.docs);
  });
}

function hookComposer(){
  const composer = document.querySelector('.composer');
  if(!composer) return;
  const postBtn = document.getElementById('postBtn');
  const postText = document.getElementById('postText');
  const authorName = document.getElementById('authorName');
  const fileInput = document.createElement('input'); fileInput.type='file'; fileInput.accept='image/*'; fileInput.style.marginTop='8px';
  composer.querySelector('.composer-actions').prepend(fileInput);
  postBtn.addEventListener('click', async ()=>{
    const text = postText.value.trim();
    if(!text && !fileInput.files.length) return;
    const author = authorName.value.trim() || 'Khách';
    const file = fileInput.files[0] || null;
    await createPost(author, text, file);
    postText.value = ''; fileInput.value = '';
  });
}

// initialize
startFeedListener();
hookComposer();
