// export const DB_URI =
//   process.env.NODE_ENV === 'production'
//     ? process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
//     : process.env.DATABASE_LOCALE;

export const DB_URI = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

export const PORT = process.env.PORT || 3000;
export const DEFAULT_USER_AVATAR = `uploads/avatar.jpg`;
export const DEFAULT_COMPANY_LOGO = `uploads/company-logo.png`;

export const RES_ERRORS = {
  bad_request: 'BAD_REQUEST', // 400
  unauthorized: 'UNAUTHORIZED', // 401
  forbidden: 'FORBIDDEN', // 403
  not_found: 'NOT_FOUND', // 404
  internal_server_error: 'INTERNAL SERVER ERROR', // 500
};

export const ROLES = {
  seeker: 'Seeker',
  employer: 'Employer',
  admin: 'Admin',
};

export const EXPERIENCE_LEVELS = [
  'Trainee/Intern',
  'Junior',
  'Middle',
  'Senior',
  'Team Lead',
  'Chief/Head of',
];

export const EMPLOYMENT = ['Remote work', 'Office', 'Part-time', 'Freelance (one-time projects)'];

export const ENGLISH_LEVELS = [
  'No English',
  'Beginner/Elementary',
  'Pre-Intermediate',
  'Intermediate',
  'Upper-Intermediate',
  'Advanced/Fluent',
];
