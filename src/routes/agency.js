const express = require('express');
const db = require('../dbFunctions/index');
const { Router } = express;
const router = Router();

router.post('/', async (req, res) => {
  console.log('req.body: ', req.body);
  const { agency, clients } = req.body;
  try {
    if(agency && agency.AgencyId && agency.Name && agency.Address1 && agency.State && agency.City && agency.PhoneNumber) {
      await db.agency.add(agency);
    } else {
      return res.status(400).json({message: 'Failed to add Agency'});
    }
    clients.forEach(async (client) => {
      if(client && client.AgencyId && client.Name && client.Email && client.TotalBill && client.PhoneNumber) {
        await db.clients.add(client);
      } else {
        return res.status(400).json({message: `Failed to add Client: ${client}`});
      }
    });
    return res.status(201).json({message: 'Successfully Added Agency and Clients'});
  } catch(error) {
    console.log('error: ', error);
    res.status(406).json({ message: 'Error in Adding Agency or/and Clients', resolution: 'check all required fields and type' });
  }
});

module.exports = router;

