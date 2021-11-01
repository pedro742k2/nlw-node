"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLastMessagesController = void 0;
const GetLastMessagesServices_1 = require("../services/GetLastMessagesServices");
class GetLastMessagesController {
    async handle(req, res) {
        console.log('↪️ GET request received at "/messages/last3" route');
        const service = new GetLastMessagesServices_1.GetLastMessagesService();
        const result = await service.execute();
        console.log("\t✔️ Messages successfully taken, returning data");
        return res.json(result);
    }
}
exports.GetLastMessagesController = GetLastMessagesController;
