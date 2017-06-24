/**
 * @file define loggers
 * ALL: new Level(Number.MIN_VALUE, "ALL"),
 * TRACE: new Level(5000, "TRACE"),
 * DEBUG: new Level(10000, "DEBUG"),
 * INFO: new Level(20000, "INFO"),
 * WARN: new Level(30000, "WARN"),
 * ERROR: new Level(40000, "ERROR"),
 * FATAL: new Level(50000, "FATAL"),
 * MARK: new Level(9007199254740992, "MARK"), // 2^53
 * OFF: new Level(Number.MAX_VALUE, "OFF")
 * @author fio <zhoufangxing@baidu.com>
 */

import log4js from 'log4js';
import config from 'config';

const defaultCategory = config.get('logging.defaultCategory');

log4js.configure({
    appenders: [{type: 'console'}]
});

function newLoggerWithCategory(filename, category, level) {
    log4js.loadAppender('dateFile');
    log4js.addAppender(log4js.appenders.dateFile(filename, '.yyyyMMdd', false), category);

    const log = log4js.getLogger(category);
    log.setLevel(level);
    return log;
}

export default function initAllLogger(path, scope) {
    const globalPath = `${path}${defaultCategory.toString()}_${process.env.pm_id || 1}.log`;
    global.logger = newLoggerWithCategory(globalPath, defaultCategory, config.get('logging.defaultLevel'));

    log4js.loadAppender('logLevelFilter');
    log4js.addAppender(log4js.appenders.logLevelFilter(
        'ERROR', 'FATAL',
        log4js.appenders.dateFile(`${path}error.log`, '.yyyyMMdd', false)
    ));
}

