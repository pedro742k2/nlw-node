"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const AuthenticateUserController_1 = require("./controllers/AuthenticateUserController");
const AuthCallbackController_1 = require("./controllers/AuthCallbackController");
const CreateMessageController_1 = require("./controllers/CreateMessageController");
const GetLastMessagesController_1 = require("./controllers/GetLastMessagesController");
const GithubAuthController_1 = require("./controllers/GithubAuthController");
const UserProfileController_1 = require("./controllers/UserProfileController");
const ensureAuthenticated_1 = require("./middleware/ensureAuthenticated");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/github_auth", new GithubAuthController_1.GithubAuthController().handle);
router.get("/signin/callback", new AuthCallbackController_1.AuthCallbackController().handle);
router.post("/authenticate", new AuthenticateUserController_1.AuthenticateUserController().handle);
router.post("/messages", ensureAuthenticated_1.ensureAuthenticated, new CreateMessageController_1.CreateMessageController().handle);
router.get("/messages/last3", new GetLastMessagesController_1.GetLastMessagesController().handle);
router.get("/profile", ensureAuthenticated_1.ensureAuthenticated, new UserProfileController_1.UserProfileController().handle);
