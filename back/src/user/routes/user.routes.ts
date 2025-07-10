import {registerUser} from "../controllers/auth.Register.controller";
import {loginUser} from "../controllers/auth.Login.controller";
<<<<<<< HEAD
import express from "express";

const router = express.Router();
=======
import {requestSpecialist} from "../controllers/Specialist.Request.controller";

>>>>>>> 7dacd2b22b3aa2f5d3805ea608890126d0ef296a
// *Rutas de registrarse y de iniciar sesión del usuario
router.post("/register", registerUser);
router.post("/login", loginUser);

<<<<<<< HEAD

export default router;
=======
// *Ruta usuario para solicitar ser especialista
router.post("/request-specialist", verifyToken, requestSpecialist);

>>>>>>> 7dacd2b22b3aa2f5d3805ea608890126d0ef296a
