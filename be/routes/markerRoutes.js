const express = require('express');
const { authMiddleware } = require('../controller/userController');
const { removeMarker, addMarker, getAllMarkers } = require('../controller/markerController');
const router = express.Router();

router.post('/addMarker', authMiddleware, addMarker);
router.post('/removeMarker', removeMarker);
router.get('/getMarker', authMiddleware, getAllMarkers);

module.exports = router;