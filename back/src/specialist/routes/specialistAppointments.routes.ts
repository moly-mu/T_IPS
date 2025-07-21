import express from "express";
import {getAppointments} from "../controllers/listappoinments.controller";
import {validateToken} from "../middleware/authMiddleware";
import { listSpecialistRequests } from "../controllers/listSpecialist.Request.controller";
import { getProfile } from "../controllers/profile/listproSpecialist.controller";
import { updateProfile} from "../controllers/profile/editproSpecialist.controller";

const router = express.Router()

router.get("/getAppointments",validateToken, getAppointments);
router.get("/listSpecialist",validateToken,listSpecialistRequests);
router.get("/getProfile",validateToken,getProfile);
router.put("/editProfile",validateToken,updateProfile);



export default router;