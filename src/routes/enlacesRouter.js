const express = require('express');
const enlacesController = require('../controllers/enlacesController.js');
const router = express.Router();

router.get('/', enlacesController.politicaPrivacidad);
router.get('/formas-de-pago',enlacesController.formasDePago)

module.exports = router;