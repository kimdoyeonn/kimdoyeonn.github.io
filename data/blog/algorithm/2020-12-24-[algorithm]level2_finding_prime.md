---
title: '[algorithm]level2 소수 찾기'
excerpt: ''
category:
  - algorithm
tags: [python, programmers, algorithm]
---

참고: [프로그래머스](https://programmers.co.kr/learn/courses/30/lessons/42839)

###### 문제 설명

한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.

각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.

##### 제한사항

- numbers는 길이 1 이상 7 이하인 문자열입니다.
- numbers는 0~9까지 숫자만으로 이루어져 있습니다.
- 013은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미입니다.

##### 입출력 예

| numbers | return |
| ------- | ------ |
| 17      | 3      |
| 011     | 2      |

##### 입출력 예 설명

예제 #1
[1, 7]으로는 소수 [7, 17, 71]를 만들 수 있습니다.

예제 #2
[0, 1, 1]으로는 소수 [11, 101]를 만들 수 있습니다.

- 11과 011은 같은 숫자로 취급합니다.

[출처](http://2009.nwerc.eu/results/nwerc09.pdf)

### 내 풀이

```python
def solution(numbers):
    answer = 0

    # 주어진 문자열로 얻을 수 있는 모든 조합을
    # 인덱스로 seqs에 저장
    seqs = []
    temp = []
    n = [str(i) for i in range(len(numbers))]
    seqs += n
    temp += n
    while 1:
        nums = []
        for i in temp:
            for j in n:
                if j not in i:
                    nums.append(i+j)
        temp = nums
        seqs += nums
        if len(n) == len(nums[-1]):
            break
	# ---------------------------------

    # 앞에서 얻은 조합으로 숫자를 조합해서 temp에 저장
    temp = []
    for seq in seqs:
        num = ""
        for ind in seq:
            num += numbers[int(ind)]
        temp.append(num)
    # ----------------------------

	# 만들어진 숫자들의 중복 제거
    temp = list(set(list(map(int, temp))))
    # ----------------------

    # 나올 수 있는 모든 수가 담긴 temp에서 소수를 확인
    for t in temp:
        if t == 0 or t == 1:
            continue
        for i in range(2, t//2+1):
            if t % i == 0:
                break
        else:
            answer += 1
    # -----------------------------------------

    return answer
```
