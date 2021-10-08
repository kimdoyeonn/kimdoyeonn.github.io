---
title: "[algorithm]level2 숫자의 표현"
excerpt: ""
category:
  - algorithm
tags: [python, programmers, algorithm]
---

참고: [프로그래머스](https://programmers.co.kr/learn/courses/30/lessons/12924)

###### 문제 설명

Finn은 요즘 수학공부에 빠져 있습니다. 수학 공부를 하던 Finn은 자연수 n을 연속한 자연수들로 표현 하는 방법이 여러개라는 사실을 알게 되었습니다. 예를들어 15는 다음과 같이 4가지로 표현 할 수 있습니다.

- 1 + 2 + 3 + 4 + 5 = 15
- 4 + 5 + 6 = 15
- 7 + 8 = 15
- 15 = 15

자연수 n이 매개변수로 주어질 때, 연속된 자연수들로 n을 표현하는 방법의 수를 return하는 solution를 완성해주세요.

##### 제한사항

- n은 10,000 이하의 자연수 입니다.

------

##### 입출력 예

| n    | result |
| ---- | ------ |
| 15   | 4      |

##### 입출력 예 설명

입출력 예#1
문제의 예시와 같습니다.





### 내 풀이

```python
def solution(n):
    answer = 0

    temp = 1
    while 1:
        comp = 0
        for num in range(temp,n+1):
            comp += num
            if comp == n:
                answer += 1
                temp += 1
                break
            elif comp > n:
                temp += 1
                break
        
        if temp == n:
            answer += 1
            break
    return answer
```

- 1부터 더해보기 시작해서 값이 나오면 answer+1하고 break, 값이 넘어가면 break 다음은 2(temp)부터 더해보고 ~~~ 반복
- 주어진 값과 더하기 시작할 값이 같아지면 answer+1하고 break



### 다른 사람 풀이

```python
# 등차수열 합 공식
def expressions(num):
    return len([i  for i in range(1,num+1,2) if num % i is 0])
```

- 홀수 약수의 개수 = 연속하는 수로 이루어진 표현 방법의 개수

예를 들어 20가 주어졌을 때,

- 약수: 1, 5, 10 -> 10은 짝수 이므로 제외
  - 1: 20
  - 5: 4+4+4+4+4 -> 2+3+4+5+6

