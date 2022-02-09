const express = require('express');
const { Router } = express;
const config = require('../config');
const utils = require('../shared/utils');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const { secret, issuer, audience } = config.tokens.webUser;
    const token = utils.token.generate(config.tokenData, secret, issuer, audience);
    return res.json({ token });
  } catch(error) {
    console.log('error: ', error);
    return res.json({ success: false });
  }
});

module.exports = router;

