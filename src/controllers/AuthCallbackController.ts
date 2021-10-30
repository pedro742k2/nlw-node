import { Request, Response } from "express";

class AuthCallbackController {
  handle(req: Request, res: Response) {
    const { code } = req.query;

    console.log('↪️ GET request received at "/signin/callback" route');

    if (!code) {
      console.log(
        "\t❌ No code token was received, responding with an error message"
      );

      return res
        .status(500)
        .json({ error: true, message: "No code token was received" });
    }

    console.log("\t✔️ Sent token code to user", code);

    res.json({ accessToken: code });
  }
}

export { AuthCallbackController };
