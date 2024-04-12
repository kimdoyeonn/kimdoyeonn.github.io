---
title: '[algorithm]못생긴 수'

tags: [algorithm, 이코테]
---

```python
n = int(input())
dp = [0] * n
dp[0] = 1
# 각 몇배수 했는지 저장할 변수
i2 = i3 = i5 = 0
# 배수 한 결과가 얼마인지 저장할 변수
next2, next3, next5 = 2, 3, 5

for i in range(1, n):
    dp[i] = min(next2, next3, next5)

    if dp[i] == next2:
        i2 += 1
        next2 = dp[i2] * 2

    if dp[i] == next3:
        i3 += 1
        next3 = dp[i3] * 3

    if dp[i] == next5:
        i5 += 1
        next5 = dp[i5] * 5

print(dp[n-1])
```

- 2, 3, 5의 배수 변수와 각각 몇 번 곱해졌는지(i2, i3, i5)를 나타낼 인덱스 변수를 만듦
- 배수 변수들 중 제일 작은 수를 골라 그 수와 지금까지의 배수가 같다면 dp[im]애 (2.3.5) 중 해당하는 수를 곱해주면서 못생긴 수를 찾아서 ~dp[n]까지 넣어줌

```
                      2 3 5
          dp[0] = 1 / 0 0 0
2 3 5  -> dp[1] = 2 / 1 0 0
4 3 5  -> dp[2] = 3 / 1 1 0
4 6 5  -> dp[3] = 4 / 2 1 0
6 6 5  -> dp[4] = 5 / 2 1 1
6 6 10 -> dp[5] = 6 / 3 2 1
8 9 10 -> dp[6] = 8 / 4 2 1
```
