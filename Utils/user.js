const crypto = require('crypto');
const UserToken = require('./../models/UserToken')

 function generateAuthToken(documentId) {
    try {
        // Generate a random secure token
        const token = crypto.createHash('sha256').update(documentId.toString()).digest('hex');
        return token;
    } catch (error) {
        console.error('Error generating auth token:', error);
     }
}

async function requireLogin(req, res, next) {
    if (!req.session || !req.session.authToken) {
        return res.status(401).send()
    }
    const token = req.session.authToken
    const result = (await UserToken.find({ token: token }).lean()) || []
    if (result.length == 0) {
        return res.status(401).send()
    }
    next()
    
}
module.exports = {
    requireLogin,
    generateAuthToken
}