const express = require('express')
const router = express.Router();
const userController = require('../controllers/utilisateur.controller');

router.post("/login",userController.loginUser);
router.post("/create",userController.create);

module.exports = router;