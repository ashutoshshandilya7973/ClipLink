import jwt from "jsonwebtoken";
import type { user } from "../types/types.js";
import type { CookieOptions } from "express";
const accessToken = (user: user) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.email,
    },
    process.env.JWT_ACCESSTOKEN_SECRET!,
    {
      expiresIn: "15m",
    }
  );
  return token;
};

const refreshToken = (user: user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_REFRESHTOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

const generateAccessAndRefreshToken = (user: user) => {
  const access = accessToken(user);
  const refresh = refreshToken(user);
  return { access, refresh };
};

const accessTokenOption :CookieOptions= {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 15 * 60 * 1000,
};

const refreshTokenOption :CookieOptions= {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export { generateAccessAndRefreshToken, accessTokenOption, refreshTokenOption };
