import { Router } from "express";

const router = Router();

// Controllers
import {
  getClient,
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller";
import {
  getClientPayments,
  createPayment,
} from "../controllers/payments.controller";

// Methods
router.route("/").get(getClients).post(createClient);
router
  .route("/:client_id")
  .get(getClient)
  .put(updateClient)
  .delete(deleteClient);

router.route("/:client_id/payments").get(getClientPayments).post(createPayment);

export default router;
