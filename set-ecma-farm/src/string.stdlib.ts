// localeCompare

// 普通英文字母，两者结果相同
let str1 = 'hello';
// "HELLO"
console.debug(str1.toUpperCase());
// "HELLO"
console.debug(str1.toLocaleUpperCase());

// 特殊字符的情况
// 土耳其语
let str2 = 'istanbul';
// "ISTANBUL"
console.debug(str2.toUpperCase());
// "İSTANBUL"  注意 i 的转换不同
console.debug(str2.toLocaleUpperCase('tr-TR'));
