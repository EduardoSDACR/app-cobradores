import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

const router = Router();

// Controllers
import { deletePayment, getPayment, payPayment } from "../controllers/payments.controller";

// Routes
router
  .route("/:payment_id")
  .get(expressAsyncHandler(getPayment))
  .delete(expressAsyncHandler(deletePayment));

router.route("/pay/:payment_id").put(expressAsyncHandler(payPayment));

export default router;
