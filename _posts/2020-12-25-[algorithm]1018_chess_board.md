---
title: "[algorithm]1018번 체스판 다시 칠하기"
excerpt: ""
category:
  - algorithm
tags: [python, baekjoon, algorithm]
---

참고: [백준](https://www.acmicpc.net/problem/1018)

| 시간 제한 | 메모리 제한 | 제출  | 정답  | 맞은 사람 | 정답 비율 |
| :-------- | :---------- | :---- | :---- | :-------- | :-------- |
| 2 초      | 128 MB      | 28981 | 13073 | 10823     | 46.302%   |

## 문제

지민이는 자신의 저택에서 MN개의 단위 정사각형으로 나누어져 있는 M*N 크기의 보드를 찾았다. 어떤 정사각형은 검은색으로 칠해져 있고, 나머지는 흰색으로 칠해져 있다. 지민이는 이 보드를 잘라서 8*8 크기의 체스판으로 만들려고 한다.

체스판은 검은색과 흰색이 번갈아서 칠해져 있어야 한다. 구체적으로, 각 칸이 검은색과 흰색 중 하나로 색칠되어 있고, 변을 공유하는 두 개의 사각형은 다른 색으로 칠해져 있어야 한다. 따라서 이 정의를 따르면 체스판을 색칠하는 경우는 두 가지뿐이다. 하나는 맨 왼쪽 위 칸이 흰색인 경우, 하나는 검은색인 경우이다.

보드가 체스판처럼 칠해져 있다는 보장이 없어서, 지민이는 8*8 크기의 체스판으로 잘라낸 후에 몇 개의 정사각형을 다시 칠해야겠다고 생각했다. 당연히 8*8 크기는 아무데서나 골라도 된다. 지민이가 다시 칠해야 하는 정사각형의 최소 개수를 구하는 프로그램을 작성하시오.

## 입력

첫째 줄에 N과 M이 주어진다. N과 M은 8보다 크거나 같고, 50보다 작거나 같은 자연수이다. 둘째 줄부터 N개의 줄에는 보드의 각 행의 상태가 주어진다. B는 검은색이며, W는 흰색이다.

## 출력

첫째 줄에 지민이가 다시 칠해야 하는 정사각형 개수의 최솟값을 출력한다.

## 예제 입력 1 복사

```
8 8
WBWBWBWB
BWBWBWBW
WBWBWBWB
BWBBBWBW
WBWBWBWB
BWBWBWBW
WBWBWBWB
BWBWBWBW
```

## 예제 출력 1 복사

```
1
```

## 예제 입력 2 복사

```
10 13
BBBBBBBBWBWBW
BBBBBBBBBWBWB
BBBBBBBBWBWBW
BBBBBBBBBWBWB
BBBBBBBBWBWBW
BBBBBBBBBWBWB
BBBBBBBBWBWBW
BBBBBBBBBWBWB
WWWWWWWWWWBWB
WWWWWWWWWWBWB
```

## 예제 출력 2 복사

```
12
```

## 출처

- 문제를 번역한 사람: [baekjoon](https://www.acmicpc.net/user/baekjoon)
- 데이터를 추가한 사람: [jh05013](https://www.acmicpc.net/user/jh05013)
- 문제를 다시 작성한 사람: [jh05013](https://www.acmicpc.net/user/jh05013)

## 알고리즘 분류

- [브루트포스 알고리즘](https://www.acmicpc.net/problem/tag/125)



### 내 풀이

```python
temp_board = [
    ['WBWBWBWB',
     'BWBWBWBW',
     'WBWBWBWB',
     'BWBWBWBW',
     'WBWBWBWB',
     'BWBWBWBW',
     'WBWBWBWB',
     'BWBWBWBW'],
    ['BWBWBWBW',
     'WBWBWBWB',
     'BWBWBWBW',
     'WBWBWBWB',
     'BWBWBWBW',
     'WBWBWBWB',
     'BWBWBWBW',
     'WBWBWBWB']
]
n, m = map(int, input().split())
board = []
for _ in range(n):
    row = input()
    board.append(row)

temp = 33
for i in range(n-8+1):
    for j in range(m-8+1):
        for t_board in temp_board:
            paint = 0
            for row, temp_row in zip(board[i:i+8], t_board):
                row = row[j:j+8]
                for color, temp_color in zip(row, temp_row):
                    if color != temp_color:
                        paint += 1
            else:
                temp = paint if temp > paint else temp

print(temp)
```

만들어질 수 있는 판의 경우를 미리 만든 다음에 주어진 판에서 8*8씩 잘라 만들어 둔 판과 비교하면서 칠해야하는 자리의 최솟값을 구했다.