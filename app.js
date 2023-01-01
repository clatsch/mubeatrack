const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp')


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const shipmentRouter = require('./routes/shipmentRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

// Start express app
const app = express();

// GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());
app.set('view engine', 'pug');

// could also be './views', but this is safer
app.set('views', path.join(__dirname, 'views'));

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

// Data sanitization against NoSQL query injection
// ToDo finalize options
app.use(mongoSanitize({
  whitelist: [
    'client', 'amount',
  ],
}));

// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
app.use(hpp());


// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/', viewRouter);
app.use('/api/v1/shipments', shipmentRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
