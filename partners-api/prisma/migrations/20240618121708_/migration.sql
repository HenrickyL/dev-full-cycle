/*
  Warnings:

  - The values [available,reserved] on the enum `Spot_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Spot` MODIFY `status` ENUM('AVAILABLE', 'RESERVED') NOT NULL;
