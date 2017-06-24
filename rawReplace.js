/**
 * @file 公共文件打包
 * @author fio
 */

'use strict';

const loaderUtils = require('loader-utils');

module.exports = function (content) {
    const query = loaderUtils.parseQuery(this.query);
    if (this.cacheable) {
        this.cacheable();
    }
    Object.keys(query).forEach(key => {
        content = content.replace(new RegExp(key, 'g'), query[key]);
    });
    this.value = content;
    return 'module.exports = ' + JSON.stringify(content);
};
