const mongoose = require("mongoose");

async function Dbconnect() {
  try {
    const connection = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10
    });

    console.log(`🗄️  MongoDB Connected: ${connection.connection.host}`);
    console.log(`📁 Database Name: ${connection.connection.name}`);

    mongoose.connection.on('connected', () => {
      console.log('✅ Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`❌ Mongoose connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  Mongoose disconnected from DB');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('⛔ Mongoose connection closed due to app termination');
      process.exit(0);
    });

    return connection;

  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = Dbconnect;