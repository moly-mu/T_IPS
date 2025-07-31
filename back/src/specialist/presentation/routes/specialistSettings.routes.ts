import express from 'express'
import {changePassword} from "../controllers/config/changePasswordSpecialist.controller";
import {deactivateAccount} from "../controllers/config/deactivateSettingsSpecialist.controller";
import {deleteAccount} from "../controllers/config/deleteSettingSpecialist.controller";
import {getSettings} from "../controllers/config/settingsSpecialist.controller";
import {
  getAccountSettings,
  updateAccountPreferences,
  verifyCurrentPassword,
  getAccountActivity,
  exportAccountData
} from "../controllers/config/accountSettings.controller";
import {validateToken  } from "../../middleware/authMiddleware";
import {getSpecDataByUser} from "../controllers/profile/listdataSpecialist.controller";
const router = express.Router();

// Rutas existentes
router.put("/changePassword", validateToken, changePassword);
router.put("/deactivateSpecialist", validateToken,deactivateAccount);
router.delete("/deleteSpecialist",validateToken, deleteAccount);
router.get("/settingSpecialist",validateToken, getSettings);
router.get("/dataProfessional",validateToken,getSpecDataByUser);

// Nuevas rutas para configuración completa
router.get("/account", validateToken, getAccountSettings);
router.put("/preferences", validateToken, updateAccountPreferences);
router.post("/verify-password", validateToken, verifyCurrentPassword);
router.get("/activity", validateToken, getAccountActivity);
router.get("/export-data", validateToken, exportAccountData);

export default router;