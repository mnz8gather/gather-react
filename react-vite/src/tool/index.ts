/**
 * @desc 字节转换
 * @desc 1024 => 1KB
 */
function byte2String(size: number): string {
  if (size < 1024) {
    return size + 'B';
  } else if (size >= 1024 && size < Math.pow(1024, 2)) {
    return (size / 1024).toFixed(2) + 'KB';
  } else if (size >= Math.pow(1024, 2) && size < Math.pow(1024, 3)) {
    return (size / Math.pow(1024, 2)).toFixed(2) + 'MB';
  } else if (size > Math.pow(1024, 3)) {
    return (size / Math.pow(1024, 3)).toFixed(2) + 'GB';
  } else {
    return size + 'B';
  }
}

/**
 * @desc 时间格式转换
 * @desc 2024-06-20 14:28:54
 */
function dateTimeFormat(date?: Date | number) {
  return new Intl.DateTimeFormat('chinese', {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
    .format(date)
    .replace(/\//g, '-');
}

/**
 * @desc 一天的毫秒数
 * @desc 86,400,000
 */
const millisecondsInOneDay = 86_400_000;

/**
 * @desc 获取零点的时间戳
 *
 * @desc 这里涉及到 ConstructorParameters 遇到重载的情况，
 * [24275](https://github.com/microsoft/TypeScript/issues/24275)
 * [37079](https://github.com/microsoft/TypeScript/issues/37079)
 * 这里的参数与 Date 构造函数参数不同
 */
function getZeroTimestamp(...args: ConstructorParameters<DateConstructor>) {
  const date = new Date(...args);
  const zeroTimestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  return zeroTimestamp;
}
