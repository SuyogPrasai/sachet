import mongoose from "mongoose";

type ConnectionState = {
  isConnected?: number;
};

const connection: ConnectionState = {};

// Enhanced dbConnect function
export const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Database is already connected.");
    return;
  }

  try {
    // Use environment variable or default value for MongoDB URI
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MongoDB connection URI is not defined in environment variables.");
    }

    const db = await mongoose.connect(mongoUri); // No need for additional options in Mongoose v6+
    connection.isConnected = db.connections[0].readyState;

    console.log(`Database connected successfully (State: ${connection.isConnected}).`);
  } catch (error) {
    console.error("Database connection failed. Error details:", error);
    process.exit(1); // Exit the process in case of a connection failure
  }
};

// Gracefully close the database connection
export const dbDisconnect = async (): Promise<void> => {
  if (connection.isConnected) {
    try {
      await mongoose.disconnect();
      connection.isConnected = undefined;
      console.log("Database connection closed.");
    } catch (error) {
      console.error("Failed to disconnect the database. Error details:", error);
    }
  } else {
    console.log("No database connection to close.");
  }
};

export default dbConnect;