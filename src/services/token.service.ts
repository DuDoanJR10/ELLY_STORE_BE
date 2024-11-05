import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import config from '../common/configs/config';
import { ICreateToken } from '../types/Token';
import { TokenTypes } from '../common/constants/token.constant';
import TokenModel from '../models/token.model';

class TokenService {
  async generateAuthTokens(user: UserModel) {
    const accessToken = await this.generateToken({ user: user.id || '', type: TokenTypes.ACCESS, role: user.role, name: user.name });
    const refreshToken = await this.generateToken({ user: user.id || '', type: TokenTypes.REFRESH, role: user.role, name: user.name });

    return { accessToken, refreshToken };
  }

  async generateToken(tokenDto: ICreateToken) {
    const { user, type, role, name } = tokenDto;

    let expires = Math.floor(Date.now() / 1000);

    switch (type) {
      case TokenTypes.ACCESS:
        expires += 1440 * 60;
        break;
      case TokenTypes.REFRESH:
        expires += 30 * 86_400;
        break;
      case TokenTypes.ADMIN_ACCESS:
        expires += 1440 * 60;
        break;
      case TokenTypes.ADMIN_REFRESH:
        expires += 30 * 86_400;
        break;
    }

    const payload = {
      user,
      type,
      role,
      name,
      exp: expires,
    }
    const expiresDate = new Date(expires * 1000);
    const token = jwt.sign(payload, config.key_scrert);

    await TokenModel.create({
      token,
      userId: user,
      type,
      role,
      expire: expiresDate,
    })

    return {
      token,
      expires: expiresDate,
    }
  }

  async removeTokenUser(user: UserModel) {
    await TokenModel.destroy({
      where: {
        userId: user.id,
      }
    });
  }

  async verifyToken(token: string, type: string) {
    const payload = jwt.verify(token, config.key_scrert);
    const tokenDoc = await TokenModel.findOne({
      where: {
        token,
        type,
      }
    });
    if (!tokenDoc) {
      return null
    }

    if (tokenDoc.expire < new Date()) {
      await tokenDoc.destroy();
      return null;
    }

    return tokenDoc;
  }
}

export default new TokenService();