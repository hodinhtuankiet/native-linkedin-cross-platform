const redis = require("redis");

// Define constants for connection events
const statusConnectRedis = {
  CONNECT: "connect",
  END: "end",
  RECONNECT: "reconnecting",
  ERROR: "error",
};

let client; // Declare client variable for Redis connection

// Function to handle the 'connect' event
const handleEventConnect = () => {
  console.log("Connected to Redis");
};

// Function to initialize Redis connection
const initRedis = () => {
  const instanceRedis = redis.createClient(); // Create Redis client instance
  client = instanceRedis; // Assign the client instance to the global variable

  // Attach event listener for the 'connect' event
  client.on(statusConnectRedis.CONNECT, handleEventConnect);

  return client; // Return the client instance
};

// Function to get the Redis client instance
const getRedis = () => {
  if (!client) {
    throw new Error("Redis client is not initialized");
  }
  return client;
};

// Function to close the Redis connection
const closeRedis = () => {
  if (client) {
    client.quit(); // Quit (close) the Redis client connection
  }
};

// Export functions to be accessible from other modules
module.exports = {
  initRedis,
  getRedis,
  closeRedis,
};
