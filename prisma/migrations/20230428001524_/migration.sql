/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Funcionario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_cpf_key" ON "Funcionario"("cpf");
