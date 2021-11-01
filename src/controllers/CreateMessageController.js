"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageController = void 0;
const CreateMessageService_1 = require("../services/CreateMessageService");
class CreateMessageController {
    async handle(req, res) {
        console.log('↪️ POST request received at "/messages" route');
        const { message } = req.body;
        const { user_id } = req;
        const service = new CreateMessageService_1.CreateMessageService();
        const result = await service.execute(message, user_id);
        console.log("\t✔️ Message stored successfully, returning data");
        res.json(result);
    }
}
exports.CreateMessageController = CreateMessageController;
