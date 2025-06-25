-- CreateTable
CREATE TABLE "admin" (
    "idadmin" SERIAL NOT NULL,
    "username" VARCHAR(45) NOT NULL,
    "password" VARCHAR(45) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("idadmin")
);

-- CreateTable
CREATE TABLE "credential_users" (
    "idcredential_users" SERIAL NOT NULL,
    "document" VARCHAR(45) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "password" VARCHAR(45) NOT NULL,

    CONSTRAINT "credential_users_pkey" PRIMARY KEY ("idcredential_users")
);

-- CreateTable
CREATE TABLE "rol" (
    "idrol" SERIAL NOT NULL,
    "rol_name" VARCHAR(45) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("idrol")
);

-- CreateTable
CREATE TABLE "user" (
    "idUser" SERIAL NOT NULL,
    "firstname" VARCHAR(45) NOT NULL,
    "lastname" VARCHAR(45) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" VARCHAR(45) NOT NULL,
    "sex" VARCHAR(10) NOT NULL,
    "languaje" VARCHAR(45) NOT NULL,
    "document" INTEGER NOT NULL,
    "document_type" VARCHAR(45) NOT NULL,
    "credential_users_idcredential_users" INTEGER NOT NULL,
    "rol_idrol" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "pac_data" (
    "idpac_data" SERIAL NOT NULL,
    "medical_history" BYTEA NOT NULL,

    CONSTRAINT "pac_data_pkey" PRIMARY KEY ("idpac_data")
);

-- CreateTable
CREATE TABLE "paciente" (
    "idPaciente" SERIAL NOT NULL,
    "pac_data_idpac_data" INTEGER NOT NULL,
    "User_idUser" INTEGER NOT NULL,
    "User_credential_users_idcredential_users" INTEGER NOT NULL,
    "User_rol_idrol" INTEGER NOT NULL,

    CONSTRAINT "paciente_pkey" PRIMARY KEY ("idPaciente","pac_data_idpac_data","User_idUser","User_credential_users_idcredential_users","User_rol_idrol")
);

-- CreateTable
CREATE TABLE "prof_data" (
    "idprof_data" SERIAL NOT NULL,
    "biography" TEXT NOT NULL,
    "picture" BYTEA NOT NULL,
    "CV" BYTEA NOT NULL,
    "mppc" REAL NOT NULL,
    "exp_lab" VARCHAR(45) NOT NULL,
    "educational certificates" BYTEA NOT NULL,
    "degrees" BYTEA NOT NULL,
    "working_experience" VARCHAR(45) NOT NULL,

    CONSTRAINT "prof_data_pkey" PRIMARY KEY ("idprof_data")
);

-- CreateTable
CREATE TABLE "profesional" (
    "idProfesional" SERIAL NOT NULL,
    "prof_data_idprof_data" INTEGER NOT NULL,
    "status" VARCHAR(15) NOT NULL,
    "User_idUser" INTEGER NOT NULL,
    "User_credential_users_idcredential_users" INTEGER NOT NULL,
    "User_rol_idrol" INTEGER NOT NULL,

    CONSTRAINT "profesional_pkey" PRIMARY KEY ("idProfesional","prof_data_idprof_data","User_idUser","User_credential_users_idcredential_users","User_rol_idrol")
);

-- CreateTable
CREATE TABLE "specialty" (
    "idspecialty" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,

    CONSTRAINT "specialty_pkey" PRIMARY KEY ("idspecialty")
);

-- CreateTable
CREATE TABLE "profesional_has_specialty" (
    "Profesional_idProfesional" INTEGER NOT NULL,
    "Profesional_prof_data_idprof_data" INTEGER NOT NULL,
    "Profesional_User_idUser" INTEGER NOT NULL,
    "Profesional_User_credential_users_idcredential_users" INTEGER NOT NULL,
    "Profesional_User_rol_idrol" INTEGER NOT NULL,
    "specialty_idspecialty" INTEGER NOT NULL,

    CONSTRAINT "profesional_has_specialty_pkey" PRIMARY KEY ("Profesional_idProfesional","Profesional_prof_data_idprof_data","Profesional_User_idUser","Profesional_User_credential_users_idcredential_users","Profesional_User_rol_idrol","specialty_idspecialty")
);

-- CreateTable
CREATE TABLE "request" (
    "idrequest" SERIAL NOT NULL,
    "Profesional_idProfesional" INTEGER NOT NULL,
    "Profesional_prof_data_idprof_data" INTEGER NOT NULL,
    "Profesional_User_idUser" INTEGER NOT NULL,
    "Profesional_User_credential_users_idcredential_users" INTEGER NOT NULL,
    "Profesional_User_rol_idrol" INTEGER NOT NULL,

    CONSTRAINT "request_pkey" PRIMARY KEY ("idrequest","Profesional_idProfesional","Profesional_prof_data_idprof_data","Profesional_User_idUser","Profesional_User_credential_users_idcredential_users","Profesional_User_rol_idrol")
);

-- CreateTable
CREATE TABLE "appointments" (
    "idappointments" SERIAL NOT NULL,
    "state" VARCHAR(20) NOT NULL,
    "Paciente_idPaciente" INTEGER NOT NULL,
    "Paciente_pac_data_idpac_data" INTEGER NOT NULL,
    "Paciente_User_idUser" INTEGER NOT NULL,
    "Paciente_User_credential_users_idcredential_users" INTEGER NOT NULL,
    "Paciente_User_rol_idrol" INTEGER NOT NULL,
    "Profesional_idProfesional" INTEGER NOT NULL,
    "Profesional_prof_data_idprof_data" INTEGER NOT NULL,
    "Profesional_User_idUser" INTEGER NOT NULL,
    "Profesional_User_credential_users_idcredential_users" INTEGER NOT NULL,
    "Profesional_User_rol_idrol" INTEGER NOT NULL,
    "appoint_init" TIMESTAMP NOT NULL,
    "appoint_finish" TIMESTAMP NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("idappointments")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "credential_users_document_key" ON "credential_users"("document");

-- CreateIndex
CREATE UNIQUE INDEX "credential_users_email_key" ON "credential_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rol_rol_name_key" ON "rol"("rol_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_document_key" ON "user"("document");

-- CreateIndex
CREATE UNIQUE INDEX "user_idUser_credential_users_idcredential_users_rol_idrol_key" ON "user"("idUser", "credential_users_idcredential_users", "rol_idrol");

-- CreateIndex
CREATE UNIQUE INDEX "specialty_name_key" ON "specialty"("name");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_credential_users_idcredential_users_fkey" FOREIGN KEY ("credential_users_idcredential_users") REFERENCES "credential_users"("idcredential_users") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_rol_idrol_fkey" FOREIGN KEY ("rol_idrol") REFERENCES "rol"("idrol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paciente" ADD CONSTRAINT "paciente_pac_data_idpac_data_fkey" FOREIGN KEY ("pac_data_idpac_data") REFERENCES "pac_data"("idpac_data") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paciente" ADD CONSTRAINT "paciente_User_idUser_User_credential_users_idcredential_us_fkey" FOREIGN KEY ("User_idUser", "User_credential_users_idcredential_users", "User_rol_idrol") REFERENCES "user"("idUser", "credential_users_idcredential_users", "rol_idrol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesional" ADD CONSTRAINT "profesional_prof_data_idprof_data_fkey" FOREIGN KEY ("prof_data_idprof_data") REFERENCES "prof_data"("idprof_data") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesional" ADD CONSTRAINT "profesional_User_idUser_User_credential_users_idcredential_fkey" FOREIGN KEY ("User_idUser", "User_credential_users_idcredential_users", "User_rol_idrol") REFERENCES "user"("idUser", "credential_users_idcredential_users", "rol_idrol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesional_has_specialty" ADD CONSTRAINT "profesional_has_specialty_Profesional_idProfesional_Profes_fkey" FOREIGN KEY ("Profesional_idProfesional", "Profesional_prof_data_idprof_data", "Profesional_User_idUser", "Profesional_User_credential_users_idcredential_users", "Profesional_User_rol_idrol") REFERENCES "profesional"("idProfesional", "prof_data_idprof_data", "User_idUser", "User_credential_users_idcredential_users", "User_rol_idrol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesional_has_specialty" ADD CONSTRAINT "profesional_has_specialty_specialty_idspecialty_fkey" FOREIGN KEY ("specialty_idspecialty") REFERENCES "specialty"("idspecialty") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_Profesional_idProfesional_Profesional_prof_data_id_fkey" FOREIGN KEY ("Profesional_idProfesional", "Profesional_prof_data_idprof_data", "Profesional_User_idUser", "Profesional_User_credential_users_idcredential_users", "Profesional_User_rol_idrol") REFERENCES "profesional"("idProfesional", "prof_data_idprof_data", "User_idUser", "User_credential_users_idcredential_users", "User_rol_idrol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_Paciente_idPaciente_Paciente_pac_data_idpac_d_fkey" FOREIGN KEY ("Paciente_idPaciente", "Paciente_pac_data_idpac_data", "Paciente_User_idUser", "Paciente_User_credential_users_idcredential_users", "Paciente_User_rol_idrol") REFERENCES "paciente"("idPaciente", "pac_data_idpac_data", "User_idUser", "User_credential_users_idcredential_users", "User_rol_idrol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_Profesional_idProfesional_Profesional_prof_da_fkey" FOREIGN KEY ("Profesional_idProfesional", "Profesional_prof_data_idprof_data", "Profesional_User_idUser", "Profesional_User_credential_users_idcredential_users", "Profesional_User_rol_idrol") REFERENCES "profesional"("idProfesional", "prof_data_idprof_data", "User_idUser", "User_credential_users_idcredential_users", "User_rol_idrol") ON DELETE RESTRICT ON UPDATE CASCADE;
