const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const myToken = jwt.verify(req.headers.authorization.split(' ')[1], 'TOK3N_S3CR3T');
    req.body.tokenOwner = myToken.tokenOwner;
    if(!myToken.tokenOwner) { throw {}; }
    next();
  } catch {
    res.status(401).send({success: 0, message: 'Un problème d\'authentification est survenu.'})
  }
};