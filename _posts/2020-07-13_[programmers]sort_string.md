# 문바열 내림차순으로 배치하기

- 문제설명
  - 매개변수로 주어진 문자열을 내림차순으로 정렬하여 새로운 문자열을 리턴하는 함수 작성
  - 문자열은 영문 대소문자로만 구성되어있으며, 대문자는 소문자보다 작은 것으로 간주한다.

```java
import java.util.*;
class Solution {
    public String solution(String s) {
        //매개변수로 받은 문자열을 한 자리씩 잘라 String배열로 만들어준다.
        //toCharArr()로도 가능함 반환형은 char[]
        String[] arr = s.split("");
        
        //Arrays 클래스의 sort method을 사용하여 arr이 오름차순으로 정렬되고
        //Collections.reverseOrder()는 arr를 반대로 정렬시켜준다.
        Arrays.sort(arr, Collections.reverseOrder());
        
        //07-08-2020
        //replace로 풀어보려다가 못풀어서
        //일단 배열에 반복문을 돌려서 element를 가져오는 방법으로 품
        //for(int i=0;i<arr.length;i++){
        //    answer+=arr[i];
        //}
        
        //07-08-2020
        //replaceAll("대체 할 문자","대체 될 문자") 사용
        //[]를 다른 문자와 같이 바꾸려고 하면 오류가 생겨서 여러번 나눠서 써주었더니 해결됨 
        String answer="";
        answer = (Array.toString(arr)).replaceAll(", ","").replaceAll("\\[","").replaceAll("\\]","");
  
        return answer;
  }
}
```

