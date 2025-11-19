import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { prisma } from "../utils/PrismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  accessTokenOption,
  generateAccessAndRefreshToken,
  refreshTokenOption,
} from "../utils/tokens.js";
const userRegistration = asyncHandler(async (req, res, next) => {
  console.log(process.env.DATABASE_URL);
  const { email, name, password } = req.body;
  const isuserRegister = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (isuserRegister) {
    return res
      .status(400)
      .json(new ApiResponse(400, isuserRegister, "user already exist"));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const registerUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashPassword,
    },
  });
  if (!registerUser) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Error while registering the user"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, registerUser, "registration is successful"));
});

const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const isUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!isUser) {
    return res.status(400).json(new ApiResponse(400, "", "user not existed "));
  }
  const passwordMatch = await bcrypt.compare(password, isUser.password);
  if (!passwordMatch) {
    return res
      .status(400)
      .json(new ApiResponse(400, "", "password is incorrect"));
  }
  const { access, refresh } = generateAccessAndRefreshToken(isUser);

  return res
    .status(200)
    .cookie("accessToken", access, accessTokenOption)
    .cookie("refreshToken", refresh, refreshTokenOption)
    .json(new ApiResponse(200, { access }, "user login successfully"));
});

const refreshTokens = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res
      .status(401)
      .json(new ApiResponse(401, "", "Refresh token missing"));
  }
  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECRET!);
  } catch (error) {
    return res
      .status(401)
      .json(new ApiResponse(401, "", "Invalid or expired refresh token"));
  }
  const userId = payload?.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return res.status(400).json(new ApiResponse(400, "", "No user found"));
  }
  const { access, refresh } = generateAccessAndRefreshToken(user);
  return res
    .status(200)
    .cookie("accessToken", access, accessTokenOption)
    .cookie("refreshToken", refresh, refreshTokenOption)
    .json(new ApiResponse(200, "", "accessToken refresh successfully"));
});

export { userRegistration, userLogin, refreshTokens };
