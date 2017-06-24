/**
 * @file common/utils/commonUtils.js 常用工具集
 * @author fio
 */
import moment from 'moment';

function typeOf(obj) {
    return toString.call(obj).slice(8, -1);
}

export function isBrowser() {
    return typeof window !== 'undefined';
}

export function download(filename, obj) {
    const content = JSON.stringify(obj);
    const blob = new Blob([content], {type: 'text/plain'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.style = 'display: none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 50);
}

export function toDateTime(utcTimeStr) {
    return moment(utcTimeStr).format('YYYY-MM-DD HH:mm:ss');
}

export function setLocalStorage(name, content) {
    if (window.localStorage) {
        const iotdm = window.localStorage.iotdm ? JSON.parse(window.localStorage.iotdm) : {};
        iotdm[name] = content;
        window.localStorage.iotdm = JSON.stringify(iotdm);
    } else {
        alert('This browser not supports localStorage');
    }
}

export function getLocalStorage(name, content) {
    if (window.localStorage) {
        const iotdm = window.localStorage.iotdm ? JSON.parse(window.localStorage.iotdm) : {};
        return iotdm[name];
    } else {
        alert('This browser not supports localStorage');
    }
}
