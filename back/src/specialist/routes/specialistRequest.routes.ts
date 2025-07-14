import express from "express";
import {createSpecialistRequest} from "../controllers/createSpecialist.Request.controller";
import {listSpecialistRequests} from "../controllers/listSpecialist.Request.controller";
import {approveSpecialistRequest} from "../controllers/approveSpecialist.Request.controller";
import {validateToken} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/specialistRequest", validateToken, createSpecialistRequest);//! Borrar este log cuando se haga el commit
console.log("🛠️ Ruta /specialist-request creada y protegida con validateToken middleware");
router.get("/specialist/specialist-requests", validateToken,listSpecialistRequests);
router.put("/specialist/specialist-requests/:id/approve",validateToken, approveSpecialistRequest);

export default router;