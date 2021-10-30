import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    console.log(
      "\t❌ There was a problem at ensureAuthenticated middleware with JWT_SECRET environment constant"
    );
    return res
      .status(500)
      .json(
        "There was a problem at ensureAuthenticated middleware with JWT_SECRET environment constant"
      );
  }

  if (!authToken) {
    console.log("\t❌ Invalid token");
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  // Token structure: Bearer 752br793282d3218473kw0rcejghubvtrw84
  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, JWT_SECRET) as IPayload;

    req.user_id = sub;

    return next();
  } catch {
    console.log("\t❌ Expired token");
    res.status(401).json({ error: "Expired token" });
  }
}
