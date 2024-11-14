const winston = require('winston');

exports.logger = winston.createLogger({
    // level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
    level: 'debug',
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
    ],
});