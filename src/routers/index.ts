import { Router } from "express";
import { RootController } from "../controllers";

const rootRouter = Router();
const rootController = new RootController();

rootRouter.get("/", (req, res) => {
  res.send("Hello from systems-integration-a-up");
});

rootRouter.post("/folha/cadastrar", (req, res) =>
  rootController.post(req, res)
);

rootRouter.get("/folha/calcular", (req, res) => rootController.get(req, res));

export { rootRouter };
