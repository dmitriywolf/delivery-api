import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import { AppError } from '#root/utils/index.js';

// import fs from 'fs';
// import multer from 'multer';

import {
  authRouter,
  seekerRouter,
  employerRouter,
  resumeRouter,
  jobRouter,
} from '#root/routes/index.js';

const app = express();
app.use(express.static('public'));

// const storage = multer.diskStorage({
//   destination: (_, __, cb) => {
//     if (!fs.existsSync('uploads')) {
//       fs.mkdirSync('uploads');
//     }
//     cb(null, 'uploads');
//   },
//   filename: (_, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  limit: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use(express.json());
app.use(cors());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

app.use('/uploads', express.static('uploads'));
// app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
//   res.json({
//     url: `/uploads/${req.file.originalname}`,
//   });
// });

// Routes
app.get('/', (req, res) => {
  res.send('HELLO TO JOB MAGAZINE API');
});
app.use('/api/auth', authRouter);
app.use('/api/seekers', seekerRouter);
app.use('/api/employers', employerRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/jobs', jobRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

export default app;
