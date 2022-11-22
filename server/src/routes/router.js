const express = require('express');
const controllers = require('../controllers/controller');
const router = express.Router();

router.get('/test', (req, res) => {
    console.log("Router.js")
})

router.get('/api_login', controllers.getAuthToken);
//     console.log("SERVER: /api_login");
//     controllers.getAuthToken(req, res)
// })


module.exports = router;