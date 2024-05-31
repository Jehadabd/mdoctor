var express = require('express');
var router = express.Router();
const doctorController=require('../contollers/doctorController')
router.get('/',doctorController.find)
module.exports = router;