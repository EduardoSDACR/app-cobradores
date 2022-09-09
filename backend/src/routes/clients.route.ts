import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

const router = Router();

// Controllers
import {
  getClient,
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller";
import { getClientPayments, createPayment } from "../controllers/payments.controller";

// Routes
router.route("/").get(expressAsyncHandler(getClients)).post(expressAsyncHandler(createClient));

router
  .route("/:client_id")
  .get(expressAsyncHandler(getClient))
  .put(expressAsyncHandler(updateClient))
  .delete(expressAsyncHandler(deleteClient));

router
  .route("/:client_id/payments")
  .get(expressAsyncHandler(getClientPayments))
  .post(expressAsyncHandler(createPayment));

export default router;
