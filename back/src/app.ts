import express from "express";
import cors from "cors";
import userRoutes from "./user/routes/user.routes";
import adminProfRoutes from "./admin/routes/profesional.routes";
import adminSpecialRoutes from "./admin/routes/specialty.routes";
import adminPatientRoutes from "./admin/routes/patient.routes";
import specialistRequest from "./specialist/routes/specialistRequest.routes";

const app = express();

app.use(cors());
app.use(express.json());

// *Rutas de usuario
app.use("/api", userRoutes); // /api/register, /api/login, /api/request-specialist


// *Rutas de administración
app.use("/admin/profesional", adminProfRoutes);
app.use("/admin/specialty", adminSpecialRoutes);
app.use("/admin/patient", adminPatientRoutes);

//*Rutas de especialista
app.use("/specialist", specialistRequest)


export default app;
