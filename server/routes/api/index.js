
const router = require('express').Router();
const thoughtRoutes = require('./thoughts-routes.js');
const userRoutes = require('./user-routes.js');

thoughtRoutes.use('/thoughts', thoughtRoutes);
userRoutes.use('/user', userRoutes);


module.exports = router;
