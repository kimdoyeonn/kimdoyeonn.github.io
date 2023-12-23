---
title: '[javascript]class 추가, 삭제 - 2'
date: 2020-12-15
tags: [javascript, todolist]
---

전체보기, 완료된 항목, 진행중인 항목에 해당하는 투두를 각각 따로 모아서 볼 수 있는 기능을 만들었다.
어제 사용했던 `classList`의 `add`, `toggle`, `remove`를 사용해서 만들었다.

#### 상태별로 볼 수 있는 버튼 만들기

```html
<div class="state_btn_group">
  <button class="state_btn all" type="button" disabled="disabled">
    전체보기
  </button>
  <button class="state_btn ongoing" type="button">진행중</button>
  <button class="state_btn done" type="button">완료</button>
</div>
```

```javascript
let state_btn = document.querySelectorAll('.state_btn')
for (let i = 0; i < state_btn.length; i++) {
  state_btn[i].addEventListener('click', selected)
}
```

- 버튼에 이벤트 리스너 등록

  리스트와는 다르게 버튼은 한번 등록하고 변경되지 않으므로 리스트의 이벤트리스너를 등록하는 함수의 밖에 작성해서 한번만 등록되도록 만들었다.

```javascript
function selected(){
    let state_btn_group = this.parentNode.querySelectorAll(".state_btn")
    let todo_contents = document.querySelectorAll(".todo_content")
    let state = this.classList[1]

    // 현재 선택된 버튼은 다시 클릭할 수 없음
    for(let i = 0; i < state_btn_group.length; i++){
        if(state == state_btn_group[i].classList[1]){
            state_btn_group[i].disabled = "disabled"
        }else{
            state_btn_group[i].disabled = ""
        }
    }

    // 리스트 display 여부
    for(let i = 0; i < todo_contents.length; i++){
        statement = todo_contents[i].querySelector(".statement")
        if(state == "ongoing"){
            if(statement.checked){
                todo_contents[i].classList.toggle("none")
            }else{
                todo_contents[i].classList.remove("none")
            }
        }else if(state == "done"){
            if(!statement.checked){
                todo_contents[i].classList.toggle("none")
            }else{
                todo_contents[i].classList.remove("none")
            }
        }else if(state == "all"){
            todo_contents[i].classList.remove("none")
        }
    }
```

- `disabled`속성을 사용해서 선택된 버튼을 다시 클릭할 수 없게 구현
- `classList.toggle()`와 `classList.remove()`를 사용해서 현재 화면에 보여야할 리스트만 보이게 해줌
