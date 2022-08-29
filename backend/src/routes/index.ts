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

router.route("/clients").get(getClients).post(createClient);

router
  .route("/clients/:id")
  .get(getClient)
  .put(updateClient)
  .delete(deleteClient);

export default router;
