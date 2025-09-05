"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExpressServer = CreateExpressServer;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
function CreateExpressServer() {
    const app = (0, express_1.default)();
    // middlewares
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)());
    // mounting routes
    app.use("/v1", (0, routes_1.createV1Router)());
    return app;
}
//# sourceMappingURL=server.js.map