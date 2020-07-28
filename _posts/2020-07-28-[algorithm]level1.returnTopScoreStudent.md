---  
title: "[algorithm] level1 모의고사"
excerpt: ""  
category:  

  - algorithm  
tags: [algorithm, programmers]
---  
## 모의고사

###### 문제 설명

수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

##### 제한 조건

- 시험은 최대 10,000 문제로 구성되어있습니다.
- 문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
- 가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.

##### 입출력 예

| answers     | return  |
| ----------- | ------- |
| [1,2,3,4,5] | [1]     |
| [1,3,2,4,2] | [1,2,3] |

##### 입출력 예 설명

입출력 예 #1

- 수포자 1은 모든 문제를 맞혔습니다.
- 수포자 2는 모든 문제를 틀렸습니다.
- 수포자 3은 모든 문제를 틀렸습니다.

따라서 가장 문제를 많이 맞힌 사람은 수포자 1입니다.

입출력 예 #2

- 모든 사람이 2문제씩을 맞췄습니다.

### 내 풀이

```java
public int[] solution(int[] answers) {
    int[] answer = {};
	
    //세명의 점수를 담을 배열과 최고점을 담을 변수 선언
    int[] score={0,0,0};
    int topScore=0;
    //학생들의 답변패턴을 배열로 만듦
    int[] pattern1 = {1,2,3,4,5};
    int[] pattern2 = {2,1,2,3,2,4,2,5};
    int[] pattern3 = {3,3,1,1,2,2,4,4,5,5};
	
    //정답 배열에 반복문사용하여 정답패턴과 비교해 학생의 점수를 매김
    for(int i=0;i<answers.length;i++){
        score[0] = pattern1[i%pattern1.length] == answers[i]?score[0]+1:score[0];
        score[1] = pattern2[i%pattern2.length] == answers[i]?score[1]+1:score[1];
        score[2] = pattern3[i%pattern3.length] == answers[i]?score[2]+1:score[2];
    }//end for

    //최고점 얻기
    int cnt=0;
    for(int i=0;i<score.length;i++){
        if(topScore < score[i]){
            topScore = score[i];
        }//end if
    }//end for

    //학생들의 점수를 최고점과 비교해서 결과 배열의 크기와 최고점 학생 얻기
    //Math.max 찾아보기
    String topStu="";
    String[] student={};
    for(int i=0;i<score.length;i++){
        if(topScore == score[i]){
            cnt++;
            topStu+=(i+1);
        }
    }
    
    //최고점 학생을 결과 배열에 넣어줌
    answer = new int[cnt];
    student = topStu.split("");

    for(int i=0;i<student.length;i++){
        answer[i] = Integer.parseInt(student[i]);
    }

    return answer;
}
```

- List 공부하기
- Math.max method 찾아보기
