import { Request, Response } from "express";
import { GetLastMessagesService } from "../services/GetLastMessagesServices";

class GetLastMessagesController {
  async handle(req: Request, res: Response) {
    console.log('↪️ GET request received at "/messages/last3" route');

    const service = new GetLastMessagesService();
    const result = await service.execute();

    console.log("\t✔️ Messages successfully taken, returning data");
    return res.json(result);
  }
}

export { GetLastMessagesController };
