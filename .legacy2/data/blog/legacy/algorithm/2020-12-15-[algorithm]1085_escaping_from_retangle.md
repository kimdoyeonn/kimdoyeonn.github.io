---
title: '[algorithm]1085번 직사각형에서 탈출'

tags: [python, baekjoon, algorithm]
---

- 참고: [백준](https://www.acmicpc.net/step/10)

| 시간 제한 | 메모리 제한 | 제출  | 정답  | 맞은 사람 | 정답 비율 |
| :-------- | :---------- | :---- | :---- | :-------- | :-------- |
| 2 초      | 128 MB      | 27685 | 15867 | 14313     | 58.162%   |

## 문제

한수는 지금 (x, y)에 있다. 직사각형의 왼쪽 아래 꼭짓점은 (0, 0)에 있고, 오른쪽 위 꼭짓점은 (w, h)에 있다. 직사각형의 경계선까지 가는 거리의 최솟값을 구하는 프로그램을 작성하시오.

## 입력

첫째 줄에 x, y, w, h가 주어진다.

## 출력

첫째 줄에 문제의 정답을 출력한다.

## 제한

- 1 ≤ w, h ≤ 1,000
- 1 ≤ x ≤ w-1
- 1 ≤ y ≤ h-1
- x, y, w, h는 정수

## 예제 입력 1 복사

```
6 2 10 3
```

## 예제 출력 1 복사

```
1
```

## 출처

- 문제를 번역한 사람: [baekjoon](https://www.acmicpc.net/user/baekjoon)

## 알고리즘 분류

- [수학](https://www.acmicpc.net/problem/tag/124)
- [기하학](https://www.acmicpc.net/problem/tag/100)

### 풀이

```python
x, y, w, h = map(int, input().split())

# 1
dist1 = w - x if w - x <= w//2 else x
dist2 = h - y if h - y <= h//2 else y
print(dist1 if dist1 < dist2 else dist2)

# 2
dist = [x, y, w-x, h-y]
print(min(dist))
```

1. 너비, 높이에서 x, y를 뺀 값과 너비, 높이의 1/2를 비교하여 반절보다 뺀 값이 작으면 뺀 값을, 아니면 x,y를 각각 dist1, dist2에 넣고 dist1과 dist2 중에 작은 값을 출력
2. x, y, w-x, h-y를 모두 리스트에 넣고 리스트의 `min()`함수를 사용하여 최소 값을 출력

> 2번 방법으로 푼 다른 사람은 속도가 더 빨리 나온거같은데 내가 해보니 둘의 속도가 비슷했다. 서버의 상황에 따라 속도가 다르게 찍히나보다.
