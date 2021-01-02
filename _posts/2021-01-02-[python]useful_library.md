---
title: "[python]코딩테스트에서 유용한 표준 라이브러리"
excerpt: ""
category:
  - algorithm
tags: [python, algorithm, coding_test]
---

참고: [동빈나 유튜브](https://www.youtube.com/watch?v=m-9pAwq1o3w&list=PLRx0vPvlEmdAghTr5mXQxGpHjWqSz0dgC)

- 내장함수: 기본 입출력 함수부터 정렬 함수까지 기본적인 함수들을 제공합니다.
- itertools: 파이썬에서 반복되는 형태의 데이터를 처리하기 위한 유용한 기능들을 제공합니다.
  - 특히 순열과 조합 라이브러리는 코딩 테이트에서 자주 사용합니다. (완전탐색)
- heapq: 힙(Heap) 자료구조를 제공합니다.
  - 일반적으로 우선순위 큐 기능을 구현하기 위해 사용합니다.
- bisect: 이진 탐색(Binary Search) 기능을 제공합니다.

- collections: 덱(deque), 카운터(Counter) 등의 유용한 자료구조를 포함합니다.
- math: 필수적인 수학적 기능을 제공합니다.
  - 팩토리얼, 제곱근, 최대공약수(GCD), 삼각함수 관련 함수부터 파이(pi)와 같은 상수를 포함합니다.



`sum()` 리스트의 합

`min()`, `max()` 최숫값 최솟값

`eval()` 사람의 입장에서 작성된 수식을 계산하여 반환

`sorted()` 반복가능한 객체를 정렬

​	key 속성으로 정렬 기준을 정의해줄 수 있음



#### 순열과 조합

- itertools 라이브러리를 사용
- **순열**: 서로 다른 n 개에서 서로 다른 r개를 선택하여 일렬로 나열하는 것
- **조합**: 서로 다른 n 개에서 순서에 상관없이 서로 다른 r개를 선택하는 것

```python
from itertools import permutations, combinations, product, combinations_with_replacement

data = ['A', 'B', 'C'] # 데이터 준비

result1 = list(permutations(data, 3)) # 모든 순열 구하기 (3개롤 골라 순서를 고려하여)
result2 = list(combinations(data, 2)) # 모든 조합 구하기 (2개를 뽑아 순서를 고려하지 않고)
result3 = list(product(data, repeat=2)) # 2개를 뽑는 모든 순열 구하기 (중복순열)
result4 = list(combinations_with_replacement(data, 2)) # 2개를 뽑는 모든 조합 구하기(중복조합)
```

 

#### Counter

- 파이썬 collections 라이브러리의 **Counter**는 등장 횟수를 세는 기능을 제공합니다.
- 리스트와 같은 반복 가능한(iterable) 객체가 주어졌을 때 내부의 원소가 몇 번씩 등장했는지를 알려줍니다.

```python
from collections import Conunter

counter = Counter(['red', 'blue', 'red', 'green', 'blue', 'blue'])

print(counter['blue']) # 'blue'가 등장한 횟수 출력
print(counter['green']) # 'green'이 등장한 횟수 출력
print(dict(counter))	# 사전 자료형으로 반환
```



#### 최대 공약수와 최소 공배수

- 최대 공약수를 구해야 할 때 math 라이브러리의 gcd() 함수를 이용할 수 있습니다.

```python
import math

# 최소 공배수(LCM)을 구하는 함수
def lcm(a, b):
    return a * b // math.gcd(a, b)

a = 21
b = 14

print(math.gcd(a,b)) # 최대 공약수(GCD) 계산
print(lcm(21,14)) # 최소 공배수(LCM) 계산
```

- 팩토리얼, 재곱근 함수, 원주율 상수 등등을 사용할 수 있음