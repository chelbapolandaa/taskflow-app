import express from 'express';
import { 
  register, 
  login, 
  getMe, 
  logout 
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { registerValidation, loginValidation } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

// Test route
router.get('/', (req, res) => {
  res.json({
    message: 'Auth routes are working!',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      getMe: 'GET /api/auth/me',
      logout: 'POST /api/auth/logout'
    }
  });
});

export default router;