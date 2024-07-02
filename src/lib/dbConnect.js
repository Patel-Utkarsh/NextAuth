import mongoose from 'mongoose';

// Ensure the MONGODB_URI is defined
if (!process.env.MONGODB_URL) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/** 
 * Global is used here to maintain a cached connection across hot-reloads in development. 
 * This prevents connections growing exponentially during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URL, opts).then((mongoose) => {
      console.log('db connected successfully');
      return mongoose;
    }).catch((error) => {
      console.log(error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
