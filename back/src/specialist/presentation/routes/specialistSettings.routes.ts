import express from 'express'
import {changePassword} from "../controllers/config/changePasswordSpecialist.controller";
import {deactivateAccount} from "../controllers/config/deactivateSettingsSpecialist.controller";
import {deleteAccount} from "../controllers/config/deleteSettingSpecialist.controller";
import {getSettings} from "../controllers/config/settingsSpecialist.controller";
import {validateToken  } from "../../middleware/authMiddleware";
import {getSpecDataByUser} from "../controllers/profile/listdataSpecialist.controller";
const router = express.Router();


router.put("/changePassword", validateToken, changePassword);
router.put("/deactivateSpecialist", validateToken,deactivateAccount);
router.delete("/deleteSpecialist",validateToken, deleteAccount);
router.get("/settingSpecialist",validateToken, getSettings);
router.get("/dataProfessional",validateToken,getSpecDataByUser);

export default router;