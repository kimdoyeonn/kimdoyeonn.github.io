---
title: "[algorithm]level3 섬 연결하기"
excerpt: ""
category:
  - algorithm
tags: [algorithm, programmers]
---

###### 문제 설명

n개의 섬 사이에 다리를 건설하는 비용(costs)이 주어질 때, 최소의 비용으로 모든 섬이 서로 통행 가능하도록 만들 때 필요한 최소 비용을 return 하도록 solution을 완성하세요.

다리를 여러 번 건너더라도, 도달할 수만 있으면 통행 가능하다고 봅니다. 예를 들어 A 섬과 B 섬 사이에 다리가 있고, B 섬과 C 섬 사이에 다리가 있으면 A 섬과 C 섬은 서로 통행 가능합니다.

**제한사항**

- 섬의 개수 n은 1 이상 100 이하입니다.
- costs의 길이는 `((n-1) * n) / 2`이하입니다.
- 임의의 i에 대해, costs[i][0] 와 costs[i] [1]에는 다리가 연결되는 두 섬의 번호가 들어있고, costs[i] [2]에는 이 두 섬을 연결하는 다리를 건설할 때 드는 비용입니다.
- 같은 연결은 두 번 주어지지 않습니다. 또한 순서가 바뀌더라도 같은 연결로 봅니다. 즉 0과 1 사이를 연결하는 비용이 주어졌을 때, 1과 0의 비용이 주어지지 않습니다.
- 모든 섬 사이의 다리 건설 비용이 주어지지 않습니다. 이 경우, 두 섬 사이의 건설이 불가능한 것으로 봅니다.
- 연결할 수 없는 섬은 주어지지 않습니다.

**입출력 예**

| n    | costs                                     | return |
| ---- | ----------------------------------------- | ------ |
| 4    | [[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]] | 4      |

**입출력 예 설명**

costs를 그림으로 표현하면 다음과 같으며, 이때 초록색 경로로 연결하는 것이 가장 적은 비용으로 모두를 통행할 수 있도록 만드는 방법입니다.

![image.png](https://grepp-programmers.s3.amazonaws.com/files/production/13e2952057/f2746a8c-527c-4451-9a73-42129911fe17.png)



### 내 풀이

```python
def solution(n, costs):
    answer = 0
    
    def union(x, y):
        x = cycle[x]
        y = cycle[y]
        
        if x < y:
            cycle[y] = x
            for i, c in enumerate(cycle):
                if c == y:
                    cycle[i] = x
        else:
            cycle[x] = y
            for i, c in enumerate(cycle):
                if c == x:
                    cycle[i] = y
                    
        
    costs.sort(key=lambda x: x[2])
    cycle = [i for i in range(n)]
    
    for cost in costs:
        if cycle[cost[0]] != cycle[cost[1]]:
            union(cost[0], cost[1])
            answer += cost[2]
        # print(cycle)
    return answer
```

- [크루스칼 알고리즘](https://awesomeroo.tistory.com/87)을 사용해서 품
- 비용순서을 기준으로 오름차순으로 costs배열을 정렬한 후, 비용이 제일 낮은 다리부터 순서대로 사이클이 되지 않고 트리 형태를 만들도록 확인하며 연결하는 방식
- 자신이 연결된 트리의 루트를 저장하는 cycle이라는 리스트를 만들고 초기값은 자신의 값을 넣어줌
- 반복문을 돌면서 연결할 두 섬의 루트가 다르면 다리(트리)를 연결하기 위해 서로의 루트를 비교하고 새로운 루트로 업데이트 시켜줌(`union`)