---
title: "[algorithm]level2 주식 가격"
excerpt: ""
category:
  - algorithm
tags: [python, programmers, algorithm]
---

참고: [프로그래머스](https://programmers.co.kr/learn/courses/30/lessons/42584)

###### 문제 설명

초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때, 가격이 떨어지지 않은 기간은 몇 초인지를 return 하도록 solution 함수를 완성하세요.

##### 제한사항

- prices의 각 가격은 1 이상 10,000 이하인 자연수입니다.
- prices의 길이는 2 이상 100,000 이하입니다.

##### 입출력 예

| prices          | return          |
| --------------- | --------------- |
| [1, 2, 3, 2, 3] | [4, 3, 1, 1, 0] |

##### 입출력 예 설명

- 1초 시점의 ₩1은 끝까지 가격이 떨어지지 않았습니다.
- 2초 시점의 ₩2은 끝까지 가격이 떨어지지 않았습니다.
- 3초 시점의 ₩3은 1초뒤에 가격이 떨어집니다. 따라서 1초간 가격이 떨어지지 않은 것으로 봅니다.
- 4초 시점의 ₩2은 1초간 가격이 떨어지지 않았습니다.
- 5초 시점의 ₩3은 0초간 가격이 떨어지지 않았습니다.



#### 내 풀이

```python
def solution(prices):
    answer = []
    for i in range(len(prices)):
        for j in range(i+1, len(prices)):
            if prices[j] - prices[i] < 0:
                answer.append(len(prices[i:j]))
                break
        else:
            answer.append(len(prices[i+1:]))
    return answer
```

분류는 큐, 스택이라고 써있는데, 완전탐색으로 풀리는 문제였다. 큐, 스택으로 풀어보려고 코드를 짜긴했는데 효율성 0점이라 통과하질 못했다..

for문을 두번 돌렸고, 바깥 for문은 prices 배열 전체를, 안쪽 for문은 바깥 for문에서 들어온 i 다음부터 끝까지의 배열을 반복했다. 안쪽 for문은 i에 있는 값보다 값이 작아질 때까지 반복문을 돌고 작아지면 작아지는데까지 걸린 시간을 배열의 길이로 계산하여 answer에 넣어주고 break한다. 반복문이 다 돌 때까지 조건문이 True가 안되면 끝까지 가격이 떨어지지 않았다는 말이므로 그 길이를 else문에서 계산해준다.

