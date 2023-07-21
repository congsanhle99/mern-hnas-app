import { createUser } from "../services/auth.service.js";
import { generateToken } from "../services/token.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, picture, status, password } = req.body;
    const newUser = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });

    const access_token = await generateToken({ userId: newUser._id }, "1d", process.env.ACCESS_TOKEN_SECRET);

    const refresh_token = await generateToken({ userId: newUser._id }, "30d", process.env.REFRESH_TOKEN_SECRET);

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    console.log({ access_token, refresh_token });

    res.json({
      message: "Register success!",
      access_token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser._email,
        picture: newUser._picture,
        status: newUser.status,
      },
    });
  } catch (error) {
    // res.status(500).json({message: error.message})
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
  } catch (error) {
    // res.status(500).json({message: error.message})
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
  } catch (error) {
    // res.status(500).json({message: error.message})
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    // res.status(500).json({message: error.message})
    next(error);
  }
};
