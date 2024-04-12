---
title: '[algorithm]정수삼각형'

tags: [algorithm, 이코테, baekjoon]
---

- 출처 : [https://www.acmicpc.net/problem/1932](https://www.acmicpc.net/problem/1932)

| 시간 제한 | 메모리 제한 | 제출  | 정답  | 맞은 사람 | 정답 비율 |
| :-------- | :---------- | :---- | :---- | :-------- | :-------- |
| 2 초      | 128 MB      | 45964 | 27409 | 20270     | 59.574%   |

## 문제

```
        7
      3   8
    8   1   0
  2   7   4   4
4   5   2   6   5
```

위 그림은 크기가 5인 정수 삼각형의 한 모습이다.

맨 위층 7부터 시작해서 아래에 있는 수 중 하나를 선택하여 아래층으로 내려올 때, 이제까지 선택된 수의 합이 최대가 되는 경로를 구하는 프로그램을 작성하라. 아래층에 있는 수는 현재 층에서 선택된 수의 대각선 왼쪽 또는 대각선 오른쪽에 있는 것 중에서만 선택할 수 있다.

삼각형의 크기는 1 이상 500 이하이다. 삼각형을 이루고 있는 각 수는 모두 정수이며, 범위는 0 이상 9999 이하이다.

## 입력

첫째 줄에 삼각형의 크기 n(1 ≤ n ≤ 500)이 주어지고, 둘째 줄부터 n+1번째 줄까지 정수 삼각형이 주어진다.

## 출력

첫째 줄에 합이 최대가 되는 경로에 있는 수의 합을 출력한다.

## 예제 입력 1 복사

```
5
7
3 8
8 1 0
2 7 4 4
4 5 2 6 5
```

## 예제 출력 1 복사

```
30
```

## 출처

[Olympiad](https://www.acmicpc.net/category/2) > [International Olympiad in Informatics](https://www.acmicpc.net/category/99) > [IOI 1994](https://www.acmicpc.net/category/detail/541) 1번

### 내 풀이

```python
n = int(input())
triangle = []
for _ in range(n):
    triangle.append(list(map(int, input().split())))

for i in range(1, n):
    for j in range(len(triangle[i])):
        if j == 0:	# 인덱스가 0일 때
            triangle[i][j] += triangle[i-1][j]
        elif j == len(triangle[i]) - 1:	# 인덱스가 맨 끝일 때(n-1)
            triangle[i][j] += triangle[i-1][j-1]
        else:	# 그 외의 경우
            triangle[i][j] += max(triangle[i-1][j], triangle[i-1][j-1])

print(max(triangle[-1]))
```

아래층에서 윗층의 가까운 숫자 두개 중 큰 수를 더하는 과정이 반복하면 마지막 층에서 최댓값을 구할 수 있다. 여기서 두 수 중 큰 수를 더하는 작은 과정이 반복되므로 다이나믹 프로그래밍 알고리즘을 사용했다.

점화식은 `dp[i][j] = dp[i][j] + max(dp[i-1][j], dp[i-1][j-1])` 이다.

하지만 양 끝에 위치한 숫자의 윗층 숫자는 두개가 아니므로 `i==0` 일 때와 `i==n-1`일 때는 예외로 처리해주었고 나머지 인덱스는 점화식으로 처리했다.
