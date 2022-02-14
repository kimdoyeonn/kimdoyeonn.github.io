---
title: "[javascript]class 추가, 삭제, 등록"
excerpt: ""
category:
  - javascript
tags: [javascript, todolist]
---

클래스를 추가하는 방법으로 취소선을 그어주려고 했다. 완료된 항목에 스타일을 적용하는 것까지는  쉽게 구현하였는데, 체크박스의 상태를 유지시켜줄 요소가 없어서인지 새로운 항목을 추가하면 체크박스가 체크되지 않은 상태로 돌아가버렸다. 그걸 해결하는데 좀 머리가 아팠다... 
그 전에 학원을 다니면서 jQuery로는 구현해 본 적이 있는데, 한번 쉽게 했던 것을 바닐라 자바스크립트로 구현해보려고 하니까 머리 속이 꼬여서 더 어려웠던 것 같다.

#### 완료된 리스트

```javascript
function addEvent(){
    // 클릭시 항목이 삭제될 수 있도록 리스너 등록
    dels = document.querySelectorAll(".bi")
    for(var i=0; i<dels.length; i++){
        dels[i].addEventListener('click', deleteitem);
    }

    // 상태를 표시하는 체크박스 리스너 등록
    checkbox = document.querySelectorAll(".statement")
    for(let i = 0; i < checkbox.length; i++){
        checkbox[i].addEventListener("change",check_todo)
    }
}
addEvent();

function check_todo(){
    let displayed_todo = this.parentNode
    if(this.checked){
        displayed_todo.classList.add("strike")
        displayed_todo.querySelector(".statement").setAttribute("checked", true)
    }else{
        displayed_todo.classList.remove("strike")
    }
    console.log(displayed_todo.classList.value)
}
```

- `window.onload = function(){}`안에 작성하였다.

- 이벤트리스너를 등록해주어야 하기 때문에 삭제 이벤트 리스너를 등록하기 위해 생성했던 함수에 체크박스 이벤트 리스너도 동시에 등록될 수 있도록 작성했다.

  > 지금 생각해보니까 for 문을 동시에 같이 돌려도 될 거 같다.

- 체크박스가 체크될 경우 미리 생성해놓은 `"strike"` 클래스를 추가할 수 있게 `classList`의 add를 사용해서 class를 추가하였고, 동시에 노드에 `checkbox`가 체크되었음을 작성해주기 위해 `setAttribute("checked", true)`를 사용해서 노드에 checked 속성이 추가될 수 있도록 했다.

  -> 별도로 노드에 checked의 여부를 작성해주지 않으면 새로운 목록을 추가하면서 리스트가 업데이트될 때 체크박스가 풀림

- 체크박스의 체크를 해제하면 `classList.remove()`를 사용해 `"strike"`를 삭제해준다.
- `classList.toggle()`-> 클래스에 있으면 추가하지 않고 없으면 추가함



```css
.strike {
  text-decoration: line-through;
}
```

- `text-decoration`속성에  `line-through`를 적용해서 텍스트에 취소선이 적용되도록 만들었다.