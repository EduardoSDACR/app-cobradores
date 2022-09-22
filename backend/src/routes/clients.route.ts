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
import { getClientPayments, createPayment, payPayment } from "../controllers/payments.controller";
import validateResource from "../core/middlewares/valideResource.middleware";
import { createClientSchema, verifyClientSchema } from "../schemas/client.schema";

// Routes
router
  .route("/")
  .get(expressAsyncHandler(getClients))
  .post(validateResource(createClientSchema), expressAsyncHandler(createClient));

router
  .route("/:client_id")
  .get(validateResource(verifyClientSchema), expressAsyncHandler(getClient))
  .put(expressAsyncHandler(updateClient))
  .delete(expressAsyncHandler(deleteClient));

router
  .route("/:client_id/payments")
  .get(expressAsyncHandler(getClientPayments))
  .post(expressAsyncHandler(createPayment));

router.route("/:client_id/payments/:payment_id/pay").put(expressAsyncHandler(payPayment));

export default router;
