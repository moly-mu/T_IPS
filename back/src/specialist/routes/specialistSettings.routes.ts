import express from 'express'
import {changePassword} from "../controllers/config/changePasswordSpecialist.controller";
import {deactivateAccount} from "../controllers/config/deactivateSettingsSpecialist.controller";
import {deleteAccount} from "../controllers/config/deleteSettingSpecialist.controller";
import {getSettings} from "../controllers/config/settingsSpecialist.controller";
import {validateToken  } from "../middleware/authMiddleware";
const router = express.Router();


router.post("/changePassword", validateToken, changePassword);
router.get("/deactivateSpecialist", validateToken,deactivateAccount);
router.put("/deleteSpecialist",validateToken, deleteAccount);
router.put("/settingSpecialist",validateToken, getSettings);

export default router;