"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
const AuthenticateUserService_1 = require("../services/AuthenticateUserService");
class AuthenticateUserController {
    async handle(req, res) {
        console.log('↪️ POST request received at "/authenticate" route');
        const { code } = req.body;
        if (!code) {
            console.log('\t❌ Missing code on "AuthenticateUserController"');
            return res.status(403).json({
                error: true,
                message: 'Missing code on "AuthenticateUserController"',
            });
        }
        const service = new AuthenticateUserService_1.AuthenticateUserService();
        const result = await service.execute(code);
        const error = result === null || result === void 0 ? void 0 : result.error;
        if (error) {
            if (error === "bad_verification_code") {
                console.log('\t❌ The code passed is incorrect or expired on "AuthenticateUserService"');
            }
            else {
                console.log(`\t❌ ${result.message}`);
            }
            return res.status(403).json(result);
        }
        console.log("\t✔️ Returned the result");
        return res.json(result);
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
