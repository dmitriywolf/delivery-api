import bcrypt from 'bcrypt';
import { RES_ERRORS, ROLES } from '#root/common/constants.js';
import { Account, Seeker, Employer, Resume } from '#root/models/index.js';
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
    const { firstName, lastName, email, password, role } = req.body;

    // Check email
    const accountExist = await Account.findOne({
      email,
    });

    if (accountExist) {
      return res.status(400).json({ message: 'Email address already exists' });
    }

    // Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let account = null;

    if (role === ROLES.seeker) {
      // Make new seeker account
      const seeker = new Seeker({
        firstName,
        lastName,
        email,
        passwordHash: hash,
      });

      // Make resume for him
      const resume = new Resume({
        owner: seeker._id,
      });

      seeker.resume = resume._id;

      const seekerData = await seeker.save();
      await resume.save();

      account = seekerData._doc;
    } else if (role === ROLES.employer) {
      // Make new Employer
      const employer = new Employer({
        firstName,
        lastName,
        email,
        passwordHash: hash,
      });

      const employerData = await employer.save();
      account = employerData._doc;
    } else {
      res.status(400).json({
        message: 'Invalid user input',
      });
    }

    const activatAccountToken = createVerifyEmailToken({
      _id: account._id,
    });

    const activateUrl = `${process.env.FRONT_DOMAIN}/auth/verify-email/${activatAccountToken}`;

    await sendMail({
      to: account.email,
      userName: `${account.firstName} ${account.lastName}`,
      emailLink: activateUrl,
      subject: 'Verify your email address',
      template: activateAccountTemplate,
    });

    res.status(201).json({
      message: 'Register success! Please check your email and activate your account to start',
    });
  } catch (err) {
    console.log('ERROR [register]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const account = await Account.findOne({ email: req.body.email });

    if (!account) {
      return res.status(404).json({
        message: 'Invalid login or password',
      });
    }

    if (!account.emailVerified) {
      return res.status(400).json({
        message: 'Please verify you email at first',
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, account._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Invalid login or password',
      });
    }

    const authAccountToken = createAuthToken({
      _id: account._id,
    });

    const { passwordHash, __v, ...userData } = account._doc;

    res.status(200).json({
      user: { ...userData },
      token: authAccountToken,
    });
  } catch (err) {
    console.log('ERROR [login]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    const activateToken = checkVerifyEmailToken(code);

    const user = await Account.findById(activateToken?._id);

    if (!user) {
      return res.status(400).json({ message: 'This account no longer exist' });
    }

    if (user.emailVerified === true) {
      return res.status(400).json({ message: 'Email address already verified' });
    }

    await Account.findByIdAndUpdate(user.id, { emailVerified: true });

    res.status(200).json({
      message: 'Your account has been successfully verified',
    });
  } catch (err) {
    console.log('ERROR [verifyEmail]', err);
    res.status(500).json({ message: RES_ERRORS.internal_server_error });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const account = await Account.findOne({ email });

    if (!account) {
      return res.status(400).json({ message: 'This email does not exist' });
    }

    const resetPasswordToken = createResetPasswordToken({
      _id: account._id,
    });

    const resetUrl = `${process.env.FRONT_DOMAIN}/auth/reset-password/${resetPasswordToken}`;

    await sendMail({
      to: email,
      userName: `${account.firstName} ${account.lastName}`,
      emailLink: resetUrl,
      subject: 'Reset your password',
      template: resetPasswordTemplate,
    });

    res.status(200).json({
      message: 'An email has been sent to you, use it to reset your password',
    });
  } catch (err) {
    console.log('ERROR [forgotPassword]', err);
    res.status(500).json({ message: RES_ERRORS.internal_server_error });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { code, password } = req.body;

    const resetToken = checkResetPasswordToken(code);

    const account = await Account.findById(resetToken._id);

    if (!account) {
      return res.status(400).json({ message: 'This account no longer exist' });
    }

    // Шифруем пароль
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await Account.findByIdAndUpdate(account._id, { passwordHash: hash });

    res.status(200).json({
      message: 'Your account password has beeen successfully updated',
    });
  } catch (err) {
    console.log('ERROR [resetPassword]', err);
    res.status(500).json({ message: RES_ERRORS.internal_server_error });
  }
};

export const getMe = async (req, res) => {
  try {
    const account = await Account.findById(req.userId);

    if (!account) {
      return res.status(404).json({
        message: RES_ERRORS.not_found,
      });
    }

    const { passwordHash, __v, ...accountData } = account._doc;
    res.status(200).json({ user: { ...accountData } });
  } catch (err) {
    console.log('ERROR [getMe]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};
