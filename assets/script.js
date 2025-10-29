// Client-side posts + comments system using localStorage.
// - Posts stored under key 'feed_posts' as array of {id, author, text, time, comments:[]}
// - Each comment: {name, text, time}

document.addEventListener('DOMContentLoaded', function(){
  const feedEl = document.getElementById('feed');
  const postBtn = document.getElementById('postBtn');
  const postText = document.getElementById('postText');
  const authorName = document.getElementById('authorName');

  const POSTS_KEY = 'feed_posts_v1';

  function loadPosts(){
    try{ return JSON.parse(localStorage.getItem(POSTS_KEY) || '[]') }catch(e){ return [] }
  }
  function savePosts(list){ try{ localStorage.setItem(POSTS_KEY, JSON.stringify(list)) }catch(e){ console.error(e) } }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];
    });
  }

  function render(){
    const posts = loadPosts();
    if(!feedEl) return; // nothing to render on pages without a feed
    feedEl.innerHTML = '';
    if(posts.length === 0){
      feedEl.innerHTML = '<div class="card"><p style="color:var(--muted)">Chưa có bài viết nào. Hãy đăng bài đầu tiên!</p></div>';
      return;
    }
    posts.forEach(p => {
      const card = document.createElement('div');
      card.className = 'post-card';
      card.dataset.postId = p.id;
      card.innerHTML = '<div class="post-header">'
        +'<div class="avatar">'+ escapeHtml((p.author||'A').charAt(0).toUpperCase()) +'</div>'
        +'<div class="post-meta"><strong>'+ escapeHtml(p.author || 'Khách') +'</strong><div class="when" style="color:var(--muted);font-size:0.85rem">'+ escapeHtml(p.time) +'</div></div>'
        +'</div>'
        +'<div class="post-body">'+ escapeHtml(p.text).replace(/\n/g,'<br>') +'</div>'
        +'<div class="post-actions">'
          +'<button data-action="toggle-comments">Bình luận ('+ (p.comments? p.comments.length:0) +')</button>'
        +'</div>'
        +'<div class="post-comments" style="margin-top:10px;display:none">'
          +'<ul class="comment-list"></ul>'
          +'<form class="comment-form">'
            +'<input name="name" placeholder="Tên (hoặc để trống)" />'
            +'<textarea name="text" rows="2" placeholder="Viết bình luận..."></textarea>'
            +'<button type="submit">Gửi</button>'
          +'</form>'
        +'</div>';

      feedEl.appendChild(card);

      // render comments inside
      const commentsContainer = card.querySelector('.post-comments');
      const commentList = commentsContainer.querySelector('.comment-list');
      const form = commentsContainer.querySelector('.comment-form');
      const nameIn = form.querySelector('input[name="name"]');
      const textIn = form.querySelector('textarea[name="text"]');

      function renderComments(){
        commentList.innerHTML = '';
        const arr = p.comments || [];
        if(arr.length === 0){
          commentList.innerHTML = '<p style="color:var(--muted)">Chưa có bình luận.</p>';
          return;
        }
        arr.forEach(c => {
          const li = document.createElement('li');
          li.className = 'comment';
          li.innerHTML = '<div class="who">'+ escapeHtml(c.name||'Khách') +'</div>'
            +'<div class="when">'+ escapeHtml(c.time) +'</div>'
            +'<div class="text">'+ escapeHtml(c.text) +'</div>';
          commentList.appendChild(li);
        });
      }
      renderComments();

      // actions
      card.querySelector('[data-action="toggle-comments"]').addEventListener('click', function(){
        const visible = commentsContainer.style.display !== 'none';
        commentsContainer.style.display = visible ? 'none' : 'block';
      });

      form.addEventListener('submit', function(e){
        e.preventDefault();
        const name = (nameIn.value || 'Khách').trim();
        const text = (textIn.value || '').trim();
        if(!text) return;
        const now = new Date();
        const entry = {name, text, time: now.toLocaleString()};
        p.comments = p.comments || [];
        p.comments.push(entry);
        // save globally
        const all = loadPosts();
        const idx = all.findIndex(x => x.id === p.id);
        if(idx !== -1){ all[idx] = p; savePosts(all); }
        nameIn.value = name; textIn.value = '';
        render();
      });
    });
  }

  // Hook up composer (only if composer elements exist on the page)
  if(postBtn){
    postBtn.addEventListener('click', function(){
      const text = ((postText && postText.value) || '').trim();
      const author = ((authorName && authorName.value) || 'Khách').trim();
      if(!text) return;
      const all = loadPosts();
      const now = new Date();
      const id = 'p_' + Date.now();
      const entry = {id, author, text, time: now.toLocaleString(), comments: []};
      all.unshift(entry);
      savePosts(all);
      if(postText) postText.value = '';
      render();
    });
  }

  // initial render
  render();

  // Optional: pre-seed with the sample post if feed empty
  (function seed(){
    const all = loadPosts();
    if(all.length === 0){
      const now = new Date();
      const sample = {
        id: 'sample_post1',
        author: 'Admin',
        text: 'Hướng dẫn bắt đầu cho tân thủ FC Online — xem bài đầy đủ ở Posts.',
        time: now.toLocaleString(),
        comments: []
      };
      all.push(sample);
      savePosts(all);
      render();
    }
  })();
});
