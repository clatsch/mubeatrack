import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import path from 'path';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import shipmentRouter from './routes/shipmentRoutes.js';
import userRouter from './routes/userRoutes.js';
import viewRouter from './routes/viewRoutes.js';
import customerRouter from './routes/customerRoutes.js';

const app = express();

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'cdnjs.cloudflare.com', 'code.jquery.com', 'cdn.datatables.net'],
        connectSrc: ["'self'", 'http://localhost:3000'],
      },
    })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use(
    mongoSanitize({
      whitelist: ['customer', 'amount'],
    })
);

app.use(xss());
app.use(hpp());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/shipments', shipmentRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/customers', customerRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
