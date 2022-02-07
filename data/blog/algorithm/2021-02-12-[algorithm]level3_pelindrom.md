---
title: '[algorithm]level3 가장 긴 펠린드롬'
excerpt: ''
category:
  - algorithm
tags: [algorithm, programmers]
---

참고: [프로그래머스](https://programmers.co.kr/learn/courses/30/lessons/12904)

###### 문제 설명

앞뒤를 뒤집어도 똑같은 문자열을 팰린드롬(palindrome)이라고 합니다.
문자열 s가 주어질 때, s의 부분문자열(Substring)중 가장 긴 팰린드롬의 길이를 return 하는 solution 함수를 완성해 주세요.

예를들면, 문자열 s가 abcdcba이면 7을 return하고 abacde이면 3을 return합니다.

##### 제한사항

- 문자열 s의 길이 : 2,500 이하의 자연수
- 문자열 s는 알파벳 소문자로만 구성

---

##### 입출력 예

| s       | answer |
| ------- | ------ |
| abcdcba | 7      |
| abacde  | 3      |

##### 입출력 예 설명

입출력 예 #1
4번째자리 'd'를 기준으로 문자열 s 전체가 팰린드롬이 되므로 7을 return합니다.

입출력 예 #2
2번째자리 'b'를 기준으로 aba가 팰린드롬이 되므로 3을 return합니다.

### 내 풀이

```python
def solution(s):
    for length in range(len(s)-1, -1, -1):
        start = 0
        end = 0
        while end < len(s):
            end = start + length + 1
            if s[start:end] == (s[start:end])[::-1]:
                return length+1
            start += 1
```

제일 긴 펠린드롬을 찾는 문제이므로 문자열의 길이부터 하나씩 빼면서 해당 길이의 펠린드롬이 문자열에 존재하는지 확인하는 방식으로 문제를 풀었습니다.

for문이 주어진 s의 길이부터 1씩 빼면서 확인할 길이를 length에 넣어주고, while문에서는 length만큼의 문자열을 잘라서 이 문자열이 펠린드롬인지 아닌지를 확인합니다.

처음에 slice가 느릴줄알고 문자열을 뒤집지 않고 인덱스로 확인하는 방법도 해보고 여러가지 방법으로 해보면서 시간초과에 허우적댔는데, 도저히 못풀겠어서 검색을 해보니 역정렬 slice로도 풀리는 것을 보고 허무했다.

- slice의 시간복잡도: l[a:b]일 때 O(b-a)
- reverse 시간 복잡도: l.reverse()(== l[::-1]) -> O(n)

더 효율적으로 푸는 방법도 있긴있지 않을까..?ㅠ 프로그래머스 질문게시판에 역정렬로 못푼다는 식으로 써있었던 것 같은데 내가 잘못봤나보다
