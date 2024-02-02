"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const home_routes_1 = __importDefault(require("./home.routes"));
const tutorial_routes_1 = __importDefault(require("./tutorial.routes"));
const mainRoutes_1 = __importDefault(require("./mainRoutes"));
const mediaRoutes_1 = __importDefault(require("./mediaRoutes"));
const errorHandling_1 = __importDefault(require("../middleware/errorHandling"));
const userRoute_1 = __importDefault(require("./userRoute"));
class Routes {
    constructor(app) {
        // swagger route
        const swaggerSpec = yamljs_1.default.load(path_1.default.join(__dirname, "../swagger.yaml"));
        app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
        // /api route
        app.use("/main", mainRoutes_1.default);
        app.use("/media", mediaRoutes_1.default);
        app.use("/api", home_routes_1.default);
        app.use("/api/tutorials", tutorial_routes_1.default);
        app.use("/users", userRoute_1.default);
        app.use(errorHandling_1.default);
    }
}
exports.default = Routes;
