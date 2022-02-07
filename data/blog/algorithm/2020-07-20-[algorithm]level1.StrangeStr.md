---
title: '[algorithm]level1 이상한 문자 만들기'
excerpt: ''
category:
  - algorithm
tags: [algorithm, programmers, java]
---

###### 문제 설명

문자열 s는 한 개 이상의 단어로 구성되어 있습니다. 각 단어는 하나 이상의 공백문자로 구분되어 있습니다. 각 단어의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열을 리턴하는 함수, solution을 완성하세요.

##### 제한 사항

- 문자열 전체의 짝/홀수 인덱스가 아니라, 단어(공백을 기준)별로 짝/홀수 인덱스를 판단해야합니다.
- 첫 번째 글자는 0번째 인덱스로 보아 짝수번째 알파벳으로 처리해야 합니다.

##### 입출력 예

| s               | return          |
| --------------- | --------------- |
| try hello world | TrY HeLlO WoRlD |

##### 입출력 예 설명

try hello world는 세 단어 try, hello, world로 구성되어 있습니다. 각 단어의 짝수번째 문자를 대문자로, 홀수번째 문자를 소문자로 바꾸면 TrY, HeLlO, WoRlD입니다. 따라서 TrY HeLlO WoRlD 를 리턴합니다.

### 내 풀이

문장 전체를 반복문을 돌리고 띄어쓰기를 기준으로 계산되는 인덱스변수도 선언해주었다.

`s.split(" ")`을 사용하여 문자열 배열을 만들어 보려고 했는데 split은 `" "`이 여러번 나오는 경우에도 모두 지우고 배열을 만들어버려서 실패

```java
public String solution(String s) {
  String answer = "";
  String letter = "";
  int j=0;
  for(int i =0; i<s.length();i++) {
	  letter = Character.toString(s.charAt(i));
	  //letter가 " "이면 answer에 " "을 추가
      //다음 단어를 연산하기 위해 j를 0으로 초기화
      //아래 코드로 넘어가지 않고 다음 연산을 진행하기 위해 continue
      if(letter.equals(" ")) {
		  answer += " ";
		  j=0;
		  continue;
	  }

	  if(j % 2 == 0) {
		  answer += letter.toUpperCase();
		  j++;
	  }else {
		  answer += letter.toLowerCase();
		  j++;
	  }
  }
  return answer;
}
```

- 문제를 제대로 읽자
- 문자열을 비교할 때는 `"".equals("")`

### 다른 사람 풀이

```java
int cnt = 0;
//문자열을 하나씩 잘라서 배열에 넣어줌
String[] array = s.split("");
//배열 인덱스 순서대로 문자열을 ss에 대입하여 연산
for(String ss : array) {
    //ss에 " "가 있으면 cnt를 0으로 초기화하고 없으면 + 1을 해줌
    cnt = ss.contains(" ") ? 0 : cnt + 1;
    //" "일 때 cnt가 0이니까
    //짝수 자리의 수를 대문자로 바꾸어 주려면
    //cnt가 홀수 인 자리를 대문자로 바꾸고 cnt가 짝수인 자리를 소문자로 바꾸어 주어야한다.
    answer += cnt%2 == 0 ? ss.toLowerCase() : ss.toUpperCase();
}
```
