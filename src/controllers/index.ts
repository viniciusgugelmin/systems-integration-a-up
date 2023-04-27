import { Request, Response } from "express";
import { RootService } from "../services";

class RootController {
  public async post(req: Request, res: Response) {
    const data = req.body;
    const rootService = new RootService();

    await rootService.post(data);

    res.status(201).json({
      message: "Folha de pagamento cadastrada com sucesso!",
    });
  }

  public async get(req: Request, res: Response) {
    const rootService = new RootService();

    await rootService.get();

    res.json({
      message: "Folhas de pagamento calculadas e enviadas com sucesso!",
    });
  }
}

export { RootController };
