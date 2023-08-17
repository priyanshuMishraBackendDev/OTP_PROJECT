const crypto = require('crypto');
function generateOTP(length = 6) {
    const characters = '0123456789';
    let otp = '';
  
    // Create a secure random buffer of the required length
    const randomBytes = crypto.randomBytes(length);
  
    // Map each random byte to a character from the allowed characters
    for (let i = 0; i < length; i++) {
      const index = randomBytes[i] % characters.length;
      otp += characters[index];
    }
  
    return otp;
  }
module.exports ={
    generateOTP
}