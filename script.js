const projectsEl = document.getElementById('projects');
const searchEl = document.getElementById('search');
const tagFilterEl = document.getElementById('tagFilter');
const yearEl = document.getElementById('year');
const themeToggle = document.getElementById('themeToggle');
const socialToggle = document.getElementById('socialToggle');
const socialMenu = document.getElementById('socialMenu');

yearEl.textContent = new Date().getFullYear();

// Theme toggle
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'dark'){
  document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Social menu toggle
socialToggle.addEventListener('click', (e)=>{
  e.stopPropagation();
  socialMenu.classList.toggle('active');
});

// Close social menu when clicking outside
document.addEventListener('click', (e)=>{
  if(!socialMenu.contains(e.target) && e.target !== socialToggle){
    socialMenu.classList.remove('active');
  }
});

let projects = [];

async function loadProjects(){
  try{
    const res = await fetch('projects.json');
    projects = await res.json();
    populateTagFilter();
    renderProjects(projects);
  }catch(e){
    projectsEl.innerHTML = '<p class="desc">Không thể tải danh sách project.</p>';
    console.error(e);
  }
}

function populateTagFilter(){
  const tags = new Set();
  projects.forEach(p=> (p.tags||[]).forEach(t=>tags.add(t)));
  Array.from(tags).sort().forEach(tag=>{
    const opt = document.createElement('option');
    opt.value = tag; opt.textContent = tag; tagFilterEl.appendChild(opt);
  })
}

function renderProjects(list){
  if(!list.length){ projectsEl.innerHTML = '<p class="desc">Chưa có project nào khớp.</p>'; return }
  projectsEl.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    const title = document.createElement('h3'); title.className='title'; title.textContent = p.name;
    const desc = document.createElement('div'); desc.className='desc'; desc.textContent = p.description || '';
    const meta = document.createElement('div'); meta.className = 'meta';
    (p.tags||[]).slice(0,6).forEach(t=>{ const sp = document.createElement('span'); sp.className='tag'; sp.textContent=t; meta.appendChild(sp)});
    const links = document.createElement('div'); links.className='links';
    // Chỉ hiện "Demo" cho Warmguys, còn lại hiện "More info"
    if(p.demo) {
      const linkText = p.name === 'Warmguys' ? 'Demo' : 'More info';
      links.appendChild(linkEl(linkText, p.demo));
    }
    if(p.repo) links.appendChild(linkEl('Repo',p.repo));

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(meta);
    card.appendChild(links);
    projectsEl.appendChild(card);
  })
}

function linkEl(text, href){
  const a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel='noopener'; a.textContent = text; return a;
}

function applyFilters(){
  const q = (searchEl.value||'').trim().toLowerCase();
  const tag = tagFilterEl.value;
  const filtered = projects.filter(p=>{
    const text = (p.name + ' ' + (p.description||'') + ' ' + (p.tags||[]).join(' ')).toLowerCase();
    if(tag && !(p.tags||[]).includes(tag)) return false;
    if(q && !text.includes(q)) return false;
    return true;
  })
  renderProjects(filtered);
}

searchEl.addEventListener('input', debounce(applyFilters, 200));
tagFilterEl.addEventListener('change', applyFilters);

function debounce(fn, wait){ let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), wait) }}

loadProjects();

// Image Lightbox functionality
const lightbox = document.getElementById('imageLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');

// Add click event to all footer images
document.addEventListener('DOMContentLoaded', ()=>{
  const footerImages = document.querySelectorAll('.footer-image img');
  footerImages.forEach(img => {
    img.addEventListener('click', ()=>{
      lightbox.classList.add('active');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });
});

// Close lightbox
function closeLightbox(){
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e)=>{
  if(e.target === lightbox){ // Click outside image
    closeLightbox();
  }
});

// Close with Escape key
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && lightbox.classList.contains('active')){
    closeLightbox();
  }
});