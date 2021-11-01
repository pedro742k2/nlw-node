"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(req, res, next) {
    console.log("↪️ Authenticating user ...");
    const authToken = req.headers.authorization;
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
        console.log("\t❌ There was a problem at ensureAuthenticated middleware with JWT_SECRET environment constant");
        return res
            .status(500)
            .json("There was a problem at ensureAuthenticated middleware with JWT_SECRET environment constant");
    }
    if (!authToken) {
        console.log("\t❌ Invalid token");
        return res.status(401).json({
            error: "Invalid token",
        });
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
        req.user_id = sub;
        console.log("\t✔️ User authenticated successfully");
        return next();
    }
    catch (_a) {
        console.log("\t❌ Expired token");
        res.status(401).json({ error: "Expired token" });
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
