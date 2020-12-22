---
title: "[algorithm]level2 카펫"
excerpt: ""
category:
  - algorithm
tags: [python, programmers, algorithm]
---

참고: [프로그래머스](https://programmers.co.kr/learn/courses/30/lessons/42842)

###### 문제 설명

Leo는 카펫을 사러 갔다가 아래 그림과 같이 중앙에는 노란색으로 칠해져 있고 테두리 1줄은 갈색으로 칠해져 있는 격자 모양 카펫을 봤습니다.

![carpet.png](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/b1ebb809-f333-4df2-bc81-02682900dc2d/carpet.png)

Leo는 집으로 돌아와서 아까 본 카펫의 노란색과 갈색으로 색칠된 격자의 개수는 기억했지만, 전체 카펫의 크기는 기억하지 못했습니다.

Leo가 본 카펫에서 갈색 격자의 수 brown, 노란색 격자의 수 yellow가 매개변수로 주어질 때 카펫의 가로, 세로 크기를 순서대로 배열에 담아 return 하도록 solution 함수를 작성해주세요.

##### 제한사항

- 갈색 격자의 수 brown은 8 이상 5,000 이하인 자연수입니다.
- 노란색 격자의 수 yellow는 1 이상 2,000,000 이하인 자연수입니다.
- 카펫의 가로 길이는 세로 길이와 같거나, 세로 길이보다 깁니다.

##### 입출력 예

| brown | yellow | return |
| ----- | ------ | ------ |
| 10    | 2      | [4, 3] |
| 8     | 1      | [3, 3] |
| 24    | 24     | [8, 6] |



### 내 풀이

```python
def solution(brown, yellow):
    answer = []
    
    area = brown + yellow
    
    height = 3
    while 1:
        
        if area % height == 0:
            width = area // height
            if brown == (height + width)*2-4:
                break
        
        height += 1
        
    answer = [width, height]
    
    return answer
```

노란부분과 갈색부분의 합이 넓이이고 높이와 너비의 최솟값이 3안 것을 이용해서 풀었다.

높이의 최솟값인 3부터 하나씩 늘려가면서 넓이에 나누어떨어지는 수를 찾아서 그 떄 갈색 부분의 개수와 문제에서 주어진 갈색부분의 개수를 비교하면 조건에 맞는 너비와 높이를 구할 수 있었다.

