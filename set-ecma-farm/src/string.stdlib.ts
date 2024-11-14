// localeCompare

// 普通英文字母，两者结果相同
let str1 = 'hello';
// "HELLO"
console.log(str1.toUpperCase());
// "HELLO"
console.log(str1.toLocaleUpperCase());

// 特殊字符的情况
// 土耳其语
let str2 = 'istanbul';
// "ISTANBUL"
console.log(str2.toUpperCase());
// "İSTANBUL"  注意 i 的转换不同
console.log(str2.toLocaleUpperCase('tr-TR'));
