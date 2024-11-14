// localeCompare

// 普通英文字母，两者结果相同
let str1 = "hello";
console.log(str1.toUpperCase());        // "HELLO"
console.log(str1.toLocaleUpperCase());  // "HELLO"

// 特殊字符的情况
let str2 = "istanbul";  // 土耳其语
console.log(str2.toUpperCase());                    // "ISTANBUL"
console.log(str2.toLocaleUpperCase('tr-TR'));      // "İSTANBUL"  注意 i 的转换不同