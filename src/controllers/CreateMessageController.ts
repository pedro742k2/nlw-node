import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
  async handle(req: Request, res: Response) {
    console.log('↪️ POST request received at "/messages" route');

    const { message } = req.body;
    const { user_id } = req;

    const service = new CreateMessageService();
    const result = await service.execute(message, user_id);

    console.log("\t✔️ Message stored successfully, returning data");
    res.json(result);
  }
}

export { CreateMessageController };
