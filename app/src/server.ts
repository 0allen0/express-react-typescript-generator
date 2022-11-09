import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import BaseRouter from './routes/api';
import { Logger } from 'tslog';
import EnvVars from '@src/configurations/EnvVars';
import HttpStatusCodes from '@src/configurations/HttpStatusCodes';
import { NodeEnvs } from '@src/declarations/enums';
import { RouteError } from '@src/declarations/classes';

const log: Logger = new Logger();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.nodeEnv === NodeEnvs.Prod) {
  app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

// Setup error handler
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    log.error(err, true);
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
      status = err.status;
    }
    return res.status(status).json({ error: err.message });
  }
);

// Set views directory (html)
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// Nav to login pg by default
app.get('/', (_: Request, res: Response) => {
  res.sendFile('test.html', { root: viewsDir });
});

export default app;
