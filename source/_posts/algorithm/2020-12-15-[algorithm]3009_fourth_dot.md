---
title: "[algorithm]3009번 네 번째 집"
excerpt: ""
category:
  - algorithm
tags: [python, baekjoon, algorithm]
---

- 참고: [백준](https://www.acmicpc.net/step/10)

| 시간 제한 | 메모리 제한 | 제출  | 정답 | 맞은 사람 | 정답 비율 |
| :-------- | :---------- | :---- | :--- | :-------- | :-------- |
| 1 초      | 128 MB      | 12411 | 8923 | 8137      | 73.731%   |

## 문제

세 점이 주어졌을 때, 축에 평행한 직사각형을 만들기 위해서 필요한 네 번째 점을 찾는 프로그램을 작성하시오.

## 입력

세 점의 좌표가 한 줄에 하나씩 주어진다. 좌표는 1보다 크거나 같고, 1000보다 작거나 같은 정수이다.

## 출력

직사각형의 네 번째 점의 좌표를 출력한다.

## 예제 입력 1 복사

```
30 20
10 10
10 20
```

## 예제 출력 1 복사

```
30 10
```

## 출처

[Contest ](https://www.acmicpc.net/category/45)> [Croatian Open Competition in Informatics ](https://www.acmicpc.net/category/17)> [COCI 2007/2008 ](https://www.acmicpc.net/category/23)> [Contest #1](https://www.acmicpc.net/category/detail/100) 1번

- 문제를 번역한 사람: [baekjoon](https://www.acmicpc.net/user/baekjoon)
- 문제의 오타를 찾은 사람: [onjo0127](https://www.acmicpc.net/user/onjo0127)
- 데이터를 추가한 사람: [pichulia](https://www.acmicpc.net/user/pichulia)

## 링크

- [TJU Online Judge](http://acm.tju.edu.cn/toj/showp2955.html)

## 알고리즘 분류

- [구현](https://www.acmicpc.net/problem/tag/102)
- [기하학](https://www.acmicpc.net/problem/tag/100)



### 내 풀이

```python
xs = []
ys = []
for _ in range(3):
    x, y = map(int, input().split())
    xs.append(x)
    ys.append(y)
fourth_dot = [0, 0]
for i in range(3):
    if xs.count(xs[i]) == 1:
        fourth_dot[0] = xs[i]
    if ys.count(ys[i]) == 1:
        fourth_dot[1] = ys[i]
print(fourth_dot[0], fourth_dot[1])
```

- 직사각형은 꼭짓점의 각이 전부 직각이어야하기 떄문에 x축에 수평인 직선 2개와 y축에 수평인 직선 두개로 이루어져 있다. 때문에 4개의 좌표로 직사각형을 만들 수 있다면 동일한 좌표가 x, y에서 각각 두번씩 나오게되는데 (단, 기울어져 있는 직사각형은 제외되는데, 통과한 것을 보면 그 경우는 고려하지 않는 것 같다.)
- 위의 사실을 이용하여 두번 나오지 않는 수(한번 나온 수)로 4번째 점의 좌표를찾을 수 있었다.