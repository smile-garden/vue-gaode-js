import moment from 'moment';

/**
 * 数字前补零
 *
 * @param {Number} number 数字
 * @returns {String} 补零后的数字
 */
export function prefixZero(number) {
  return `00${number}`.substr(number.length);
}

/**
 * 格式化时间
 *
 * @export
 * @param {Number} time 时间戳（毫秒）
 * @param {String} [fmt='YYYY-MM-DD HH:mm:ss'] 时间格式
 * @returns {String} 格式化的时间
 */
export function formatTime(time, fmt = 'YYYY-MM-DD HH:mm:ss') {
  const date = new Date(Number(time));
  let result;

  if (!time) {
    return '';
  }

  if (/(Y+)/.test(fmt)) {
    result = fmt.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length));
  }

  const obj = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };

  Object.keys(obj).forEach((key) => {
    if (new RegExp(`(${key})`).test(result)) {
      const value = String(obj[key]);
      result = result.replace(RegExp.$1, (RegExp.$1.length === 1) ? value : prefixZero(value));
    }
  });

  return result;
}

/**
 * 格式化时间范围
 *
 * @export
 * @param { Array } times 时间范围
 * @param { String } [fmt='YYYY-MM-DD HH:mm:ss'] 时间格式
 * @returns { [Array, String] } 格式化后的时间范围
 */
export function formatRangeTime(times, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!times || times.length < 2) {
    return '';
  }
  return times.map(time => time.format(fmt));
}

/**
 * 把时间范围转化为Moment对象
 *
 * @export
 * @param { Array } times 时间范围
 * @returns { [Array, Null] } Moment时间范围
 */
export function convertTimeToMoment(times) {
  if (!times || times.length < 2) {
    return null;
  }
  return times.map(time => moment(time));
}

/**
 * 格式化数字(每隔n个数字按符号进行分割)
 *
 * @export
 * @param { Number } number 数字
 * @param { Number } [intervalNuml=3] 间隔值
 * @param { String } [delimiter=','] 分隔符
 * @returns { String } 格式化后的数字
 */
export function formatNumber(number, intervalNuml = 3, delimiter = ',') {
  if (!number) {
    return number;
  }
  const reg = new RegExp(`\\B(?=(\\d{${intervalNuml}})+(?!\\d))`, 'g');
  return String(number).replace(reg, delimiter);
}

/**
 * 设置页面标题
 *
 * @export
 * @param {String} title 标题
 */
export function setTitle(title) {
  document.title = title ? `${title} - title` : 'title';
}

/**
 * 获取状态值
 *
 * @export
 * @param { String } key 状态key
 * @param { Array } statusList 状态列表
 * @returns { String } value 状态值
 */
export function getStatusValueByKey(key, statusList) {
  const status = statusList.find(item => +item.key === +key);
  if (status) {
    return status.value;
  }
  return '';
}

/**
 * 获取状态类型
 *
 * @export
 * @param { String } key 状态key
 * @param { Array } statusList 状态列表
 * @returns { String } type 状态类型
 */
export function getStatusTypeByKey(key, statusList) {
  const status = statusList.find(item => +item.key === +key);
  if (status) {
    return status.type;
  }
  return '';
}

/**
 * 防抖函数
 *
 * @export
 * @param {*} method 事件触发的操作
 * @param delay 多少毫秒内连续触发事件，不会执行
 * @returns {Function}
 */
export function debounce(method, delay) {
  let timer = null;
  return function loop(...args) {
    const self = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      method.apply(self, args);
    }, delay);
  };
}

/**
 * 节流函数
 *
 * @export
 * @param method 事件触发的操作
 * @param delay 间隔多少毫秒需要触发一次事件
 */
export function throttle(method, delay, ...args) {
  let timer;
  let start;
  return function loop() {
    const self = this;
    const now = Date.now();
    if (!start) {
      start = now;
    }
    if (timer) {
      clearTimeout(timer);
    }
    if (now - start >= delay) {
      method.apply(self, args);
      start = now;
    } else {
      timer = setTimeout(() => {
        loop.apply(self, args);
      }, 50);
    }
  };
}

/**
 * 获取字符串长度（汉字、汉字标点算两个字符，字母、数字、英文标点算一个字符）
 *
 * @param {String} text 字符串
 * @returns { Number } 字符串长度
 */
export function getByteLen(text) {
  let len = 0;
  if (typeof text === 'string' || typeof text === 'number') {
    text = text.toString();
    for (let i = 0; i < text.length; i += 1) {
      const char = text.charAt(i);
      // eslint-disable-next-line no-control-regex
      if (char.match(/[^\x00-\xff]/gi) !== null) {
        len += 2;
      } else {
        len += 1;
      }
    }
  }

  return len;
}

/**
 * 清楚查询参数中值为空的属性
 *
 * @param { Object } queryParams 查询参数对象
 * @returns { Object }
 */
export function trimQueryParams(queryParams) {
  const newQueryParams = {};
  if (queryParams instanceof Object) {
    const paramKeys = Object.keys(queryParams);
    paramKeys.forEach((key) => {
      let value = queryParams[key];
      if (typeof value === 'string') {
        value = value.trim();
      }
      if (value !== undefined && value !== null && value !== '') {
        newQueryParams[key] = value;
      }
    });
  }
  return newQueryParams;
}
