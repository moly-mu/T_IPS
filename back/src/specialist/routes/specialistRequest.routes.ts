import express from "express";
import {createSpecialistRequest} from "../controllers/createSpecialist.Request.controller";
import {listSpecialistRequests} from "../controllers/listSpecialist.Request.controller";
import {approveSpecialistRequest} from "../controllers/approveSpecialist.Request.controller";
import {validateToken} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/specialist/specialist-request", validateToken, createSpecialistRequest);
router.get("/specialist/specialist-requests", validateToken,listSpecialistRequests);
router.put("/specialist/specialist-requests/:id/approve",validateToken, approveSpecialistRequest);

export default router;