import pino, { Logger } from 'pino';
import koaPinoLogger from 'koa-pino-logger';
import { name, version } from '../../package.json';
const papertrail = require('pino-papertrail');
const pinoms = require('pino-multi-stream');
// const noir = require('pino-noir');
// papertrail does not support redact, maybe noir should be used instead

const prettyPrintOpts = {
  prettyPrint: true,
  redact: { paths: ['req.headers', 'res.headers'], remove: true },
};

let logger: Logger;
if (process.env.NODE_ENV !== 'production') {
  logger = pino(prettyPrintOpts);
} else {
  const options = {
    appname: `${name} : ${version}`,
    host: 'hidden.papertrailapp.com',
    port: 12345,
    // Only send msg property as message to papertrail
    // message-only: true,
  };
  const prettyStream = pinoms.prettyStream(prettyPrintOpts);
  const writeStream = papertrail.createWriteStream(options);
  logger = pinoms({ streams: [prettyStream, writeStream] });
}

function getLogger(filename: string) {
  return logger.child({ filename });
}

const koaPino = koaPinoLogger({
  logger,
});
export { getLogger, koaPino };
