---
title: "[algorithm]4948번 배르트랑 공준"
excerpt: ""
category:
  - algorithm
tags: [python, baekjoon, algorithm]
---

참고: [백준](https://www.acmicpc.net/problem/4948)



| 시간 제한 | 메모리 제한 | 제출  | 정답  | 맞은 사람 | 정답 비율 |
| :-------- | :---------- | :---- | :---- | :-------- | :-------- |
| 1 초      | 256 MB      | 28599 | 12288 | 10235     | 44.688%   |

## 문제

베르트랑 공준은 임의의 자연수 n에 대하여, n보다 크고, 2n보다 작거나 같은 소수는 적어도 하나 존재한다는 내용을 담고 있다.

이 명제는 조제프 베르트랑이 1845년에 추측했고, 파프누티 체비쇼프가 1850년에 증명했다.

예를 들어, 10보다 크고, 20보다 작거나 같은 소수는 4개가 있다. (11, 13, 17, 19) 또, 14보다 크고, 28보다 작거나 같은 소수는 3개가 있다. (17,19, 23)

자연수 n이 주어졌을 때, n보다 크고, 2n보다 작거나 같은 소수의 개수를 구하는 프로그램을 작성하시오. 

## 입력

입력은 여러 개의 테스트 케이스로 이루어져 있다. 각 케이스는 n을 포함하며, 한 줄로 이루어져 있다. (n ≤ 123456)

입력의 마지막에는 0이 주어진다.

## 출력

각 테스트 케이스에 대해서, n보다 크고, 2n보다 작거나 같은 소수의 개수를 출력한다.

## 예제 입력 1 복사

```
1
10
13
100
1000
10000
100000
0
```

## 예제 출력 1 복사

```
1
4
3
21
135
1033
8392
```

## 출처

[ICPC](https://www.acmicpc.net/category/1) > [Regionals](https://www.acmicpc.net/category/7) > [Asia Pacific](https://www.acmicpc.net/category/42) > [Japan](https://www.acmicpc.net/category/43) > [Japan Domestic Contest](https://www.acmicpc.net/category/44) > [2011 Japan Domestic Contest](https://www.acmicpc.net/category/detail/201) A번

- 문제를 번역한 사람: [baekjoon](https://www.acmicpc.net/user/baekjoon)

## 알고리즘 분류

- [수학](https://www.acmicpc.net/problem/tag/124)
- [정수론](https://www.acmicpc.net/problem/tag/95)
- [소수 판정](https://www.acmicpc.net/problem/tag/9)
- [에라토스테네스의 체](https://www.acmicpc.net/problem/tag/67)



### 내 풀이

```python
n = 123456
temp = [1] * (2*n+1)
temp[0] = temp[1] = 0
for i in range(2, n//2+1):
    for j in range(i*2, n*2+2, i):
        if temp[j]:
            temp[j] = 0

while True:
    cnt = 0
    n = int(input())
    if n == 0:
        break

    cnt = temp[n+1:2*n+1].count(1)
    print(cnt)
```

에라토스테네스의 체를 사용했고, 체를 미리 만든 다음에 입력받은 값을 만큼의 범위를 잘라서 참인 개수를 세는 방식으로 풀었다.