/**
 * 字节转换
 * 1024 => 1KB
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
