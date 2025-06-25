/*
  Warnings:

  - Added the required column `joinDate` to the `prof_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prof_data" ADD COLUMN     "joinDate" TIMESTAMP(6) NOT NULL;
