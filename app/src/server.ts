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

if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

if (EnvVars.nodeEnv === NodeEnvs.Prod) {
  app.use(helmet());
}

app.use('/api', BaseRouter);

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

const root = path.join(__dirname, './build');

app.use('/', express.static(root));
// Nav to login pg by default
app.get('*', function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, './build', 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

export default app;
