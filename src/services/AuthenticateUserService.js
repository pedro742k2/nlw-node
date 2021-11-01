"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserService = void 0;
const axios_1 = __importDefault(require("axios"));
const prisma_1 = __importDefault(require("../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthenticateUserService {
    async execute(code) {
        const url = "https://github.com/login/oauth/access_token";
        const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
        if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET)
            return {
                error: true,
                message: 'Missing data at "AuthenticateUserService"',
            };
        // Receber token
        const { data: accessTokenResponse } = await axios_1.default.post(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                Accept: "application/json",
            },
        });
        const gh_token = accessTokenResponse === null || accessTokenResponse === void 0 ? void 0 : accessTokenResponse.access_token;
        // Caso nenhum token seja recebido, é retornado o código de erro
        if (!gh_token)
            return accessTokenResponse;
        // Procurar informações do usuário no github com o token de acesso
        const { data: githubUserInfo } = await axios_1.default.get("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`,
            },
        });
        const { login, id, avatar_url, html_url, name } = githubUserInfo;
        let user = await prisma_1.default.user.findFirst({
            where: { github_id: id },
        });
        if (!user) {
            user = await prisma_1.default.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name,
                },
            });
        }
        const jwt_token = (0, jsonwebtoken_1.sign)({
            user: {
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id,
            },
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: "1d",
        });
        return {
            jwt_token,
            user: {
                login,
                id,
                avatar_url,
                html_url,
                name,
            },
        };
    }
}
exports.AuthenticateUserService = AuthenticateUserService;
