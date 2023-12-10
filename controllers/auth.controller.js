import bcrypt from 'bcrypt';
import { RES_ERRORS } from '#root/common/constants.js';
import { UserModel } from '#root/models/index.js';
import {
  createVerifyEmailToken,
  checkVerifyEmailToken,
  createResetPasswordToken,
  checkResetPasswordToken,
  createAuthToken,
  sendMail,
} from '#root/utils/index.js';
import { activateAccountTemplate, resetPasswordTemplate } from '#root/emailTemplates/index.js';

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Проверка почты
    const existedUser = await UserModel.findOne({
      email,
    });

    if (existedUser) {
      return res.status(400).json({ message: 'Email address already exists' });
    }

    // Шифруем пароль
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Создаем пользователя
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      passwordHash: hash,
    });

    await newUser.save();

    const activatAccountToken = createVerifyEmailToken({
      _id: newUser._id,
    });

    const activateUrl = `${process.env.BASE_URL}/auth/verify-email/${activatAccountToken}`;

    await sendMail({
      to: newUser.email,
      userName: `${newUser.firstName} ${newUser.lastName}`,
      emailLink: activateUrl,
      subject: 'Verify your email address',
      template: activateAccountTemplate,
    });

    res.status(201).json({
      message: 'Register success! Please check your email and activate your account to start',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Invalid login or password',
      });
    }

    if (!user.emailVerified) {
      return res.status(400).json({
        message: 'Please verify you email at first.',
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Invalid login or password',
      });
    }

    const authAccountToken = createAuthToken({
      _id: user._id,
    });

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({
      user: { ...userData },
      token: authAccountToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    const activateToken = checkVerifyEmailToken(code);

    const user = await UserModel.findById(activateToken?._id);

    if (!user) {
      return res.status(400).json({ message: 'This account no longer exist.' });
    }

    if (user.emailVerified === true) {
      return res.status(400).json({ message: 'Email address already verified.' });
    }

    await UserModel.findByIdAndUpdate(user.id, { emailVerified: true });

    res.status(200).json({
      message: 'Your account has beeen successfully verified.',
    });
  } catch (error) {
    res.status(500).json({ message: RES_ERRORS.internal_server_error });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'This email does not exist.' });
    }

    const resetPasswordToken = createResetPasswordToken({
      _id: user._id,
    });

    const resetUrl = `${process.env.BASE_URL}/auth/reset-password/${resetPasswordToken}`;

    await sendMail({
      to: email,
      userName: `${user.firstName} ${user.lastName}`,
      emailLink: resetUrl,
      subject: 'Reset your password',
      template: resetPasswordTemplate,
    });

    res.status(200).json({
      message: 'An email has been sent to you, use it to reset your password.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: RES_ERRORS.internal_server_error });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { code, password } = req.body;

    const resetToken = checkResetPasswordToken(code);

    const user = await UserModel.findById(resetToken._id);

    if (!user) {
      return res.status(400).json({ message: 'This account no longer exist.' });
    }

    // Шифруем пароль
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await UserModel.findByIdAndUpdate(user._id, { passwordHash: hash });

    res.status(200).json({
      message: 'Your account password has beeen successfully updated.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: RES_ERRORS.internal_server_error });
  }
};
