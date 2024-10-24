import { Router } from 'express';

const router = Router();

router.post('/login', async (req, res) => {
  return res.json({
    message: 'Login route'
  });
});

export default router;