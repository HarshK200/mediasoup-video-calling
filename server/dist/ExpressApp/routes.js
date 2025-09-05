"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createV1Router = createV1Router;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const random_animal_name_1 = __importDefault(require("random-animal-name"));
const auth_1 = require("./middlewares/auth");
// V1 Router
function createV1Router() {
    // TODO: move this to a load file
    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
        throw new Error("No jwt secret provided");
    }
    const v1Router = (0, express_1.Router)();
    // health check route
    v1Router.get("/health", (req, res) => {
        res.json({ status: "OK" });
    });
    // login the user as guest and return a signed jwt
    v1Router.post("/guest-login", (req, res) => {
        try {
            const guest_username = (0, random_animal_name_1.default)();
            const jwt_token = jsonwebtoken_1.default.sign({ username: guest_username }, jwt_secret);
            res.cookie("jwt_token", jwt_token);
            return res.status(200).json({ msg: "Login Successfull" });
        }
        catch (e) {
            console.error("Error in guest-login:\n", e);
            return res.status(500).json({ msg: "Internal server error" });
        }
    });
    // route to create stream
    v1Router.post("/create-stream", auth_1.authMiddleware, (req, res) => {
        try {
            // TODO: do the media-soup worker stuff (create a router)
            return res
                .status(200)
                .json({ msg: "test", username: req.body.username });
        }
        catch (e) {
            console.error("Error in create-stream:\n", e);
            return res.status(500).json({ msg: "Internal server error" });
        }
    });
    return v1Router;
}
//# sourceMappingURL=routes.js.map