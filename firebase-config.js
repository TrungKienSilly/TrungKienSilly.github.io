const firebaseConfig = {
  apiKey: "AIzaSyA6x0HTHp9jOkDDX_qx1mAaVTtndaCjtVA",
  authDomain: "trungkien-portfolio.firebaseapp.com",
  projectId: "trungkien-portfolio",
  storageBucket: "trungkien-portfolio.firebasestorage.app",
  messagingSenderId: "1007276704259",
  appId: "1:1007276704259:web:6edc78c361e96af445c436",
  measurementId: "G-2ZZ4TN6KZ9",
  databaseURL: "https://trungkien-portfolio-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
let app, database;

function initFirebase() {
  try {
    if (typeof firebase !== 'undefined') {
      app = firebase.initializeApp(firebaseConfig);
      database = firebase.database();
      console.log(' Firebase initialized successfully');
      return true;
    } else {
      console.warn(' Firebase SDK not loaded');
      return false;
    }
  } catch (error) {
    console.error(' Firebase initialization error:', error);
    return false;
  }
}

// ==============================
// REVIEW FUNCTIONS
// ==============================

// Save review to Firebase
async function saveReviewToFirebase(reviewData) {
  if (!database) {
    console.warn('Firebase not initialized, using localStorage fallback');
    return false;
  }

  try {
    // Sanitize phone number (keep only last 4 digits for privacy)
    const sanitizedData = {
      ...reviewData,
      reviewerPhone: '****' + reviewData.reviewerPhone.slice(-4)
    };
    
    // Save to Firebase Realtime Database under 'reviews' node
    await database.ref('reviews').push(sanitizedData);
    console.log(' Review saved to Firebase');
    return true;
  } catch (error) {
    console.error(' Error saving review to Firebase:', error);
    return false;
  }
}

// Get all reviews from Firebase
async function getReviewsFromFirebase(limit = 50) {
  if (!database) {
    console.warn(' Database not initialized in getReviewsFromFirebase');
    return [];
  }

  try {
    console.log(' Fetching reviews from Firebase...');
    // Get reviews ordered by timestamp, limited to most recent
    const snapshot = await database.ref('reviews')
      .orderByChild('timestamp')
      .limitToLast(limit)
      .once('value');
    
    const reviewsData = snapshot.val();
    console.log(' Raw Firebase data:', reviewsData);
    
    if (!reviewsData) {
      console.log(' No reviews found in Firebase');
      return [];
    }

    // Convert object to array
    const reviews = Object.entries(reviewsData).map(([key, value]) => ({
      id: key,
      ...value
    }));

    console.log(' Processed reviews:', reviews);

    // Sort by timestamp descending (newest first)
    reviews.sort((a, b) => b.timestamp - a.timestamp);

    return reviews;
  } catch (error) {
    console.error('❌ Error reading reviews from Firebase:', error);
    return [];
  }
}

// Listen to real-time reviews updates
function listenToReviews(callback, limit = 20) {
  if (!database) {
    return null;
  }

  const reviewsRef = database.ref('reviews')
    .orderByChild('timestamp')
    .limitToLast(limit);
  
  reviewsRef.on('value', (snapshot) => {
    const reviewsData = snapshot.val();
    
    if (!reviewsData) {
      callback([]);
      return;
    }

    const reviews = Object.entries(reviewsData).map(([key, value]) => ({
      id: key,
      ...value
    }));

    // Sort by timestamp descending
    reviews.sort((a, b) => b.timestamp - a.timestamp);

    callback(reviews);
  });

  return reviewsRef;
}

// Get reviews statistics (by project, by rating, etc.)
async function getReviewsStats() {
  if (!database) {
    return null;
  }

  try {
    const snapshot = await database.ref('reviews').once('value');
    const reviewsData = snapshot.val();
    
    if (!reviewsData) {
      return {
        total: 0,
        averageRating: 0,
        byProject: {},
        byRating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }

    const reviews = Object.values(reviewsData);
    const total = reviews.length;
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = total > 0 ? totalRating / total : 0;

    // Count by project
    const byProject = {};
    reviews.forEach(review => {
      const project = review.projectName;
      if (!byProject[project]) {
        byProject[project] = { count: 0, totalRating: 0 };
      }
      byProject[project].count++;
      byProject[project].totalRating += review.rating;
    });

    // Calculate average for each project
    Object.keys(byProject).forEach(project => {
      byProject[project].average = byProject[project].totalRating / byProject[project].count;
    });

    // Count by rating
    const byRating = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
      byRating[review.rating]++;
    });

    return {
      total,
      averageRating: parseFloat(averageRating.toFixed(1)),
      byProject,
      byRating
    };
  } catch (error) {
    console.error('❌ Error getting reviews stats:', error);
    return null;
  }
}
