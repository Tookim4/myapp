const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/login', authController.login);
router.get('/signup', authController.signup);
router.post('/login', authController.login_pos);
router.post('/signup', authController.sign_up);
router.get('/logout', authController.logout);

module.exports = router;