import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    console.log('↪️ POST request received at "/authenticate" route');

    const { code } = req.body;

    if (!code) {
      console.log('\t❌ Missing code on "AuthenticateUserController"');

      return res.status(403).json({
        error: true,
        message: 'Missing code on "AuthenticateUserController"',
      });
    }

    const service = new AuthenticateUserService();
    const result = await service.execute(code);

    const error = result?.error;

    if (error) {
      if (error === "bad_verification_code") {
        console.log(
          '\t❌ The code passed is incorrect or expired on "AuthenticateUserService"'
        );
      } else {
        console.log(`\t❌ ${result.message}`);
      }

      return res.status(403).json(result);
    }

    console.log("\t✔️ Returned the result");

    return res.json(result);
  }
}

export { AuthenticateUserController };
