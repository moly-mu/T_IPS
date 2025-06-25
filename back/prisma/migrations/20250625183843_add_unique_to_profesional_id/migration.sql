/*
  Warnings:

  - A unique constraint covering the columns `[idProfesional]` on the table `profesional` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "profesional_idProfesional_key" ON "profesional"("idProfesional");
