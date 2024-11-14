// 由于 IEEE 754 标准的限制，JS 只能精确表示小数点后 16-17 位
// 超出这个精度范围的数字会被四舍五入
// 16 位一定准确，17 位部分准确
/**
 * 小数截取小数点后 decimal 位
 */
const truncateDecimal = (num: number, decimal: number) => {
  const str = num.toString();
  const dotIndex = str.indexOf('.');
  if (dotIndex === -1) {
    return String(num);
  }
  return str.slice(0, dotIndex + decimal + 1);
};

/**
 * 判断字符串是否时在安全整数范围内的整数
 */
function isSafeIntegerString(str: string) {
  // 去除首尾空格
  str = str.trim();

  // 空字符串返回 false
  if (!str) return false;

  // 科学记数法的正则
  const scientificNotation = /^-?\d+\.?[eE][+-]?\d+$/;

  // 转换为数字
  const num = Number(str);

  // 检查是否在安全整数范围内
  if (!Number.isSafeInteger(num)) {
    return false;
  }

  // 如果是科学记数法，检查结果是否为整数
  if (scientificNotation.test(str)) {
    return !isNaN(num) && Number.isInteger(num);
  }

  // 普通整数的正则
  return /^-?\d+$/.test(str);
}
