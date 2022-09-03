import { Router } from "express";

const router = Router();

// Controllers
import {
  deletePayment,
  getPayment,
  payPayment,
} from "../controllers/payments.controller";

// Methods
router.route("/:payment_id").get(getPayment).delete(deletePayment);

router.route("/pay/:payment_id").put(payPayment);

export default router;
