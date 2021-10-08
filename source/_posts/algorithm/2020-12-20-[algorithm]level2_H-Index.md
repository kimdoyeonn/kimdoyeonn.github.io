---
title: "[algorithm]level2 H-Index"
excerpt: ""
category:
  - algorithm
tags: [python, programmers, algorithm]
---

참고: [프로그래머스](https://programmers.co.kr/learn/courses/30/lessons/42747)

###### 문제 설명

H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다. 어느 과학자의 H-Index를 나타내는 값인 h를 구하려고 합니다. 위키백과[1](https://programmers.co.kr/learn/courses/30/lessons/42747#fn1)에 따르면, H-Index는 다음과 같이 구합니다.

어떤 과학자가 발표한 논문 `n`편 중, `h`번 이상 인용된 논문이 `h`편 이상이고 나머지 논문이 h번 이하 인용되었다면 `h`의 최댓값이 이 과학자의 H-Index입니다.

어떤 과학자가 발표한 논문의 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때, 이 과학자의 H-Index를 return 하도록 solution 함수를 작성해주세요.

##### 제한사항

- 과학자가 발표한 논문의 수는 1편 이상 1,000편 이하입니다.
- 논문별 인용 횟수는 0회 이상 10,000회 이하입니다.

##### 입출력 예

| citations       | return |
| --------------- | ------ |
| [3, 0, 6, 1, 5] | 3      |

##### 입출력 예 설명

이 과학자가 발표한 논문의 수는 5편이고, 그중 3편의 논문은 3회 이상 인용되었습니다. 그리고 나머지 2편의 논문은 3회 이하 인용되었기 때문에 이 과학자의 H-Index는 3입니다.

※ 공지 - 2019년 2월 28일 테스트 케이스가 추가되었습니다.



### 내 풀이

```python
def solution(citations):
    n = len(citations)
    citations.sort(reverse=True)
    i = 0
    
    while citations[i] > i:
        i += 1
        if i == n:
            break
            
    return i
```

1. `나머지 논문이 h번 이하 인용되었다면` -> citations를 정렬한 이유 ( 반복문을 돌면서 큰 수부터 확인하기 위해 내림차순 )

   ​	`[6, 5, 3, 1, 0]`

2. 정렬하여 얻은 결과를 반복하면서 인덱스와 인덱스에 해당하는 원소를 비교한다.

   인덱스가 정렬된 리스트의 원소보다 커질 때 "`h`번 이상 인용된 논문이 `h`편 이상이고"를 만족하게 된다.

   6 > 0

   5 > 1

   3 > 2

   1 > 3  -> False -> return 3

   while문이 다 돌 때까지 탈출 조건에 만족하지 않는 경우가 있을 수 있다. [2, 2]

   2 > 0

   2 > 1

   IndexError

   이 때 올바른 결과를 반환하기 위해 `i == n`일 경우 while문을 탈출하도록 했다.