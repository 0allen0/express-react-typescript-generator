import { Router, Request, Response } from 'express';
import HttpStatusCodes from '@src/configurations/HttpStatusCodes';

const apiRouter = Router();

apiRouter.get('/heart', (req: Request, res: Response) => {
  res.status(HttpStatusCodes.OK).send('boom');
});

export default apiRouter;
