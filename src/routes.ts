import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { AuthCallbackController } from "./controllers/AuthCallbackController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLastMessagesController } from "./controllers/GetLastMessagesController";
import { GithubAuthController } from "./controllers/GithubAuthController";
import { UserProfileController } from "./controllers/UserProfileController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.get("/github_auth", new GithubAuthController().handle);

router.get("/signin/callback", new AuthCallbackController().handle);

router.post("/authenticate", new AuthenticateUserController().handle);

router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

router.get("/messages/last3", new GetLastMessagesController().handle);

router.get("/profile", ensureAuthenticated, new UserProfileController().handle);

export { router };
