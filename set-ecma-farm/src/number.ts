/**
 * 格式化数字，保留小数点后指定位数的非零数字。
 * 该函数会截断多余的位数，而不是进行四舍五入。
 *
 * @param num 要格式化的数字。
 * @param digit 要保留的非零数字位数。必须是正整数。
 * @returns 格式化后的字符串。
 *
 */
export function formatDigit(num: number, digit: number): string {
  if (typeof num !== 'number') {
    return String(num);
  }
  // Number.isInteger(5.0000000000000001) true
  // Number.isInteger(4500000000000000.1) true
  // Number.isInteger(4500000000000000.5) false
  if (typeof digit !== 'number' || String(digit).indexOf('.') !== -1) {
    return String(num);
  }
  if (digit <= 0) {
    return String(num);
  }
  const numStr = String(num);
  const dotIndex = numStr.indexOf('.');
  // 如果是整数，直接返回
  if (dotIndex === -1) {
    return numStr;
  }
  const integerPart = numStr.slice(0, dotIndex);
  const fractionalPart = numStr.slice(dotIndex + 1);
  // 查找第一个非零数字的索引
  let firstNonZeroIndex = -1;
  for (let i = 0; i < fractionalPart.length; i++) {
    if (fractionalPart[i] !== '0') {
      firstNonZeroIndex = i;
      break;
    }
  }
  // 如果小数部分全是 0 (例如 12.000)
  if (firstNonZeroIndex === -1) {
    return integerPart;
  }
  // 截取从第一个非零数字开始的指定长度
  const endIndex = firstNonZeroIndex + digit;
  const newFractionalPart = fractionalPart.slice(0, endIndex);
  return `${integerPart}.${newFractionalPart}`;
}
