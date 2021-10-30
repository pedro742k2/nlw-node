import { Request, Response } from "express";
import { UserProfileService } from "../services/UserProfileService";

class UserProfileController {
  async handle(req: Request, res: Response) {
    console.log('↪️ GET request received at "/profile" route');
    const { user_id } = req.body;

    const service = new UserProfileService();
    const result = await service.execute(user_id);

    console.log("\t✔️ Returning user profile");
    return res.json(result);
  }
}

export { UserProfileController };
