import bcrypt from 'bcrypt';
import { RES_ERRORS, ROLES } from '#root/common/constants.js';
import { AccountModel, SeekerModel, EmployerModel, CompanyModel } from '#root/models/index.js';
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

    // Проверка почты
    const accountExist = await AccountModel.findOne({
      email,
    });

    if (accountExist) {
      return res.status(400).json({ message: 'Email address already exists' });
    }

    // Шифруем пароль
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let account = null;

    if (role === ROLES.seeker) {
      const seeker = new SeekerModel({
        firstName,
        lastName,
        email,
        passwordHash: hash,
      });

      const seekerData = await seeker.save();

      account = seekerData._doc;
    } else if (role === ROLES.employer) {
      // Создаем нового работодателя
      const employer = new EmployerModel({
        firstName,
        lastName,
        email,
        passwordHash: hash,
      });

      const employerData = await employer.save();

      // Создаем под него компанию
      const company = new CompanyModel({
        employer: employerData._doc._id,
        name: `${employerData._doc.firstName} ${employerData._doc.lastName}`,
      });

      const companyData = await company.save();

      // Присваиваем роботодателю компанию
      const updatedEmployer = await EmployerModel.findOneAndUpdate(
        { _id: employerData._doc._id },
        {
          company: companyData._doc._id,
        },
        {
          new: true,
        },
      );

      account = updatedEmployer._doc;
    } else {
      res.status(400).json({
        message: 'Invalid user input',
      });
    }

    const activatAccountToken = createVerifyEmailToken({
      _id: account._id,
    });

    const activateUrl = `${process.env.BASE_URL}/auth/verify-email/${activatAccountToken}`;

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
    console.log(err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const account = await AccountModel.findOne({ email: req.body.email });

    if (!account) {
      return res.status(404).json({
        message: 'Invalid login or password',
      });
    }

    if (!account.emailVerified) {
      return res.status(400).json({
        message: 'Please verify you email at first.',
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

    const user = await AccountModel.findById(activateToken?._id);

    if (!user) {
      return res.status(400).json({ message: 'This account no longer exist.' });
    }

    if (user.emailVerified === true) {
      return res.status(400).json({ message: 'Email address already verified.' });
    }

    await AccountModel.findByIdAndUpdate(user.id, { emailVerified: true });

    res.status(200).json({
      message: 'Your account has beeen successfully verified.',
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: RES_ERRORS.internal_server_error });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const account = await AccountModel.findOne({ email });

    if (!account) {
      return res.status(400).json({ message: 'This email does not exist.' });
    }

    const resetPasswordToken = createResetPasswordToken({
      _id: account._id,
    });

    const resetUrl = `${process.env.BASE_URL}/auth/reset-password/${resetPasswordToken}`;

    await sendMail({
      to: email,
      userName: `${account.firstName} ${account.lastName}`,
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

    const account = await AccountModel.findById(resetToken._id);

    if (!account) {
      return res.status(400).json({ message: 'This account no longer exist.' });
    }

    // Шифруем пароль
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await AccountModel.findByIdAndUpdate(account._id, { passwordHash: hash });

    res.status(200).json({
      message: 'Your account password has beeen successfully updated.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: RES_ERRORS.internal_server_error });
  }
};
