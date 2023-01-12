const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const shipmentRouter = require('./routes/shipmentRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const clientRouter = require('./routes/clientRoutes');

// Start express app
const app = express();

// GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet.contentSecurityPolicy({
  directives: {
    scriptSrc: ['\'self\'', 'https://cdnjs.cloudflare.com'],
  },
}))
;
app.set('view engine', 'ejs');

// could also be './views', but this is safer
app.set('views', path.join(__dirname, 'views/pages'));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
// ToDo finalize options
app.use(mongoSanitize({
  whitelist: [
    'client', 'amount',
  ],
}));

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// ROUTES
app.use('/', viewRouter);
app.use('/api/v1/shipments', shipmentRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/clients', clientRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
