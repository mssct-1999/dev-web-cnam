const express = require('express')
const router = express.Router();
const consultationController = require('../controllers/consultation.controller');

router.post('/findByIdPatient',consultationController.findByPatientId); 
router.post('/createByIdPatient',consultationController.createByPatientId); 
router.post('/deleteById',consultationController.deleteById);
 
module.exports = router;