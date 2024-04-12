---
title: '[algorithm]level3 여행경로'

tags: [algorithm, programmers]
---

###### 문제 설명

주어진 항공권을 모두 이용하여 여행경로를 짜려고 합니다. 항상 "ICN" 공항에서 출발합니다.

항공권 정보가 담긴 2차원 배열 tickets가 매개변수로 주어질 때, 방문하는 공항 경로를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

##### 제한사항

- 모든 공항은 알파벳 대문자 3글자로 이루어집니다.
- 주어진 공항 수는 3개 이상 10,000개 이하입니다.
- tickets의 각 행 [a, b]는 a 공항에서 b 공항으로 가는 항공권이 있다는 의미입니다.
- 주어진 항공권은 모두 사용해야 합니다.
- 만일 가능한 경로가 2개 이상일 경우 알파벳 순서가 앞서는 경로를 return 합니다.
- 모든 도시를 방문할 수 없는 경우는 주어지지 않습니다.

##### 입출력 예

| tickets                                                                         | return                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------ |
| [["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]]                                | ["ICN", "JFK", "HND", "IAD"]               |
| [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]] | ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"] |

##### 입출력 예 설명

예제 #1

["ICN", "JFK", "HND", "IAD"] 순으로 방문할 수 있습니다.

예제 #2

["ICN", "SFO", "ATL", "ICN", "ATL", "SFO"] 순으로 방문할 수도 있지만 ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"] 가 알파벳 순으로 앞섭니다.

### 내 풀이

```python
from collections import defaultdict
def solution(tickets):
    def dfs():
        temp = ["ICN"]
        answer = []

        while temp:
            port = temp[-1]

            if port not in routes or routes[port] == []:
                answer.append(temp.pop())
            else:
                temp.append(routes[port].pop(0))

        return answer[::-1]


    routes = defaultdict(list)
    for ticket in tickets:
        key, value = ticket
        routes[key].append(value)

    for key in routes:
        routes[key].sort()

    answer = dfs()

    return answer
```

- 주어진 티켓들의 출발지와 도착지를 lise가 value인 dict형으로 재구성하고 list는 사전 순서로 정렬해주었다.
- 첫 출발지인 ICN부터 순서대로 temp에 넣어주면서 temp이후에 갈 수 있는 티켓이 있는지 확인한 후에 갈 수 있다면 temp에 다음 공항을 넣어주고 그렇지 않다면 answer에 temp의 값을 pop 하는 식으로 값을 구했다. 이 때 answer에는 값이 거꾸로 들어가므로 역정렬해준 후에 답을 출력해준다.
