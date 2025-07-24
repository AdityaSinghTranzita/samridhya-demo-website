// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

// Fail early if URI is missing
if (!uri) {
  throw new Error('❌ MONGODB_URI is not defined in environment variables');
}

// Extend global type for caching in dev
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    console.log('🔄 Connecting to MongoDB (dev)...');
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  } else {
    console.log('✅ Reusing MongoDB connection (dev cache)');
  }
  clientPromise = global._mongoClientPromise!;
} else {
  console.log('🔄 Connecting to MongoDB (prod)...');
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
