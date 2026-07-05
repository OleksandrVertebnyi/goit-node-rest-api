import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';
import fs from 'fs/promises';
import path from 'path';
import Jimp from 'jimp';

import User from '../models/user.js';
import HttpError from '../helpers/HttpError.js';
import sendEmail from '../services/sendEmail.js';
// ================= REGISTER =================
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw HttpError(409, 'Email in use');
    }
    
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verify: false,
      verificationToken,
    });

    // Формуємо лист з посиланням для верифікації
    const verifyEmailHtml = {
      to: email,
      subject: "Verify your email",
      html: `<a target="_blank" href="${process.env.BASE_URL}/users/verify/${verificationToken}">Click here to verify your email</a>`,
    };

    // Відправляємо лист через налаштовану пошту Meta
    await sendEmail(verifyEmailHtml);

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ================= LOGIN =================
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // 2.перевірка наявності корисувача
    if (!user) {
      throw HttpError(401, 'Email or password is wrong');
    }

    // 2.певірка відправлення пошти
    if(!user.verify) {
      throw HttpError(401, 'Email not verified');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ================= CURRENT =================
export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

// ================= LOGOUT =================
export const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send();
};

// ================= UPDATE AVATAR =================
export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, 'Avatar file is required');
    }

    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.resolve('public', 'avatars', filename);

    const image = await Jimp.read(tempUpload);
    image.cover(250, 250);
    await image.writeAsync(resultUpload);
    await fs.unlink(tempUpload);

    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

// ================= VERIFY EMAIL =================
export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw HttpError(404, "User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

// ================= RESEND VERIFY EMAIL =================
export const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw HttpError(400, "missing required field email");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmailHtml = {
      to: email,
      subject: "Verify your email",
      html: `<a target="_blank" href="${process.env.BASE_URL}/users/verify/${user.verificationToken}">Click here to verify your email</a>`,
    };

    await sendEmail(verifyEmailHtml);

    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};