const projectsEl = document.getElementById('projects');
const searchEl = document.getElementById('search');
const tagFilterEl = document.getElementById('tagFilter');
const yearEl = document.getElementById('year');
const themeToggle = document.getElementById('themeToggle');
const socialToggle = document.getElementById('socialToggle');
const socialMenu = document.getElementById('socialMenu');
const articlesBtn = document.getElementById('articlesBtn');
const languageToggle = document.getElementById('languageToggle');
const languageMenu = document.getElementById('languageMenu');
const currentLangFlag = document.getElementById('currentLangFlag');
const currentLangCode = document.getElementById('currentLangCode');

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

// Articles button click
articlesBtn.addEventListener('click', () => {
  showNotification(t('articlesDev'), 'success');
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
    
    // Refresh projects and reviews to update translations
    renderProjects(projects);
    loadReviews();
    populateReviewProjects();
    
    showNotification(`Language changed to ${translations[langCode].name}`, 'success');
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
});

// Close social menu when clicking outside
document.addEventListener('click', (e)=>{
  if(!socialMenu.contains(e.target) && e.target !== socialToggle){
    socialMenu.classList.remove('active');
  }
  if(!languageMenu.contains(e.target) && e.target !== languageToggle){
    languageMenu.classList.remove('active');
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
  if(!list.length){ 
    projectsEl.innerHTML = `<p class="desc" data-i18n="noProjects">${t('noProjects')}</p>`; 
    return 
  }
  projectsEl.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    const title = document.createElement('h3'); title.className='title'; title.textContent = p.name;
    
    // Get translated description
    const currentLang = getCurrentLanguage();
    const translatedDesc = translations[currentLang]?.projectDescriptions?.[p.name];
    const desc = document.createElement('div'); 
    desc.className='desc'; 
    desc.textContent = translatedDesc || p.description || '';
    
    const meta = document.createElement('div'); meta.className = 'meta';
    (p.tags||[]).slice(0,6).forEach(t=>{ const sp = document.createElement('span'); sp.className='tag'; sp.textContent=t; meta.appendChild(sp)});
    const links = document.createElement('div'); links.className='links';
    
    // More info button - opens modal
    const moreInfoBtn = document.createElement('a');
    moreInfoBtn.href = '#';
    moreInfoBtn.textContent = t('moreInfo');
    moreInfoBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      openProjectModal(p);
    });
    links.appendChild(moreInfoBtn);
    
    // Repo link
    if(p.repo) {
      const repoLink = linkEl(t('repo'), p.repo);
      links.appendChild(repoLink);
    }

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
  if(e.key === 'Escape' && projectModal.classList.contains('active')){
    closeProjectModal();
  }
  if(e.key === 'Escape' && reviewFormContainer.style.display !== 'none'){
    closeReviewForm();
  }
});

// ==============================
// REVIEW SECTION FUNCTIONALITY
// ==============================
const openReviewBtn = document.getElementById('openReviewBtn');
const reviewFormContainer = document.getElementById('reviewFormContainer');
const closeReviewFormBtn = document.getElementById('closeReviewForm');
const cancelReviewBtn = document.getElementById('cancelReviewBtn');
const reviewForm = document.getElementById('reviewForm');
const reviewProjectSelect = document.getElementById('reviewProject');
const reviewRatingStars = document.getElementById('reviewRatingStars');
const reviewRatingInput = document.getElementById('reviewRating');
const reviewCommentTextarea = document.getElementById('reviewComment');
const charCountSpan = document.getElementById('charCount');
const submitReviewBtn = document.getElementById('submitReviewBtn');

let selectedReviewRating = 0;

// Populate project dropdown from projects array
function populateReviewProjects() {
  if (!projects || projects.length === 0) {
    setTimeout(populateReviewProjects, 500);
    return;
  }
  
  reviewProjectSelect.innerHTML = `<option value="">${t('projectPlaceholder')}</option>`;
  projects.forEach(project => {
    const option = document.createElement('option');
    option.value = project.name;
    option.textContent = project.name;
    reviewProjectSelect.appendChild(option);
  });
}

// Open review form
openReviewBtn.addEventListener('click', () => {
  reviewFormContainer.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  populateReviewProjects();
});

// Close review form
function closeReviewForm() {
  reviewFormContainer.style.display = 'none';
  document.body.style.overflow = '';
  reviewForm.reset();
  selectedReviewRating = 0;
  updateReviewStarsDisplay();
}

closeReviewFormBtn.addEventListener('click', closeReviewForm);
cancelReviewBtn.addEventListener('click', closeReviewForm);

// Close when clicking outside
reviewFormContainer.addEventListener('click', (e) => {
  if (e.target === reviewFormContainer) {
    closeReviewForm();
  }
});

// Rating stars interaction
reviewRatingStars.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('rating-star')) {
    const value = parseInt(e.target.dataset.value);
    const stars = reviewRatingStars.querySelectorAll('.rating-star');
    stars.forEach((star, index) => {
      if (index < value) {
        star.classList.add('hovered');
      } else {
        star.classList.remove('hovered');
      }
    });
  }
});

reviewRatingStars.addEventListener('mouseout', () => {
  const stars = reviewRatingStars.querySelectorAll('.rating-star');
  stars.forEach(star => star.classList.remove('hovered'));
});

reviewRatingStars.addEventListener('click', (e) => {
  if (e.target.classList.contains('rating-star')) {
    selectedReviewRating = parseInt(e.target.dataset.value);
    reviewRatingInput.value = selectedReviewRating;
    updateReviewStarsDisplay();
  }
});

function updateReviewStarsDisplay() {
  const stars = reviewRatingStars.querySelectorAll('.rating-star');
  stars.forEach((star, index) => {
    if (index < selectedReviewRating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

// Character counter for comment
reviewCommentTextarea.addEventListener('input', () => {
  const length = reviewCommentTextarea.value.length;
  charCountSpan.textContent = length;
});

// Form validation and submission
reviewForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form values
  const reviewerName = document.getElementById('reviewerName').value.trim();
  const reviewerPhone = document.getElementById('reviewerPhone').value.trim();
  const reviewProject = reviewProjectSelect.value;
  const reviewComment = reviewCommentTextarea.value.trim();
  
  // Validate
  if (!reviewerName || reviewerName.length < 2) {
    showNotification(t('validationName'), 'error');
    return;
  }
  
  if (!reviewerPhone || !/^[0-9]{10,11}$/.test(reviewerPhone)) {
    showNotification(t('validationPhone'), 'error');
    return;
  }
  
  if (!reviewProject) {
    showNotification(t('validationProject'), 'error');
    return;
  }
  
  if (selectedReviewRating === 0) {
    showNotification(t('validationRating'), 'error');
    return;
  }
  
  // Show loading state
  submitReviewBtn.disabled = true;
  submitReviewBtn.querySelector('.btn-text').style.display = 'none';
  submitReviewBtn.querySelector('.btn-loading').style.display = 'flex';
  
  // Prepare review data
  const reviewData = {
    reviewerName: reviewerName,
    reviewerPhone: reviewerPhone,
    projectName: reviewProject,
    rating: selectedReviewRating,
    comment: reviewComment || '',
    timestamp: Date.now(),
    userAgent: navigator.userAgent.substring(0, 100)
  };
  
  try {
    // Save to Firebase
    const success = await saveReviewToFirebase(reviewData);
    
    if (success) {
      showNotification(t('successReview'), 'success');
      closeReviewForm();
      // Reload reviews list
      loadReviews();
    } else {
      // Fallback to localStorage if Firebase fails
      saveReviewToLocalStorage(reviewData);
      showNotification(t('savedReview'), 'success');
      closeReviewForm();
      loadReviews();
    }
  } catch (error) {
    console.error('Error submitting review:', error);
    showNotification(t('errorReview'), 'error');
  } finally {
    // Reset loading state
    submitReviewBtn.disabled = false;
    submitReviewBtn.querySelector('.btn-text').style.display = 'inline';
    submitReviewBtn.querySelector('.btn-loading').style.display = 'none';
  }
});

// Save review to localStorage (fallback)
function saveReviewToLocalStorage(reviewData) {
  const reviews = JSON.parse(localStorage.getItem('portfolioReviews') || '[]');
  reviews.unshift(reviewData); // Add to beginning
  // Keep only last 50 reviews
  if (reviews.length > 50) {
    reviews.splice(50);
  }
  localStorage.setItem('portfolioReviews', JSON.stringify(reviews));
}

// Load and display reviews
async function loadReviews() {
  console.log(' loadReviews() called');
  
  // Get reviewsContainer element (in case it wasn't available at script load time)
  const reviewsContainer = document.getElementById('reviewsContainer');
  console.log(' reviewsContainer:', reviewsContainer);
  
  if (!reviewsContainer) {
    console.error('❌ reviewsContainer not found in DOM!');
    return;
  }
  
  reviewsContainer.innerHTML = `<p class="loading-reviews" data-i18n="loadingReviews">${t('loadingReviews')}</p>`;
  
  try {
    let reviews = [];
    
    // Check if Firebase is initialized by checking if database exists
    if (typeof database !== 'undefined' && database) {
      // Try to load from Firebase
      reviews = await getReviewsFromFirebase();
      console.log(' Loaded reviews from Firebase:', reviews);
    }
    
    if (!reviews || reviews.length === 0) {
      // Fallback to localStorage
      reviews = JSON.parse(localStorage.getItem('portfolioReviews') || '[]');
      console.log(' Loaded reviews from localStorage:', reviews);
    }
    
    if (reviews.length === 0) {
      reviewsContainer.innerHTML = `
        <div class="no-reviews">
          <div class="no-reviews-icon">💬</div>
          <p data-i18n="noReviews">${t('noReviews')}</p>
        </div>
      `;
      return;
    }
    
    // Sort by timestamp (newest first)
    reviews.sort((a, b) => b.timestamp - a.timestamp);
    
    // Display reviews (limit to 10 most recent)
    reviewsContainer.innerHTML = '';
    reviews.slice(0, 10).forEach(review => {
      const reviewCard = createReviewCard(review);
      reviewsContainer.appendChild(reviewCard);
    });
    
  } catch (error) {
    console.error('Error loading reviews:', error);
    reviewsContainer.innerHTML = `<p class="loading-reviews" data-i18n="cannotLoadReviews">${t('cannotLoadReviews')}</p>`;
  }
}

// Create review card element
function createReviewCard(review) {
  const card = document.createElement('div');
  card.className = 'review-card';
  
  // Generate stars
  const starsHTML = Array.from({length: 5}, (_, i) => {
    if (i < review.rating) {
      return '<span class="star-filled">★</span>';
    } else {
      return '<span class="star-empty">★</span>';
    }
  }).join('');
  
  // Format date
  const date = new Date(review.timestamp);
  const formattedDate = date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  card.innerHTML = `
    <div class="review-card-header">
      <div class="review-card-info">
        <div class="reviewer-name">${escapeHtml(review.reviewerName)}</div>
        <div class="review-project">📦 ${escapeHtml(review.projectName)}</div>
      </div>
      <div class="review-card-rating">
        ${starsHTML}
      </div>
    </div>
    ${review.comment ? `<p class="review-comment">"${escapeHtml(review.comment)}"</p>` : ''}
    <div class="review-card-footer">
      <span class="review-date">📅 ${formattedDate}</span>
    </div>
  `;
  
  return card;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'error' ? '#dc3545' : 'var(--accent)'};
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 99999;
    animation: notificationSlideDown 0.3s ease;
    max-width: 90%;
    text-align: center;
    font-weight: 600;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'notificationSlideUp 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ==============================
// INITIALIZE ON PAGE LOAD
// ==============================
window.addEventListener('DOMContentLoaded', async () => {
  console.log(' DOMContentLoaded - Initializing...');
  
  // Initialize Firebase first
  const firebaseReady = initFirebase();
  console.log('🔥 Firebase ready:', firebaseReady);
  
  // Wait a bit for Firebase to fully initialize
  if (firebaseReady) {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Then load reviews
  console.log(' Starting to load reviews...');
  loadReviews();
});

// ==============================
// PROJECT MODAL FUNCTIONALITY
// ==============================
const projectModal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modalTitle');
const modalFullDesc = document.getElementById('modalFullDesc');
const modalFeatures = document.getElementById('modalFeatures');
const modalTech = document.getElementById('modalTech');
const modalStatus = document.getElementById('modalStatus');
const modalRepoLink = document.getElementById('modalRepoLink');
const modalDemoLink = document.getElementById('modalDemoLink');

let currentProject = null;

async function openProjectModal(project){
  currentProject = project;
  const details = project.detailedInfo || {};
  
  modalTitle.textContent = project.name;
  modalFullDesc.textContent = details.fullDescription || project.description || '';
  
  // Features
  modalFeatures.innerHTML = '';
  if(details.features && details.features.length){
    details.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      modalFeatures.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = t('updating');
    modalFeatures.appendChild(li);
  }
  
  // Technologies
  modalTech.textContent = details.technologies || t('updating');
  
  // Status
  modalStatus.textContent = details.status || t('inDevelopment');
  
  // Links
  if(project.repo){
    modalRepoLink.href = project.repo;
    modalRepoLink.textContent = t('viewRepo');
    modalRepoLink.style.display = 'inline-block';
  } else {
    modalRepoLink.style.display = 'none';
  }
  
  // Only show Demo button for Warmguys project
  if(project.demo && project.name === 'Warmguys'){
    modalDemoLink.href = project.demo;
    modalDemoLink.textContent = t('viewDemo');
    modalDemoLink.style.display = 'inline-block';
  } else {
    modalDemoLink.style.display = 'none';
  }
  
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal(){
  projectModal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e)=>{
  if(e.target === projectModal){
    closeProjectModal();
  }
});