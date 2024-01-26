import express from 'express';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import multer from 'multer';
import helmet from 'helmet';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
// import { rateLimit } from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import { AppError } from '#root/utils/index.js';

import {
  authRouter,
  seekerRouter,
  employerRouter,
  resumeRouter,
  jobRouter,
  chatRouter,
  messageRouter,
  docRouter,
  statsRouter,
} from '#root/routes/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Set security HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// const limiter = rateLimit({
//   limit: 100,
//   windowMs: 15 * 60 * 1000,
//   message: 'Too many request from this IP, please try again in an hour!',
// });
// Apply the rate limiting middleware to all requests.
// app.use(limiter);

app.use(express.json());
app.use(upload.single('file'));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('HELLO TO JOB MAGAZINE API');
});
app.use('/api/auth', authRouter);
app.use('/api/seekers', seekerRouter);
app.use('/api/employers', employerRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);
app.use('/api/docs', docRouter);
app.use('/api/statistics', statsRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

export default app;
