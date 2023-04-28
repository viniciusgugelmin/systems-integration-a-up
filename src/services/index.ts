import dotenv from "dotenv";
import { RootRepository } from "../repositories";
import axios from "axios";

dotenv.config();

class RootService {
  public async post({ mes, ano, horas, valor, funcionario }): Promise<void> {
    const rootRepository = new RootRepository();

    await rootRepository.save({
      mes,
      ano,
      horas,
      valor,
      funcionario,
    });
  }

  public async get(): Promise<void> {
    const apiB = process.env.API_B;
    const rootRepository = new RootRepository();

    const { data } = await axios.get(`${apiB}/folha/listar`);
    const { folhasProcessadas } = data;

    const folhas = await rootRepository.getAll({
      exceptId: folhasProcessadas.map((folha) => folha.id),
    });
    const folhasCalculadas = folhas.map((folha) => {
      folha.bruto = this.calcularSalarioBruto(folha.horas, folha.valor);
      folha.irrf = this.calcularIrrf(folha.bruto);
      folha.inss = this.calcularInss(folha.bruto);
      folha.fgts = this.calcularFgts(folha.bruto);
      folha.liquido = this.calcularSalarioLiquido(
        folha.bruto,
        folha.irrf,
        folha.inss,
        folha.fgts
      );

      return folha;
    });

    console.log(folhasCalculadas);

    await axios.post(`${apiB}/folha/cadastrar`, folhasCalculadas);
  }

  private calcularSalarioBruto(horas, valor): number {
    return horas * valor;
  }

  private calcularIrrf(salarioBruto): number {
    if (salarioBruto <= 1903.98) {
      return 0;
    }

    if (salarioBruto <= 2826.65) {
      return salarioBruto * 0.075 - 142.8;
    }

    if (salarioBruto <= 3751.05) {
      return salarioBruto * 0.15 - 354.8;
    }

    if (salarioBruto <= 4664.68) {
      return salarioBruto * 0.225 - 636.13;
    }

    return salarioBruto * 0.275 - 869.36;
  }

  private calcularInss(salarioBruto): number {
    if (salarioBruto <= 1693.72) {
      return salarioBruto * 0.08;
    }

    if (salarioBruto <= 2822.9) {
      return salarioBruto * 0.09;
    }

    if (salarioBruto <= 5645.8) {
      return salarioBruto * 0.11;
    }

    return 621.03;
  }

  private calcularFgts(salarioBruto): number {
    return salarioBruto * 0.08;
  }

  private calcularSalarioLiquido(salarioBruto, irrf, inss, fgts): number {
    return salarioBruto - irrf - inss - fgts;
  }
}

export { RootService };
