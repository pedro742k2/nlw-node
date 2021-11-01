"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubAuthController = void 0;
class GithubAuthController {
    handle(req, res) {
        const { GITHUB_CLIENT_ID } = process.env;
        console.log('↪️ GET request received at "/github_auth" route');
        if (!GITHUB_CLIENT_ID) {
            console.log("\t❌ No github client ID detected, responding with an error message");
            return res
                .status(500)
                .json({ error: true, message: "No Client ID was found" });
        }
        console.log("\t✔️ Redirected to github signin URl");
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`);
    }
}
exports.GithubAuthController = GithubAuthController;
