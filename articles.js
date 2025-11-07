// Articles page JavaScript
const articlesGrid = document.getElementById('articlesGrid');
const articleSearch = document.getElementById('articleSearch');
const categoryFilter = document.getElementById('categoryFilter');
const themeToggle = document.getElementById('themeToggle');
const socialToggle = document.getElementById('socialToggle');
const socialMenu = document.getElementById('socialMenu');
const languageToggle = document.getElementById('languageToggle');
const languageMenu = document.getElementById('languageMenu');
const currentLangFlag = document.getElementById('currentLangFlag');
const currentLangCode = document.getElementById('currentLangCode');
const backHomeBtn = document.getElementById('backHomeBtn');
const articleModal = document.getElementById('articleModal');
const articleModalClose = document.querySelector('.article-modal-close');
const yearEl = document.getElementById('year');

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

// Back to home
backHomeBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Language selector
function updateLanguageDisplay(langCode) {
  const lang = translations[langCode];
  if (lang) {
    currentLangFlag.textContent = lang.flag;
    currentLangCode.textContent = langCode.toUpperCase();
  }
}

// Initialize language on load
const savedLanguage = getCurrentLanguage();
updateLanguageDisplay(savedLanguage);
applyTranslations();

languageToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  languageMenu.classList.toggle('active');
  socialMenu.classList.remove('active');
});

// Language option click
document.querySelectorAll('.language-option').forEach(option => {
  option.addEventListener('click', (e) => {
    e.stopPropagation();
    const langCode = option.getAttribute('data-lang');
    setCurrentLanguage(langCode);
    updateLanguageDisplay(langCode);
    applyTranslations();
    
    // Update active state
    document.querySelectorAll('.language-option').forEach(opt => {
      opt.classList.remove('active');
    });
    option.classList.add('active');
    
    languageMenu.classList.remove('active');
    
    // Reload articles with new language
    loadArticles();
  });
});

// Set active language option on load
document.querySelectorAll('.language-option').forEach(option => {
  if (option.getAttribute('data-lang') === savedLanguage) {
    option.classList.add('active');
  }
});

// Social menu toggle
socialToggle.addEventListener('click', (e)=>{
  e.stopPropagation();
  socialMenu.classList.toggle('active');
  languageMenu.classList.remove('active');
});

// Close menus when clicking outside
document.addEventListener('click', (e)=>{
  if(!socialMenu.contains(e.target) && e.target !== socialToggle){
    socialMenu.classList.remove('active');
  }
  if(!languageMenu.contains(e.target) && e.target !== languageToggle){
    languageMenu.classList.remove('active');
  }
});

// Get articles for current language
function getArticlesForLanguage() {
  const lang = getCurrentLanguage();
  // If no articles for this language, fallback to English, then Vietnamese
  return articlesData[lang] || articlesData['en'] || articlesData['vi'] || [];
}

// Load articles
let allArticles = [];

function loadArticles() {
  allArticles = getArticlesForLanguage();
  
  // Populate category filter
  const categories = [...new Set(allArticles.map(a => a.category))];
  categoryFilter.innerHTML = `<option value="" data-i18n="allCategories">${t('allCategories')}</option>`;
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
  
  renderArticles(allArticles);
}

// Render articles
function renderArticles(articles) {
  if (!articles || articles.length === 0) {
    articlesGrid.innerHTML = `<p class="loading-text" data-i18n="noArticles">${t('noArticles')}</p>`;
    return;
  }
  
  articlesGrid.innerHTML = '';
  
  articles.forEach(article => {
    const card = createArticleCard(article);
    articlesGrid.appendChild(card);
  });
}

// Create article card
function createArticleCard(article) {
  const card = document.createElement('article');
  card.className = 'article-card';
  card.addEventListener('click', () => openArticleModal(article));
  
  // Image
  const img = document.createElement('img');
  img.src = article.image;
  img.alt = article.title;
  img.className = 'article-card-image';
  img.loading = 'lazy';
  
  // Content
  const content = document.createElement('div');
  content.className = 'article-card-content';
  
  // Meta (date and read time)
  const meta = document.createElement('div');
  meta.className = 'article-card-meta';
  
  const date = document.createElement('span');
  date.className = 'article-card-date';
  date.innerHTML = `📅 ${formatDate(article.date)}`;
  
  const readTime = document.createElement('span');
  readTime.className = 'article-card-read-time';
  readTime.innerHTML = `⏱️ ${article.readTime}`;
  
  meta.appendChild(date);
  meta.appendChild(readTime);
  
  // Title
  const title = document.createElement('h3');
  title.className = 'article-card-title';
  title.textContent = article.title;
  
  // Excerpt
  const excerpt = document.createElement('p');
  excerpt.className = 'article-card-excerpt';
  excerpt.textContent = article.excerpt;
  
  // Tags
  const tags = document.createElement('div');
  tags.className = 'article-card-tags';
  article.tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.className = 'article-tag';
    tagEl.textContent = tag;
    tags.appendChild(tagEl);
  });
  
  content.appendChild(meta);
  content.appendChild(title);
  content.appendChild(excerpt);
  content.appendChild(tags);
  
  card.appendChild(img);
  card.appendChild(content);
  
  return card;
}

// Format date
function formatDate(dateString) {
  const lang = getCurrentLanguage();
  const date = new Date(dateString);
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
  switch(lang) {
    case 'vi':
      return date.toLocaleDateString('vi-VN', options);
    case 'en':
      return date.toLocaleDateString('en-US', options);
    case 'zh':
      return date.toLocaleDateString('zh-CN', options);
    case 'th':
      return date.toLocaleDateString('th-TH', options);
    case 'ru':
      return date.toLocaleDateString('ru-RU', options);
    default:
      return date.toLocaleDateString('vi-VN', options);
  }
}

// Open article modal
function openArticleModal(article) {
  const modalBody = document.getElementById('articleModalBody');
  
  modalBody.innerHTML = `
    ${article.image ? `<img src="${article.image}" alt="${article.title}" class="article-modal-image">` : ''}
    <div class="article-modal-header">
      <h1 class="article-modal-title">${article.title}</h1>
      <div class="article-modal-meta">
        <span>📅 ${formatDate(article.date)}</span>
        <span>⏱️ ${article.readTime}</span>
        <span>📁 ${article.category}</span>
      </div>
    </div>
    <div class="article-modal-content-body">
      ${article.content}
    </div>
  `;
  
  articleModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close article modal
function closeArticleModal() {
  articleModal.classList.remove('active');
  document.body.style.overflow = '';
}

articleModalClose.addEventListener('click', closeArticleModal);

articleModal.addEventListener('click', (e) => {
  if (e.target === articleModal) {
    closeArticleModal();
  }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && articleModal.classList.contains('active')) {
    closeArticleModal();
  }
});

// Search and filter
function applyFilters() {
  const searchQuery = articleSearch.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;
  
  const filtered = allArticles.filter(article => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery) ||
      article.excerpt.toLowerCase().includes(searchQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery));
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  renderArticles(filtered);
}

articleSearch.addEventListener('input', debounce(applyFilters, 300));
categoryFilter.addEventListener('change', applyFilters);

function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  loadArticles();
  applyTranslations();
});
