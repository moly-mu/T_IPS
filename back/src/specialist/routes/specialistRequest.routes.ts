import { Router } from "express";
import {createSpecialistRequest, listSpecialistRequests, approveSpecialistRequest} from "../controllers/specialistRequest.controller"

app.post("/api/specialist-request", verifyToken, createSpecialistRequest);
app.get("/api/admin/specialist-requests", listSpecialistRequests);
app.put("/api/admin/specialist-requests/:id/approve", approveSpecialistRequest);

