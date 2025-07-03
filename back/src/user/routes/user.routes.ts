import {registerUser} from "../controllers/auth.controller";
import {loginUser} from "../controllers/auth.controller";
import {requestSpecialist} from "../controllers/Specialist.Request.controller";

// *Rutas de registrarse y de iniciar sesión del usuario
router.post("/register", registerUser);
router.post("/login", loginUser);

// Ruta usuario para solicitar ser especialista
router.post("/request-specialist", verifyToken, requestSpecialist);

