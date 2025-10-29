// Simple client-side comment system stored in localStorage per post.
document.addEventListener('DOMContentLoaded', function(){
  const commentsRoot = document.getElementById('comments');
  if(!commentsRoot) return; // nothing to do on pages without comments

  const slug = commentsRoot.dataset.postSlug || 'default';
  const storageKey = 'comments_' + slug;

  function loadComments(){
    try{
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    }catch(e){ return [] }
  }

  function saveComments(list){
    try{ localStorage.setItem(storageKey, JSON.stringify(list)) }catch(e){ console.error(e) }
  }

  function escapeHtml(s){
    return s.replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];
    });
  }

  function render(){
    const list = loadComments();
    const ul = commentsRoot.querySelector('.comment-list');
    ul.innerHTML = '';
    if(list.length === 0){
      ul.innerHTML = '<p style="color:var(--muted)">Chưa có bình luận nào. Hãy là người đầu tiên!</p>';
      return;
    }
    list.forEach(c => {
      const li = document.createElement('li');
      li.className = 'comment';
      li.innerHTML = '<div class="who">'+ escapeHtml(c.name) +'</div>'
        +'<div class="when">'+ escapeHtml(c.time) +'</div>'
        +'<div class="text">'+ escapeHtml(c.text) +'</div>';
      ul.appendChild(li);
    });
  }

  // wire form
  const form = commentsRoot.querySelector('.comment-form');
  const nameIn = commentsRoot.querySelector('input[name="name"]');
  const textIn = commentsRoot.querySelector('textarea[name="text"]');
  const ul = commentsRoot.querySelector('.comment-list');

  render();

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = (nameIn.value || 'Khách').trim();
    const text = (textIn.value || '').trim();
    if(!text) return;
    const list = loadComments();
    const now = new Date();
    const entry = {name, text, time: now.toLocaleString()};
    list.unshift(entry);
    saveComments(list);
    nameIn.value = name; textIn.value = '';
    render();
  });
});
