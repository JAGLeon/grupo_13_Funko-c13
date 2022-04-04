const express = require('express');
const enlacesController = require('../controllers/enlacesController.js');
const router = express.Router();

router.get('/politicas-de-privacidad', enlacesController.politicaPrivacidad);
router.get('/formas-de-pago',enlacesController.formasDePago)

module.exports = router;