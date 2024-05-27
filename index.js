// 按位非运算
let a = 10;

// 0   0  0  0  0 0 0 0
// 128 64 32 16 8 4 2 1

// 186  10111010  10111010
const NUM = 186;
console.log('NUM.toString(2) :>> ', NUM.toString(2));
// 按位非运算  -(x + 1)
let b = ~a;
console.log('b :>> ', b);
console.log('~null: ', ~null);
console.log('~{}: ', ~{});
console.log('~true: ', ~true);

// 有符号右移运算 a = 10  === 5
console.log('a >> 1 :>> ', a >> 1);

// 1010  ===  10
console.log('a >> 2 :>> ', a >> 2);

// 有符号左移 1010
console.log('a << 1 :>> ', a << 1);

// 异或运算 两个数相同为0, 不同为1

/**
 * a == 9 b == 10
 * a          1001
 * b          1010
 * ^          0011  3
 * 交换数字
 * a ^= b  => a = a ^ b
 * b ^= a  => b = b ^ a  => b = b ^ a ^ b => b = a
 * a ^= b  => a = a ^ b  => a = a ^ b ^ b => a = b
 *
 * 判断奇偶 => 根据最后一位数判断是0还是1 使用与运算 &
 * if (0 === (a & 1))
 *
 * 交换符号 按位非 ~a + 1
 * 绝对值  整数绝对值是其本身, 负数绝对值进行按位非+1操作
 * 整数右移31位得到0, 负数右移31位得到-1
 */

console.log('0 === (1 & 1)  :>> ', 0 === (1 & 1));
console.log('0 === (2 & 1) :>> ', 0 === (2 & 1));
console.log('~10+1 :>> ', ~10 + 1);
console.log('~-10+1 :>> ', ~-10 + 1);

function abs(a) {
  return a >>> 31 === 0 ? a : ~a + 1;
}

console.log('abs(10) :>> ', abs(10));
console.log('abs(-10) :>> ', abs(-10));
