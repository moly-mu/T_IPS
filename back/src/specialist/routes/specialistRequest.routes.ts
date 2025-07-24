import express from "express";
import {createSpecialistRequest} from "../controllers/request/createSpecialist.Request.controller";
import {listSpecialistRequests} from "../controllers/request/listSpecialist.Request.controller";
import {approveSpecialistRequest} from "../controllers/request/approveSpecialist.Request.controller";
import {validateToken} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/specialistRequest", validateToken, createSpecialistRequest);//! Borrar este log cuando se haga el commit
router.get("/specialist/specialist-requests", validateToken,listSpecialistRequests);
router.put("/specialist/specialist-requests/:id/approve",validateToken, approveSpecialistRequest);

export default router;