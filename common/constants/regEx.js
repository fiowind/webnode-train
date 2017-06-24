/**
 * @file regex
 * @author fio
 */
export const reg = {
    'name': {pattern: /^(?!-)[a-zA-Z0-9-_]{2,32}$/, message: '由英文字符、数字、下划线“_”和连字符“-”组成，2-32个字符'},
    'description': {pattern: /^[\s\S]{2,32}$/, message: '2-32个字符'},
    'propertyName': {pattern: /^[a-zA-Z0-9-_]{2,32}$/, message: '英文字符，2-32个字符'},
    'number': {pattern: /^(-?\d+)(\.\d+)?$/, message: '输入数字'},
    'bool': {pattern: /^false$|^true$/, message: 'false或者true'},
    'string': {max: 20, message: '不要超过20个字符'}
};
