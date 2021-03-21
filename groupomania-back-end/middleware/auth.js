const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const myToken = jwt.verify(req.headers.authorization.split(' ')[1], 'TOK3N_S3CR3T');
    const userId = req.headers.authorization.split(' ')[2];
    if(myToken.userId && userId && myToken.userId == userId) { 
      next()
    } else { throw {}; }
  } catch {
    res.status(401).send({message: 'Un problème d\'authentification est survenu.'})
  }
}