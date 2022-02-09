const jwt = require('jsonwebtoken');

const generate = (tokenData, secret, issuer, audience = '', expiresIn = '1d') => jwt.sign(tokenData, secret, { issuer, audience, expiresIn });

const verify = (token, secret, issuer, audience) => new Promise((resolve, reject) => {
  jwt.verify(token, secret, { issuer, audience }, (err, decoded) => {
    if (err) {
      //console.log('err: ', err);
      resolve({ success: false, message: 'Invalid Token' });
    } else {
      resolve({ success: true, tokenData: decoded });
    }
  });
});

module.exports = { generate, verify };
