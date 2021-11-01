"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileController = void 0;
const UserProfileService_1 = require("../services/UserProfileService");
class UserProfileController {
    async handle(req, res) {
        console.log('↪️ GET request received at "/profile" route');
        const { user_id } = req.body;
        const service = new UserProfileService_1.UserProfileService();
        const result = await service.execute(user_id);
        console.log("\t✔️ Returning user profile");
        return res.json(result);
    }
}
exports.UserProfileController = UserProfileController;
