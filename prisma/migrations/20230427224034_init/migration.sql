-- CreateTable
CREATE TABLE "Folha" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "horas" REAL NOT NULL,
    "valor" REAL NOT NULL,
    "funcionario_cpf" TEXT NOT NULL,
    "bruto" REAL,
    "irrf" REAL,
    "inss" REAL,
    "liquido" REAL,
    CONSTRAINT "Folha_funcionario_cpf_fkey" FOREIGN KEY ("funcionario_cpf") REFERENCES "Funcionario" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL PRIMARY KEY
);
