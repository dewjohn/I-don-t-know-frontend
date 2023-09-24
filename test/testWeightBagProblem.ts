
// 0 1 15
// 1 3 20
// 2 4 30
function testWeightBagProblem(weight: number[], value: number[], size: number) {
  const goodSum = weight.length
  const dp: number[][] = new Array(goodSum)
    .fill(0).map(_ => new Array(size + 1).fill(0))
  for(let i = weight[0]; i <= size; i++) { // i 小于背包容量，所以初始化为第一个背包容量
    dp[0][i] = value[0]
  }
  for(let i = 1; i < goodSum; i++) {
    for(let j = 1; j <= size; j++){
      if(j < weight[i]) { // 如果背包容量小于物品重量
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-weight[i]] + value[i])
      }
    }
  }
  return dp[goodSum - 1][size]
}


const weight = [1, 3, 4];
const value = [15, 20, 30];
const size = 4;
console.log(testWeightBagProblem(weight, value, size));