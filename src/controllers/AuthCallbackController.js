"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCallbackController = void 0;
class AuthCallbackController {
    handle(req, res) {
        const { code } = req.query;
        console.log('↪️ GET request received at "/signin/callback" route');
        if (!code) {
            console.log("\t❌ No code token was received, responding with an error message");
            return res
                .status(500)
                .json({ error: true, message: "No code token was received" });
        }
        console.log("\t✔️ Sent token code to user", code);
        res.json({ accessToken: code });
    }
}
exports.AuthCallbackController = AuthCallbackController;
