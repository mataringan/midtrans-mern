import express from "express";
import { handleMidtransPayment } from "../controllers/payment.js";

const router = express.Router();

router.post("/process-transaction", handleMidtransPayment);

export default router;
