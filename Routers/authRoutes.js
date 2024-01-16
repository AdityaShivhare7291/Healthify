const express = require("express");

const router = express.Router();
const adminController= require('../Controllers/authController.js');
const {authenticateToken}=require('../Middleware/authmiddleware.js');
router.post("/signup", adminController.signup);

router.post("/login", adminController.login);

router.get('/details',authenticateToken,adminController.countern);

module.exports = router;