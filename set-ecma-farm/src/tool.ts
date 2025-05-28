import { Decimal } from 'decimal.js';

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

// // 测试用例
// console.log(isSafeIntegerString('123'));        // ✅ true
// console.log(isSafeIntegerString('-123'));       // ✅ true
// console.log(isSafeIntegerString('1.23e5'));     // ✅ true (123000)
// console.log(isSafeIntegerString('0'));          // ✅ true
// console.log(isSafeIntegerString('-0'));         // ✅ true
// console.log("-------------------------------------");
// console.log(isSafeIntegerString('1.23e2'));     // ✅ true  (123)
// console.log(isSafeIntegerString('1.23e0'));     // ❌ false (1.23)
// console.log(isSafeIntegerString('1.23e-2'));    // ❌ false (0.0123)
// console.log(isSafeIntegerString('123.45'));     // ❌ false (123.45)

// // 非法值测试
// console.log(isSafeIntegerString(''));           // ❌ false (空字符串)
// console.log(isSafeIntegerString('  '));         // ❌ false (空白字符串)
// console.log(isSafeIntegerString('1.5'));        // ❌ false (小数)
// console.log(isSafeIntegerString('abc'));        // ❌ false (非数字)
// console.log(isSafeIntegerString('123abc'));     // ❌ false (非法格式)

// // 边界值测试
// console.log(isSafeIntegerString('9007199254740991'));     // ✅ true  (MAX_SAFE_INTEGER)
// console.log(isSafeIntegerString('-9007199254740991'));    // ✅ true  (MIN_SAFE_INTEGER)
// console.log(isSafeIntegerString('9007199254740992'));     // ❌ false (超出范围)

/**
 * 对比两个数组的差异
 */
function getDifferences(arr1: string[], arr2: string[]) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  return {
    uniqueToArr1: arr1.filter((item) => !set2.has(item)),
    uniqueToArr2: arr2.filter((item) => !set1.has(item)),
  };
}

/**
 * 存储容量单位转换
 */
export function autoConvertSize(size: unknown, sizeUnit = 'B') {
  // 定义单位及其对应的字节数
  const units = [
    { name: 'B', bytes: 1 },
    { name: 'KB', bytes: 1024 },
    { name: 'MB', bytes: 1024 ** 2 },
    { name: 'GB', bytes: 1024 ** 3 },
    { name: 'TB', bytes: 1024 ** 4 },
  ];

  // 检查输入单位是否有效
  const fromUnit = units.find((unit) => unit.name === sizeUnit);
  if (!fromUnit) {
    console.error('Invalid unit. Please use B, KB, MB, GB, or TB.');
    return null;
  }

  // 检查输入大小是否为有效数字
  if (typeof size !== 'number' || isNaN(size) || size < 0) {
    console.error('Size must be a valid non-negative number.');
    return null;
  }

  // 转换为 Decimal 对象
  const sizeDecimal = new Decimal(size);
  // 转换为字节
  const sizeInBytes = sizeDecimal.mul(fromUnit.bytes);

  let targetUnit = units[0];
  // 检查 sizeInBytes 是否大于 0 保证后面的对数运算
  if (sizeInBytes.gt(0)) {
    // 对数运算 取整数
    const log1024 = sizeInBytes.log(1024).floor().toNumber();
    // 将对数值限制在单位数组的有效索引范围内，防止越界
    const unitIndex = Math.min(log1024, units.length - 1);
    targetUnit = units[unitIndex];
  }

  // 转换为目标单位
  const convertedSize = sizeInBytes.div(targetUnit.bytes);

  return {
    value: convertedSize.toDecimalPlaces(2, Decimal.ROUND_DOWN).toNumber(),
    unit: targetUnit.name,
  };
}
