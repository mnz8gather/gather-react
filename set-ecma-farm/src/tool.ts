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

  // 转换为数字
  const num = Number(str);

  // 检查是否在安全整数范围内
  return Number.isSafeInteger(num);
}

// 测试用例
console.log(isSafeIntegerString('123'));        // ✅ true
console.log(isSafeIntegerString('-123'));       // ✅ true
console.log(isSafeIntegerString('1.23e5'));     // ✅ true (123000)
console.log(isSafeIntegerString('0'));          // ✅ true
console.log(isSafeIntegerString('-0'));         // ✅ true
console.log("-------------------------------------");
console.log(isSafeIntegerString('1.23e2'));     // ✅ true  (123)
console.log(isSafeIntegerString('1.23e0'));     // ❌ false (1.23)
console.log(isSafeIntegerString('1.23e-2'));    // ❌ false (0.0123)
console.log(isSafeIntegerString('123.45'));     // ❌ false (123.45)

// 非法值测试
console.log(isSafeIntegerString(''));           // ❌ false (空字符串)
console.log(isSafeIntegerString('  '));         // ❌ false (空白字符串)
console.log(isSafeIntegerString('1.5'));        // ❌ false (小数)
console.log(isSafeIntegerString('abc'));        // ❌ false (非数字)
console.log(isSafeIntegerString('123abc'));     // ❌ false (非法格式)

// 边界值测试
console.log(isSafeIntegerString('9007199254740991'));     // ✅ true  (MAX_SAFE_INTEGER)
console.log(isSafeIntegerString('-9007199254740991'));    // ✅ true  (MIN_SAFE_INTEGER)
console.log(isSafeIntegerString('9007199254740992'));     // ❌ false (超出范围)


