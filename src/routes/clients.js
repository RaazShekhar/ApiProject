const express = require('express');
const db = require('../dbFunctions/index');
const { Router } = express;
const router = Router();

router.get('/', async(req, res) => {
  try {
    const agenciesWithTopClients = [];
    const queries = [
      {
       // $group : { _id: { AgencyId: "$AgencyId" }, maxBill: { $max: "$TotalBill" } }
        $group: { 
          _id: "$AgencyId",
          maxBill: { $max: "$TotalBill" }
        }
      }
    ];
    const agenciesWithMaxBill = await db.clients.aggregate(queries);
    for(let i = 0; i < agenciesWithMaxBill.length; i++) {
      const agency = await db.agency.findOneWithProjectAndLean({ AgencyId: agenciesWithMaxBill[i]._id }, { Name: 1 });
      // console.log('agency: ', agency);
      const topClients = await db.clients.findProjectWithLean({ AgencyId: agenciesWithMaxBill[i]._id, TotalBill: agenciesWithMaxBill[i].maxBill }, { Name: 1 });
      // console.log('topClients: ', topClients);
      topClients.forEach(topClient => {
        const returnObject = {};
        returnObject.AgencyName = agency.Name;
        returnObject.ClientName = topClient.Name;
        returnObject.TotalBill = agenciesWithMaxBill[i].maxBill;
        agenciesWithTopClients.push(returnObject);
      });
    }
    console.log('agenciesWithTopClients: ', agenciesWithTopClients);
    res.status(200).json(agenciesWithTopClients);
  } catch(error) {
    console.log('error: ', error);
    res.status(500).json('Server Error');
  }
});

router.put('/:ClientId', async(req, res) => {
  const { ClientId } = req.params;
  const updateObject = req.body;
  try {
    await db.clients.findOneAndUpdate({ ClientId }, updateObject);
    res.status(205).json({ message: 'Successfully updated' });
  } catch(error) {
    console.log('error: ', error);
    res.status(500).json('Server Error');
  }
});

module.exports = router;

