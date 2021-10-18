
const router = require('express').Router();
const thoughtRoutes = require('./thoughts-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/thoughts', thoughtRoutes);
router.use('/user', userRoutes);


module.exports = router;
