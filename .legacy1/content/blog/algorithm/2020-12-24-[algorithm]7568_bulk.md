---
title: '[algorithm]7568번 덩치'

tags: [python, baekjoon, algorithm]
---

참고: [백준](https://www.acmicpc.net/problem/7568)

| 시간 제한 | 메모리 제한 | 제출  | 정답  | 맞은 사람 | 정답 비율 |
| :-------- | :---------- | :---- | :---- | :-------- | :-------- |
| 1 초      | 128 MB      | 25236 | 14603 | 12720     | 59.218%   |

## 문제

우리는 사람의 덩치를 키와 몸무게, 이 두 개의 값으로 표현하여 그 등수를 매겨보려고 한다. 어떤 사람의 몸무게가 x kg이고 키가 y cm라면 이 사람의 덩치는 (x,y)로 표시된다. 두 사람 A 와 B의 덩치가 각각 (x,y), (p,q)라고 할 때 x>p 그리고 y>q 이라면 우리는 A의 덩치가 B의 덩치보다 "더 크다"고 말한다. 예를 들어 어떤 A, B 두 사람의 덩치가 각각 (56,177), (45,165) 라고 한다면 A의 덩치가 B보다 큰 셈이 된다. 그런데 서로 다른 덩치끼리 크기를 정할 수 없는 경우도 있다. 예를 들어 두 사람 C와 D의 덩치가 각각 (45, 181), (55,173)이라면 몸무게는 D가 C보다 더 무겁고, 키는 C가 더 크므로, "덩치"로만 볼 때 C와 D는 누구도 상대방보다 더 크다고 말할 수 없다.

N명의 집단에서 각 사람의 덩치 등수는 자신보다 더 "큰 덩치"의 사람의 수로 정해진다. 만일 자신보다 더 큰 덩치의 사람이 k명이라면 그 사람의 덩치 등수는 k+1이 된다. 이렇게 등수를 결정하면 같은 덩치 등수를 가진 사람은 여러 명도 가능하다. 아래는 5명으로 이루어진 집단에서 각 사람의 덩치와 그 등수가 표시된 표이다.

| 이름 | <몸무게, 키> | 덩치 등수 |
| :--: | :----------: | :-------: |
|  A   |  <55, 185>   |     2     |
|  B   |  <58, 183>   |     2     |
|  C   |  <88, 186>   |     1     |
|  D   |  <60, 175>   |     2     |
|  E   |  <46, 155>   |     5     |

위 표에서 C보다 더 큰 덩치의 사람이 없으므로 C는 1등이 된다. 그리고 A, B, D 각각의 덩치보다 큰 사람은 C뿐이므로 이들은 모두 2등이 된다. 그리고 E보다 큰 덩치는 A, B, C, D 이렇게 4명이므로 E의 덩치는 5등이 된다. 위 경우에 3등과 4등은 존재하지 않는다. 여러분은 학생 N명의 몸무게와 키가 담긴 입력을 읽어서 각 사람의 덩치 등수를 계산하여 출력해야 한다.

## 입력

첫 줄에는 전체 사람의 수 N이 주어진다. 그리고 이어지는 N개의 줄에는 각 사람의 몸무게와 키를 나타내는 양의 정수 x와 y가 하나의 공백을 두고 각각 나타난다. 단, 2 ≤ N ≤ 50, 10 ≤ x,y ≤ 200 이다.

## 출력

여러분은 입력에 나열된 사람의 덩치 등수를 구해서 그 순서대로 첫 줄에 출력해야 한다. 단, 각 덩치 등수는 공백문자로 분리되어야 한다.

## 예제 입력 1 복사

```
5
55 185
58 183
88 186
60 175
46 155
```

## 예제 출력 1 복사

```
2 2 1 2 5
```

## 출처

[Olympiad](https://www.acmicpc.net/category/2) > [한국정보올림피아드](https://www.acmicpc.net/category/55) > [한국정보올림피아드시․도지역본선](https://www.acmicpc.net/category/57) > [지역본선 2013](https://www.acmicpc.net/category/214) > [초등부](https://www.acmicpc.net/category/detail/912) 2번

- 문제의 오타를 찾은 사람: [apjw6112](https://www.acmicpc.net/user/apjw6112), [eric00513](https://www.acmicpc.net/user/eric00513), [genius0412](https://www.acmicpc.net/user/genius0412), [jung2381187](https://www.acmicpc.net/user/jung2381187), [seecimi](https://www.acmicpc.net/user/seecimi)

## 알고리즘 분류

- [구현](https://www.acmicpc.net/problem/tag/102)
- [브루트포스 알고리즘](https://www.acmicpc.net/problem/tag/125)

### 내 풀이

```python
n = int(input())
bulks = []
for _ in range(n):
    bulk = list(map(int, input().split()))
    bulks.append(bulk)

for i, b in enumerate(bulks):
    rank = 0
    for u in bulks:
        if u[0] > b[0] and u[1] > b[1]:
            rank += 1
    else:
        print(rank+1, end=" ")
```

반복문을 돌면서 자신보다 키와 몸무게가 둘다 큰 사람의 수를 계산하고 거기에 + 1을 하면 순위가 나옴

예를 들어 자신보다 큰 사람이 아무도 없으면 0 + 1 -> 1

자기보다 큰 사람이 1명만 있으면 1+1 -> 2

자기보다 큰 사람이 4명이면 4 + 1 -> 5

본인보다 덩치가 큰 사람의 수만 계산하면 중복 순위를 따로 고려하지 않아도 문제에서 제시하는 조건에 맞는 순위를 구할 수 있었다.
