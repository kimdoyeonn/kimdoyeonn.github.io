---
title: '[algorithm] 분할정복'
excerpt: ''
category:
  - algorithm
tags: [algorithm]
---

1. 기본단계를 해결한다. 가능한한 작은 문제여야 한다.
2. 문제가 기본단계가 될 때까지 나누거나 작게 만든다.

```
function F(x):
  if F(x)의 문제가 간단 then:
    return F(x)을 직접 계산한 값
  else:
    x 를 y1, y2로 분할
    F(y1)과 F(y2)를 호출
    return F(y1), F(y2)로부터 F(x)를 구한 값
```

### 유클리드 호제법

- 두 수의 최대 공약수를 구하는 알고리즘
- 한 수가 다른 한 수의 약수가 될 때(기본단계)까지 나누는 방식(재귀)으로 동작한다.

### 배열을 사용한 분할 정복

```python
def sum(nums):
  if nums: # 재귀
    return nums[0] + sum(nums[1:])
  else: # 기본단게, nums가 빈 배열일 때
    return 0
```

- 분할 정복을 사용해서 배열의 합을 구하는 함수이다.
- 배열을 포함한 재귀함수를 만들 때는 기본단계를 빈 배열이나 원소가 하나뿐인 배열로 정한다.

- 반복문으로 할 수 있는데 재귀를 사용하는 이유

  - 하스켈과 같은 함수형 프로그래밍 언어에는 반복문이 존재하지 않는다. 때문에 무조건 재귀함수를 사용해야 한다.
  - 반복문을 사용할 수 있는데 재귀함수를 사용하는 것은, 이런 함수형 프로그래밍 언어를 살짝 맛보는 것이라고 할 수 있다.

출처: 그림으로 개념을 이해하는 알고리즘, [분할정복알고리즘](https://ko.wikipedia.org/wiki/%EB%B6%84%ED%95%A0_%EC%A0%95%EB%B3%B5_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98), [유클리드 호제법](https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95)
