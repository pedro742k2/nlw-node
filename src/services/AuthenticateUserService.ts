import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

interface IAccessTokenResponse {
  access_token: any;
  error: string;
  message: string;
}

interface IGHUserInfo {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET)
      return {
        error: true,
        message: 'Missing data at "AuthenticateUserService"',
      };

    // Receber token
    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },

        headers: {
          Accept: "application/json",
        },
      });

    const gh_token = accessTokenResponse?.access_token;

    // Caso nenhum token seja recebido, é retornado o código de erro
    if (!gh_token) return accessTokenResponse;

    // Procurar informações do usuário no github com o token de acesso
    const { data: githubUserInfo } = await axios.get<IGHUserInfo>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { login, id, avatar_url, html_url, name } = githubUserInfo;

    let user = await prismaClient.user.findFirst({
      where: { github_id: id },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    const jwt_token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

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

export { AuthenticateUserService };
