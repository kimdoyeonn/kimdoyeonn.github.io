---
title: "[algorithm]level1 내적"
excerpt: ""
category:
  - algorithm
tags: [python, programmers, algorithm]
---

###### 문제 설명

길이가 같은 두 1차원 정수 배열 a, b가 매개변수로 주어집니다. a와 b의 [내적](https://en.wikipedia.org/wiki/Dot_product)을 return 하도록 solution 함수를 완성해주세요.

이때, a와 b의 내적은 `a[0]*b[0] + a[1]*b[1] + ... + a[n-1]*b[n-1]` 입니다. (n은 a, b의 길이)

------

##### 제한사항

- a, b의 길이는 1 이상 1,000 이하입니다.
- a, b의 모든 수는 -1,000 이상 1,000 이하입니다.

------

##### 입출력 예

| a           | b             | result |
| ----------- | ------------- | ------ |
| `[1,2,3,4]` | `[-3,-1,0,2]` | 3      |
| `[-1,0,1]`  | `[1,0,-1]`    | -2     |

------

##### 입출력 예 설명

입출력 예 #1

- a와 b의 내적은 `1*(-3) + 2*(-1) + 3*0 + 4*2 = 3` 입니다.

입출력 예 #2

- a와 b의 내적은 `(-1)*1 + 0*0 + 1*(-1) = -2` 입니다.



### 내가 푼 코드

```python
def solution(a, b):
    answer = 0
    for i in range(len(a)):
        answer += a[i]*b[i]

    return answer
```



### 다른 사람 코드

```python
def solution(a, b):
    answer = 0
    for x,y in zip(a,b):
        answer += x*y

    return answer
```



> 한 번 봤다고 넘어가지말고 따로 한 번씩이라도 더 기록을 해놓고 정리를 해놔야겠다. 전에 본 적이 있는 함순데 생각이 안나서 못써먹었다...
>
> 프로그래머스에 나오는 복잡도를 확인해보니 내장함수를 사용하는 쪽이 확실히 더 속도가 빠르기도 하고... 파이썬을 떠나서 알고리즘 측면에서는 내가 푼 코드가 더 알아보기 쉬운거같기도 하다ㅎㅎ