import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

const router = Router();

// Controllers
import {
  createAdministrator,
  deleteAdministrator,
  getAdministrator,
  getAdministrators,
  updateAdministrator,
} from "../controllers/administrators.controller";

// Routes
router
  .route("/")
  .get(expressAsyncHandler(getAdministrators))
  .post(expressAsyncHandler(createAdministrator));

router
  .route("/:administrator_id")
  .get(expressAsyncHandler(getAdministrator))
  .put(expressAsyncHandler(updateAdministrator))
  .delete(expressAsyncHandler(deleteAdministrator));

export default router;
