// assets/script-firebase.js
// App logic using Firebase modular SDK. Handles creating posts (with optional image),
// rendering realtime feed and adding comments (stored under posts/{postId}/comments).

import { db, storage, auth } from './firebase-init.js';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  limit
} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-storage.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js';

// quick runtime indicator
console.log('script-firebase.js loaded');

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
  // require authenticated user to create posts
  if(!auth || !auth.currentUser){
    alert('Bạn phải đăng nhập để đăng bài.');
    throw new Error('not-authenticated');
  }
  try{
    let imageURL = null;
    if(file) imageURL = await uploadImageFile(file);
    const authorName = (auth.currentUser.displayName) ? auth.currentUser.displayName : (author || 'Khách');
    const authorPhoto = auth.currentUser.photoURL || null;
    const docRef = await addDoc(collection(db, 'posts'), {
      author: authorName,
      authorUid: auth.currentUser.uid,
      authorPhoto: authorPhoto,
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
    // author avatar: image if available, otherwise initial
    let avatar;
    if(p.authorPhoto){
      avatar = createEl('div','avatar');
      const img = document.createElement('img');
      img.src = p.authorPhoto;
      img.alt = p.author || 'avatar';
      img.style.width = '100%'; img.style.height = '100%'; img.style.objectFit = 'cover'; img.style.borderRadius = '50%';
      avatar.appendChild(img);
    } else {
      avatar = createEl('div','avatar'); avatar.textContent = (p.author||'A').charAt(0).toUpperCase();
    }
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

    const commentsBox = createEl('div','post-comments'); commentsBox.style.display='block';
    // Comment form: we don't allow editing name — use signed-in user's displayName
    commentsBox.innerHTML = `<ul class="comment-list"></ul>
      <form class="comment-form">
        <textarea name="text" rows="2" placeholder="Viết bình luận..."></textarea>
        <button type="submit">Gửi</button>
      </form>`;
    card.appendChild(commentsBox);

    // show 2 newest comments preview immediately; add "Xem thêm" if more exist
    const ul = commentsBox.querySelector('.comment-list');
    const showMoreBtn = createEl('button','show-more-comments');
    showMoreBtn.textContent = 'Xem thêm bình luận';
    showMoreBtn.style.marginTop = '8px';
    showMoreBtn.style.display = 'none';
    showMoreBtn.addEventListener('click', ()=>{
      // attach full realtime listener and hide this button
      startCommentsListener(id, ul);
      showMoreBtn.style.display = 'none';
    });
    card.appendChild(showMoreBtn);
    // async preview (don't await here so renderPosts stays sync)
    loadCommentsPreview(id, ul, showMoreBtn);

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
      if(!auth || !auth.currentUser){
        alert('Bạn phải đăng nhập để bình luận.');
        return;
      }
      const name = auth.currentUser.displayName || 'Khách';
      const text = form.querySelector('textarea[name="text"]').value || '';
      if(!text.trim()) return;
      await addDoc(collection(db, 'posts', id, 'comments'), {
        name,
        uid: auth.currentUser.uid,
        text,
        photoURL: auth.currentUser.photoURL || null,
        createdAt: serverTimestamp()
      });
      form.querySelector('textarea[name="text"]').value = '';
    });

    feedEl.appendChild(card);
  });
}

function startCommentsListener(postId, ulEl){
  // attach realtime listener for all comments (ascending chronological)
  ulEl.innerHTML = '';
  const q = query(collection(db, 'posts', postId, 'comments'), orderBy('createdAt','asc'));
  onSnapshot(q, snapshot=>{
    ulEl.innerHTML = '';
    if(snapshot.empty){ ulEl.innerHTML = '<li style="color:var(--muted)">Chưa có bình luận.</li>'; return; }
    snapshot.forEach(d=>{
      const c = d.data();
      const li = createEl('li','comment');
      // avatar: image if provided, otherwise initial with grass gradient
      const avatarHtml = c.photoURL ?
        `<div style="width:36px;height:36px;border-radius:50%;overflow:hidden;flex-shrink:0;margin-right:8px"><img src="${c.photoURL}" style="width:100%;height:100%;object-fit:cover"/></div>` :
        `<div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(180deg,var(--grass-1),var(--grass-2));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;margin-right:8px">${(c.name||'K').charAt(0).toUpperCase()}</div>`;
      li.innerHTML = `<div style="display:flex;gap:8px;align-items:flex-start">${avatarHtml}<div><div class=\"who\">${c.name||'Khách'}</div><div class=\"when\">${c.createdAt ? new Date(c.createdAt.seconds*1000).toLocaleString() : ''}</div><div class=\"text\" style=\"margin-top:6px\">${c.text}</div></div></div>`;
      ulEl.appendChild(li);
    });
  });
}

// load 2 newest comments as a preview (descending) and show a "show more" button if >2
async function loadCommentsPreview(postId, ulEl, showMoreBtn){
  ulEl.innerHTML = '';
  try{
    const q = query(collection(db, 'posts', postId, 'comments'), orderBy('createdAt','desc'), limit(3));
    const snap = await getDocs(q);
    if(snap.empty){ ulEl.innerHTML = '<li style="color:var(--muted)">Chưa có bình luận.</li>'; if(showMoreBtn) showMoreBtn.style.display='none'; return; }
    const docs = snap.docs;
    const more = docs.length > 2;
    // docs are newest-first; render up to 2 newest, preserving newest-first order
    const toRender = docs.slice(0,2);
    toRender.forEach(d=>{
      const c = d.data();
      const li = createEl('li','comment');
      const avatarHtml = c.photoURL ?
        `<div style="width:36px;height:36px;border-radius:50%;overflow:hidden;flex-shrink:0;margin-right:8px"><img src="${c.photoURL}" style="width:100%;height:100%;object-fit:cover"/></div>` :
        `<div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(180deg,var(--grass-1),var(--grass-2));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;margin-right:8px">${(c.name||'K').charAt(0).toUpperCase()}</div>`;
      li.innerHTML = `<div style="display:flex;gap:8px;align-items:flex-start">${avatarHtml}<div><div class=\"who\">${c.name||'Khách'}</div><div class=\"when\">${c.createdAt ? new Date(c.createdAt.seconds*1000).toLocaleString() : ''}</div><div class=\"text\" style=\"margin-top:6px\">${c.text}</div></div></div>`;
      ulEl.appendChild(li);
    });
    if(showMoreBtn) showMoreBtn.style.display = more ? '' : 'none';
  }catch(e){
    console.error('loadCommentsPreview error', e);
    ulEl.innerHTML = '<li style="color:var(--muted)">Không thể tải bình luận.</li>';
    if(showMoreBtn) showMoreBtn.style.display='none';
  }
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
  const composerActions = composer.querySelector('.composer-actions');
  if(composerActions) composerActions.prepend(fileInput);
  if(postBtn){
    postBtn.addEventListener('click', async ()=>{
      const text = postText ? postText.value.trim() : '';
      if(!text && !(fileInput && fileInput.files && fileInput.files.length)) return;
      const author = authorName ? (authorName.value.trim() || 'Khách') : 'Khách';
      const file = fileInput.files ? fileInput.files[0] : null;
      try{
        await createPost(author, text, file);
        if(postText) postText.value = ''; if(fileInput) fileInput.value = '';
      }catch(e){
        // createPost already alerts; no further action
      }
    });
  }

  // update composer UI depending on auth state
  function updateComposerUI(user){
    const loginHint = composer.querySelector('.login-hint');
    if(!loginHint){
      const el = document.createElement('div'); el.className='login-hint'; el.style.marginTop='8px';
      el.innerHTML = '<em>Vui lòng đăng nhập để đăng bài hoặc bình luận.</em>'; composer.appendChild(el);
    }
    if(user){
      const hint = composer.querySelector('.login-hint'); if(hint) hint.style.display='none';
      if(postBtn) postBtn.disabled = false;
      if(authorName){
        if(user.displayName) authorName.value = user.displayName;
        try{ authorName.readOnly = true; authorName.disabled = true; }catch(e){}
      }
      // show user photo in composer avatar if present
      const cav = composer.querySelector('.avatar');
      if(cav){
        if(user.photoURL){
          cav.innerHTML = '';
          const img = document.createElement('img'); img.src = user.photoURL; img.alt = user.displayName || 'avatar';
          img.style.width='100%'; img.style.height='100%'; img.style.objectFit='cover'; img.style.borderRadius='50%';
          cav.appendChild(img);
        } else {
          cav.textContent = (user.displayName||'U').charAt(0).toUpperCase();
        }
      }
    } else {
      const hint = composer.querySelector('.login-hint'); if(hint) hint.style.display='block';
      if(postBtn) postBtn.disabled = true;
      if(authorName){ authorName.value = ''; try{ authorName.readOnly = false; authorName.disabled = false; }catch(e){} }
    }
  }

  // listen auth state
  onAuthStateChanged(auth, (user)=>{
    updateComposerUI(user);
  });
}

// initialize
startFeedListener();
hookComposer();

