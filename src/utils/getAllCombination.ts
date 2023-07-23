/*
 * @Author: DZL
 * @Date: 2023-07-22 21:06:00
 * @LastEditors: DZL
 * @LastEditTime: 2023-07-22 21:07:13
 * @Description:
 */

export default function getAllCombinations(arrObj) {
  const keys = Object.keys(arrObj);

  function backtrack(index, currentCombination, combinations) {
    if (index === keys.length) {
      combinations.push(currentCombination.slice());
      return;
    }

    const key = keys[index];
    const arr = arrObj[key];

    for (let i = 0; i < arr.length; i++) {
      currentCombination.push(arr[i]);
      backtrack(index + 1, currentCombination, combinations);
      currentCombination.pop();
    }
  }

  const combinations = [];
  backtrack(0, [], combinations);

  return combinations;
}
