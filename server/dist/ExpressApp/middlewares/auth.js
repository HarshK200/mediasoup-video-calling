"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    try {
        // TODO: move this to a load file
        const jwt_secret = process.env.JWT_SECRET;
        if (!jwt_secret) {
            throw new Error("No jwt secret provided");
        }
        const jwt_token = req.cookies["jwt_token"];
        if (!jwt_token) {
            return res.status(401).json({ msg: "Jwt token not provided" });
        }
        const jwt_payload = jsonwebtoken_1.default.verify(jwt_token, jwt_secret);
        // set that to req-body
        if (!req.body) {
            req.body = { username: jwt_payload.username };
        }
        else {
            req.body.username = jwt_payload.username;
        }
        next();
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ msg: "jwt token expired" });
        }
        else if (e instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res
                .status(401)
                .json({ msg: "invalid jwt token", error: e.message });
        }
        else {
            console.error("Error in auth-middleware:\n", e);
            return res.status(500).json({ msg: "Internal server error" });
        }
    }
}
//# sourceMappingURL=auth.js.map