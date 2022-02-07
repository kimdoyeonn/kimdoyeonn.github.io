---
title: '[algorithm]level1 하샤드수'
excerpt: ''
category:
  - algorithm
tags: [algorithm, programmers, java]
---

###### 문제 설명

양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 합니다. 예를 들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수입니다. 자연수 x를 입력받아 x가 하샤드 수인지 아닌지 검사하는 함수, solution을 완성해주세요.

##### 제한 조건

- `x`는 1 이상, 10000 이하인 정수입니다.

##### 입출력 예

| arr | return |
| --- | :----: |
| 10  |  true  |
| 12  |  true  |
| 11  | false  |
| 13  | false  |

##### 입출력 예 설명

**입출력 예 #1**
10의 모든 자릿수의 합은 1입니다. 10은 1로 나누어 떨어지므로 10은 하샤드 수입니다.

**입출력 예 #2**
12의 모든 자릿수의 합은 3입니다. 12는 3으로 나누어 떨어지므로 12는 하샤드 수입니다.

**입출력 예 #3**
11의 모든 자릿수의 합은 2입니다. 11은 2로 나누어 떨어지지 않으므로 11는 하샤드 수가 아닙니다.

**입출력 예 #4**
13의 모든 자릿수의 합은 4입니다. 13은 4로 나누어 떨어지지 않으므로 13은 하샤드 수가 아닙니다.

### 내 풀이

```java
public boolean solution(int x) {
        boolean answer = false;

        int input = x;
        int sum = 0;

        while(input > 0){
            //10을 계속 나눠주면서 그 나머지를 더하면 모든 자리의 합이 구해진다.
        	sum += input % 10;
            input = input/10;
        }

    	//입력값이 sum으로 나누어떨어지면 하샤드수
        if( x % sum == 0){
            answer = true;
        }

        return answer;
    }
```
