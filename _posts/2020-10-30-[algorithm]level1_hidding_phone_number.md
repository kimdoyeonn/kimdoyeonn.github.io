---
title: "[algorithm] level1 핸드폰 번호 가리기"
excerpt: ""
category:
  - algorithm
tags: [python, algorithm]
---

## 핸드폰 번호 가리기

###### 문제 설명

프로그래머스 모바일은 개인정보 보호를 위해 고지서를 보낼 때 고객들의 전화번호의 일부를 가립니다.
전화번호가 문자열 phone_number로 주어졌을 때, 전화번호의 뒷 4자리를 제외한 나머지 숫자를 전부 `*`으로 가린 문자열을 리턴하는 함수, solution을 완성해주세요.

##### 제한 조건

- s는 길이 4 이상, 20이하인 문자열입니다.

##### 입출력 예

| phone_number | return         |
| ------------ | -------------- |
| 01033334444  | **\*\*\***4444 |
| 027778888    | **\***8888     |

### 내가 푼 풀이

```python
def solution(phone_number):
    answer = ''
    length = len(phone_number)
    answer = '*' * (length-4) + phone_number[-4:]

    return answer
```

### 다른 사람이 푼 풀이

```python
def hide_numbers(s):
    return "*"*(len(s)-4) + s[-4:]

print("결과 : " + hide_numbers('01033334444'));
```

- 변수를 선언하지 않아도 되는 부분을 생각하면서 풀기
- 그 외에는 연습문제라 그런지 다른 사람이 푼 풀이와 크게 다르지 않았음
