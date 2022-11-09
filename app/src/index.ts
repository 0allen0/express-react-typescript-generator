import './pre-start';
import { Logger } from 'tslog';
import EnvVars from '@src/configurations/EnvVars';
import server from './server';

const log: Logger = new Logger();

const msg = 'Express server started on port: ' + EnvVars.port.toString();
server.listen(EnvVars.port, () => log.info(msg));
