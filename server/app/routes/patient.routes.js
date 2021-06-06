const express = require('express')
const router = express.Router();
const patientController = require('../controllers/patient.controller');

router.post("/create",patientController.create);
router.post('/findAll',patientController.findAll);
router.post('/deleteById',patientController.deleteById);
router.post('/edit',patientController.edit);
router.get('/findById/:id',patientController.findById);

module.exports = router;