"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class UserProfileService {
    async execute(user_id) {
        const user = await prisma_1.default.user.findFirst({
            where: { id: user_id },
        });
        return user;
    }
}
exports.UserProfileService = UserProfileService;
