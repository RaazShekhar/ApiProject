
const utils = require('../shared/utils');
const config = require('../config');
const constants = require('../constants');

const getParsedToken = token => token.split(' ')[1];

const getVerifiedToken = async (token) => {
  const parsedToken = getParsedToken(token);
  let returnObject = { success: false, message: 'No Token Found' };
  if (parsedToken) {
    const { secret, issuer, audience } = config.tokens.webUser;
    returnObject = await utils.token.verify(parsedToken, secret, issuer, audience);
  }
  return returnObject;
};

module.exports = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      // Hits from app UI will have authorization token
      const verifiedToken = await getVerifiedToken(req.headers.authorization);
      if (verifiedToken.success) {
        req.headers.username = verifiedToken.tokenData.username;
        req.headers.password = verifiedToken.tokenData.password;
      } else {
        res.status(401).json({ success: false, message: constants.AUTHENTICATION_FAILED });
      }
    } else {
        return res.status(401).send({ success: false, message: constants.AUTHENTICATION_FAILED });
    }
    next();
  } catch (error) {
    console.log('error: ', error);
    res.status(401).json({ success: false, message: constants.AUTHENTICATION_FAILED });
  }
};

