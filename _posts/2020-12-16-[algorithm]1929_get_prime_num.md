---
title: "[algorithm]1929번 소수 구하기"
excerpt: ""
category:
  - algorithm
tags: [python, baekjoon, algorithm]
---

참고: [백준](https://www.acmicpc.net/step/10)

| 시간 제한 | 메모리 제한 | 제출  | 정답  | 맞은 사람 | 정답 비율 |
| :-------- | :---------- | :---- | :---- | :-------- | :-------- |
| 2 초      | 256 MB      | 81185 | 22719 | 16117     | 27.365%   |

## 문제

M이상 N이하의 소수를 모두 출력하는 프로그램을 작성하시오.

## 입력

첫째 줄에 자연수 M과 N이 빈 칸을 사이에 두고 주어진다. (1 ≤ M ≤ N ≤ 1,000,000) M이상 N이하의 소수가 하나 이상 있는 입력만 주어진다.

## 출력

한 줄에 하나씩, 증가하는 순서대로 소수를 출력한다.

## 예제 입력 1 복사

```
3 16
```

## 예제 출력 1 복사

```
3
5
7
11
13
```

## 출처

- 데이터를 추가한 사람: [jinjean0123](https://www.acmicpc.net/user/jinjean0123)

## 알고리즘 분류

- [수학](https://www.acmicpc.net/problem/tag/124)
- [정수론](https://www.acmicpc.net/problem/tag/95)
- [소수 판정](https://www.acmicpc.net/problem/tag/9)
- [에라토스테네스의 체](https://www.acmicpc.net/problem/tag/67)



### 내 풀이

```python
m, n = map(int, input().split())

nums = [0] * (n+1)
nums[0] = nums[1] = -1

for i in range(2, n//2+1):
    temp = 2
    while temp * i <= n:
        nums[temp * i] = -1
        temp += 1

for num in range(m, n + 1):
    if not nums[num]:
        print(num)
```



#### 에라토스테네스의 체

![에라토스테네스의 체](https://upload.wikimedia.org/wikipedia/commons/b/b9/Sieve_of_Eratosthenes_animation.gif)

1. 2부터 소수를 구하고자 하는 구간의 모든 수를 나열한다. 그림에서 회색 사각형으로 두른 수들이 여기에 해당한다.
2. 2는 소수이므로 오른쪽에 2를 쓴다. (빨간색)
3. 자기 자신을 제외한 2의 배수를 모두 지운다.
4. 남아있는 수 가운데 3은 소수이므로 오른쪽에 3을 쓴다. (초록색)
5. 자기 자신을 제외한 3의 배수를 모두 지운다.
6. 남아있는 수 가운데 5는 소수이므로 오른쪽에 5를 쓴다. (파란색)
7. 자기 자신을 제외한 5의 배수를 모두 지운다.
8. 남아있는 수 가운데 7은 소수이므로 오른쪽에 7을 쓴다. (노란색)
9. 자기 자신을 제외한 7의 배수를 모두 지운다.
10. 위의 과정을 반복하면 구하는 구간의 모든 소수가 남는다.

출처: [위키백과]([https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4](https://ko.wikipedia.org/wiki/에라토스테네스의_체))



- 전에 프로그래머스에 이걸 사용해서 풀어야 효율성이 나오는 문제가 있었어서 쉽게 풀었다. 소수를 찾을 떄 가장 효율적이고 빠른 알고리즘인가보다