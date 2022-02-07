---
title: '[algorithm]level1 최대공약수와 최소공배수'
excerpt: ''
category:
  - algorithm
tags: [algorithm, programmers, java]
---

###### 문제 설명

두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환하는 함수, solution을 완성해 보세요. 배열의 맨 앞에 최대공약수, 그다음 최소공배수를 넣어 반환하면 됩니다. 예를 들어 두 수 3, 12의 최대공약수는 3, 최소공배수는 12이므로 solution(3, 12)는 [3, 12]를 반환해야 합니다.

##### 제한 사항

- 두 수는 1이상 1000000이하의 자연수입니다.

##### 입출력 예

| n   | m   | return  |
| --- | --- | ------- |
| 3   | 12  | [3, 12] |
| 2   | 5   | [1, 10] |

##### 입출력 예 설명

입출력 예 #1
위의 설명과 같습니다.

입출력 예 #2
자연수 2와 5의 최대공약수는 1, 최소공배수는 10이므로 [1, 10]을 리턴해야 합니다.

#### 내 풀이

```java
public int[] solution(int n, int m) {
    int[] answer = {};
    answer = new int[2];

    //n에는 작은 수 m에는 큰 수를 넣어 줌
    int temp=0;
    if(n > m){
        temp = n;
        n = m;
        m = temp;
    }

    // 최대공약수
    // i가 작은 수 n 부터 1까지 1씩 감소하는 반복문을 돌려주고
    for(int i=n; i > 0;i--){
        //n이 i에 나누어 떨어지면 다음 코드를 진행
        //코드를 진행하지 않고 i--
        if(n % i != 0){
            continue;
        }

        //n이 나누어 떨어지고 m도 나누어 떨어지는 수 중에 제일 큰 수가 최대 공약수
        // 조건에 맞다면 break
        if(m % i == 0) {
            answer[0] = i;
            break;
        }
    }//end for

    //최소공배수
    //m 부터 m*n까지 m씩 증가하는 반복문을 돌려줌
    for(int j=m;j<m*n+1;j+=m){
        //j가 n에 나누어 떨어진다면 j는 n의 배수이므로 최소공배수
        if(j % n == 0){
            answer[1] = j;
            break;
        }
    }

    return answer;
}
```
