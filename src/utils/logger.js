import winston from "winston";
import * as dotenv from 'dotenv';
//import winston from 'winston/lib/winston/config/index.js';

dotenv.config();

const ENVIRONMENT = process.env.NODE_ENV;

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        'fatal': 'red',
        'error': 'red',
        'warning': 'yellow',
        'info': 'green',
        'http': 'blue',
        'debug': 'blue'
    }
};

winston.addColors(customLevelOptions.colors);

let logger;

if (ENVIRONMENT === 'production') {
    logger = winston.createLogger({
        levels: customLevelOptions.levels, // Establecer niveles personalizados
        transports: [
            new winston.transports.Console({
                level: 'http',
                format: winston.format.combine(
                    winston.format.colorize({ all: true }),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: 'logs/prod.log',
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({ all: true }),
                    winston.format.simple()
                )
            })
        ]
    });
} else {
    logger = winston.createLogger({
        levels: customLevelOptions.levels, // Establecer niveles personalizados
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({ all: true }),
                    winston.format.simple()
                )
           }),
           new winston.transports.File({
               filename: 'logs/dev.log',
               level: 'debug',
               format: winston.format.combine(
                   winston.format.colorize({ all: true }),
                   winston.format.simple()
               )
           })
       ]
    });
}



export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    req.logger.fatal(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    next();
};