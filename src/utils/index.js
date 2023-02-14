export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function isiOS () {
  return /ipad|iphone|mac/i.test(navigator.userAgent)
}

// 正则去掉符号
export const removeBlock = (str) => {
  if (str) {
    var reg = /^\{|\"/gi
    var reg2 = /\"|}$/gi
    str = str.replace(reg, '')
    str = str.replace(reg2, '')
    return str
  } else {
    return str
  }
}

// 字符串转bool类型
export const stringToBoolean = (str) => {
  let strBool = str
  if (strBool == 'true' || strBool == 'yes' || strBool == '1') {
    return true
  }
  if (strBool == 'false' || strBool == 'no' || strBool == '0') {
    return false
  }
  return Boolean(str)
}

export function isDef (s) {
  return s !== undefined
}

export function isUndef (s) {
  return s === undefined
}

export function isObject (s) {
  return Object.prototype.toString.call(s) === '[object Object]'
}

export function isArray (s) {
  return Object.prototype.toString.call(s) === '[object Array]'
}

export function isEmptyObject (data) {
  const arr = Object.getOwnPropertyNames(data);
  return arr.length == 0
}

/**
 * base64转file    
 * base64格式：data:image/png;base64,iVBORw0KGgoAAAANSU...
 * @param {*} dataURL base64编码数据
 * @param {*} filename 文件名称
 */
export function dataURLtoFile (dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
* file或blob转base64
* @param {*} blob file或者blob
* @param {*} callback function (data)通过参数获得base64
*/
export function blobToBase64 (blob, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    callback(reader.result);
  });
  reader.readAsDataURL(blob);
}

/**
* 随机id
*/
export function getId () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * 将毫秒数转为hh:mm:ss或mm:ss格式
 * 如果毫秒数超过60分钟，则以hh:mm:ss格式显示，反之以mm:ss格式显示
 * @param ms 毫秒数 
 * @param Separator 分隔符
 * @returns {string}
 */
export function timeFormat (ms, Separator = ':') {
  // 进行补0操作
  function addZero (n) {
    return n < 10 ? '0' + n : n
  }
  let h = Math.floor(ms / 1000 / 60 / 60)
  let m = Math.floor(ms / 1000 / 60)
  let s = Math.floor(ms / 1000)
  if (h === 1) {
    // 当时间刚好是60分钟时，让它以mm:ss格式显示,即显示60:00,而不是显示01:00:00
    if (m / 60 === 1 && s % 60 === 0) {
      h = ''
      m = '60:'
    } else {
      h = '01:'
      m = addZero(m % 60) + Separator
    }
    s = addZero(s % 60)
  } else {
    h = h === 0 ? '' : addZero(h) + Separator
    m = addZero(m % 60) + Separator
    s = addZero(s % 60)
  }
  return h + m + s
}

/**
 * 防抖
 * @param method 需要添加防抖的方法
 * @param delay 防抖时间
 * @param ahead 是否直接触发一次
 * @param type 类型
 * @returns {string}
 */
let debounceTimer = {}
// TODO 多处地方同时调用debounce时，如果第一个传的是ahead = true，另外一个传的是ahead = false, 有可能造成两个的method方法都不会被嗲用
export const debounce = ({ method, delay = 300, ahead = false, type = 'common' }) => {
  console.log('已阻止频繁触发..........', ahead)
  if (ahead && !debounceTimer[type]) {
    method()
  }
  clearTimeout(debounceTimer[type])
  debounceTimer[type] = setTimeout(() => {
    if (!ahead) {
      method()
    }
    clearTimeout(debounceTimer[type])
    debounceTimer[type] = undefined
  }, delay);
}

/**
 * 节流
 * @param method 需要添加节流的方法
 * @param delay 节流时间
 * @returns {string}
 */
let throttleTimer = {};
let canRun = true;
export const throttle = ({ method, delay = 2000 }) => {
  if (!canRun) {
    return;
  }
  clearTimeout(throttleTimer);
  canRun = false;
  throttleTimer = setTimeout(() => {
    method();
    canRun = true;
    clearTimeout(throttleTimer);
    throttleTimer = undefined;
  }, delay);
};
