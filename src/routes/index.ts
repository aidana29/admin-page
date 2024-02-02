import { Application } from "express";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import homeRoutes from "./home.routes";
import tutorialRoutes from "./tutorial.routes";
import mainRoutes from "./mainRoutes";
import mediaRoutes from "./mediaRoutes";
import errorHandling from "../middleware/errorHandling";
import userRoutes from "./userRoute";

export default class Routes {
  constructor(app: Application) {
    // swagger route
    const swaggerSpec: any = YAML.load(path.join(__dirname, "../swagger.yaml"));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // /api route
    app.use("/main", mainRoutes);
    app.use("/media", mediaRoutes);
    app.use("/api", homeRoutes);
    app.use("/api/tutorials", tutorialRoutes);
    app.use("/users", userRoutes);
    app.use(errorHandling);
  }
}
