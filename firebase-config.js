const firebaseConfig = {
  apiKey: "AIzaSyA6x0HTHp9jOkDDX_qx1mAaVTtndaCjtVA",
  authDomain: "trungkien-portfolio.firebaseapp.com",
  projectId: "trungkien-portfolio",
  storageBucket: "trungkien-portfolio.firebasestorage.app",
  messagingSenderId: "1007276704259",
  appId: "1:1007276704259:web:6edc78c361e96af445c436",
  measurementId: "G-2ZZ4TN6KZ9",
  databaseURL: "https://trungkien-portfolio-default-rtdb.firebaseio.com"
};

// Initialize Firebase
let app, database;

function initFirebase() {
  try {
    if (typeof firebase !== 'undefined') {
      app = firebase.initializeApp(firebaseConfig);
      database = firebase.database();
      console.log('✅ Firebase initialized successfully');
      return true;
    } else {
      console.warn('⚠️ Firebase SDK not loaded');
      return false;
    }
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    return false;
  }
}

// Save rating to Firebase
async function saveRatingToFirebase(projectName, rating, userInfo = {}) {
  if (!database) {
    console.warn('Firebase not initialized, using localStorage fallback');
    return false;
  }

  const projectKey = projectName.replace(/\s+/g, '_');
  const timestamp = Date.now();
  
  const ratingData = {
    rating: rating,
    timestamp: timestamp,
    userAgent: navigator.userAgent.substring(0, 100), // Limit length
    ...userInfo
  };

  try {
    // Save to Firebase Realtime Database
    await database.ref(`ratings/${projectKey}`).push(ratingData);
    console.log(`✅ Rating saved to Firebase for ${projectName}`);
    return true;
  } catch (error) {
    console.error('❌ Error saving to Firebase:', error);
    return false;
  }
}

// Get all ratings for a project from Firebase
async function getRatingsFromFirebase(projectName) {
  if (!database) {
    return null;
  }

  const projectKey = projectName.replace(/\s+/g, '_');

  try {
    const snapshot = await database.ref(`ratings/${projectKey}`).once('value');
    const ratingsData = snapshot.val();
    
    if (!ratingsData) {
      return { average: 0, total: 0, ratings: [] };
    }

    // Convert object to array
    const ratings = Object.values(ratingsData).map(r => r.rating);
    const total = ratings.length;
    const average = total > 0 ? ratings.reduce((a, b) => a + b, 0) / total : 0;

    return {
      average: parseFloat(average.toFixed(1)),
      total: total,
      ratings: ratings
    };
  } catch (error) {
    console.error('❌ Error reading from Firebase:', error);
    return null;
  }
}

// Listen to real-time updates for a project's ratings
function listenToRatings(projectName, callback) {
  if (!database) {
    return null;
  }

  const projectKey = projectName.replace(/\s+/g, '_');
  
  const ratingsRef = database.ref(`ratings/${projectKey}`);
  
  ratingsRef.on('value', async (snapshot) => {
    const ratingsData = snapshot.val();
    
    if (!ratingsData) {
      callback({ average: 0, total: 0, ratings: [] });
      return;
    }

    const ratings = Object.values(ratingsData).map(r => r.rating);
    const total = ratings.length;
    const average = total > 0 ? ratings.reduce((a, b) => a + b, 0) / total : 0;

    callback({
      average: parseFloat(average.toFixed(1)),
      total: total,
      ratings: ratings
    });
  });

  return ratingsRef;
}

// Get rating statistics for all projects
async function getAllProjectsStats() {
  if (!database) {
    return {};
  }

  try {
    const snapshot = await database.ref('ratings').once('value');
    const allRatings = snapshot.val();
    
    if (!allRatings) {
      return {};
    }

    const stats = {};
    
    for (const [projectKey, ratingsData] of Object.entries(allRatings)) {
      const ratings = Object.values(ratingsData).map(r => r.rating);
      const total = ratings.length;
      const average = total > 0 ? ratings.reduce((a, b) => a + b, 0) / total : 0;
      
      stats[projectKey] = {
        average: parseFloat(average.toFixed(1)),
        total: total
      };
    }

    return stats;
  } catch (error) {
    console.error('❌ Error getting all stats:', error);
    return {};
  }
}
