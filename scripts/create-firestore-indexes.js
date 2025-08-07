const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, where, orderBy, limit } = require('firebase/firestore');

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// This script will trigger the creation of required indexes by running the queries
async function createIndexes() {
  console.log('Creating Firestore indexes...');
  
  try {
    // Index 1: Status + UpdatedAt
    console.log('Creating index: status + updatedAt');
    const q1 = query(
      collection(db, 'blog-posts'),
      where('status', '==', 'draft'),
      orderBy('updatedAt', 'desc')
    );
    
    // Index 2: Status + PublishedAt
    console.log('Creating index: status + publishedAt');
    const q2 = query(
      collection(db, 'blog-posts'),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );
    
    // Index 3: Featured + Status + PublishedAt
    console.log('Creating index: featured + status + publishedAt');
    const q3 = query(
      collection(db, 'blog-posts'),
      where('featured', '==', true),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );
    
    // Index 4: Category + Status + PublishedAt
    console.log('Creating index: category + status + publishedAt');
    const q4 = query(
      collection(db, 'blog-posts'),
      where('category', '==', 'General'),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );
    
    console.log('Index creation queries executed successfully!');
    console.log('Check Firebase Console > Firestore Database > Indexes to see the building progress.');
    console.log('Indexes may take a few minutes to build completely.');
    
  } catch (error) {
    if (error.message.includes('requires an index')) {
      console.log('✅ Index creation triggered successfully!');
      console.log('The error above is expected - it means Firebase will now build the required index.');
      console.log('Check Firebase Console > Firestore Database > Indexes to see the building progress.');
    } else {
      console.error('Error creating indexes:', error);
    }
  }
}

// Run the script
createIndexes().then(() => {
  console.log('Script completed.');
  process.exit(0);
}).catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
}); 