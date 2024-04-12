---
title: '[algorithm]level1 자연수 뒤집어 배열로 만들기'
tags: [algorithm, programmers, java]
last_modified_at: 2020-07-13T08:06:00-05:00
---

> 자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.
>
> 제한조건 : n은 10,000,000,000이하인 자연수입니다.

```java
    public int[] solution(long n) {
        int[] answer = {};

        //처음에 Integer.toString()을 사용하면서 아무생각없이 n을 int로 형변환하여 사용했다가 문제가 안풀림
        //n의 길이는 바꾸지 않으면서 문자열로 변환하기 위해 long형 n에 ""을 더해주었고
        //그대로 길이를 구할 수 있었다.
        int length = (n+"").length();
        answer = new int[length];//구한 n의 길이로 배열을 생성

        long temp = 0;
        for(int i = length-1; i > -1;i--){
   //제일 높은 자리부터 10의 제곱으로 나눠서 한자리씩 배열에 넣어줌
   answer[i] = (int)(n/Math.pow(10,i));
   n=n-(long)Math.pow(10,i) * answer[i];//다음 자리를 넣을 때 필요없는 자리를 가져오지 않기 위해 윗자리수는 지워줌
        }
        return answer;
    }
```
