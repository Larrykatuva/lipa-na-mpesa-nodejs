import express from 'express';
import MpesaController from '../controllers/mpesaController';
const router = express.Router();

router.get('/get_access_token', MpesaController.getAccessToken)
router.post('/lipa_na_mpesa', MpesaController.lipaNaMpesa)
router.post('/call_back', MpesaController.mpesaCallBack)
router.get('/register_urls', MpesaController.registerUrl)
router.post('/validation', MpesaController.mpesaValidation)
router.post('/confirmation', MpesaController.mpesaConfirmation)
router.get('/validation', MpesaController.mpesaValidation)
router.get('/confirmation', MpesaController.mpesaConfirmation)
router.post('/c2b', MpesaController.simulateB2CTransaction)

export default router;