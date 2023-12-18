import { CompanyModel } from '#root/models/index.js';

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await CompanyModel.find();
    res.status(200).json({
      companies,
    });
  } catch (err) {
    console.log('[getAllCompanies]', err);
    res.status(500).json({
      message: 'Не удалось получить компанию',
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const compantId = req.params.id;
    const result = await CompanyModel.findOne({ _id: compantId }).populate('employer');
    const company = result._doc;
    const { passwordHash, __v, ...employerView } = company.employer._doc;

    res.status(200).json({
      company: {
        ...company,
        employer: {
          ...employerView,
        },
      },
    });
  } catch (err) {
    console.log('[getCompanyById]', err);

    res.status(500).json({
      message: 'Не удалось получить компанию',
    });
  }
};

export const updateCompanyById = async (req, res) => {
  try {
    const compantId = req.params.id;
    const { name, website, douPage, logo, employeesCount } = req.body;

    const updatedCompany = await CompanyModel.findOneAndUpdate(
      { _id: compantId },
      {
        name,
        website,
        douPage,
        logo,
        employeesCount,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      company: updatedCompany,
    });
  } catch (err) {
    console.log('[updateCompanyById]', err);

    res.status(500).json({
      message: 'Не удалось обновить компанию',
    });
  }
};
