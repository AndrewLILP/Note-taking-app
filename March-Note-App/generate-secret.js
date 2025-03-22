// generate-secret.js
const crypto = require('crypto');

// Generate a random string of 64 bytes and convert to hex
const sessionSecret = crypto.randomBytes(64).toString('hex');

console.log('Generated Session Secret:');
console.log(sessionSecret);
console.log('\nUpdate your .env file with:');
console.log(`SESSION_SECRET=${sessionSecret}`);