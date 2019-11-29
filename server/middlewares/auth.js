const jwt = require('express-jwt');
const { expressJwtSecret } = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

const namespace = process.env.NAMESPACE;

//Web token validado
exports.jwtCheck = jwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-hk8t7icc.auth0.com/.well-known/jwks.json"
  }),
  audience: "https://portfolio",
  issuer: "https://dev-hk8t7icc.auth0.com/",
  algorithms: ["RS256"]
});

//Revisamos y validamos los scopes
exports.checkScopes = jwtAuthz(['read:portfolios'])

//Check Role
exports.checkRole = role => (req, res, next) => {
  const user = req.user
  if(user && (user[`${namespace}/role`] === role)) {
    next();
  }else {
    return res.status(401).send({title: 'Not Authorized', detail: 'You are not authorized to access to this data'})
  }
} 