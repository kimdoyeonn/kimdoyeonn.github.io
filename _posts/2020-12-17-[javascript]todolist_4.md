---
title: "[javascript]새로고침했을 때 리스트 상태 유지하기"
excerpt: ""
category:
  - javascript
tags: [javascript, todolist]
---

새로고침했을 때 저장된 리스트, 체크여부를 유지하기 위해 `localStrage`를 사용하여 구현해보았다.

`localStrage`는 `window.localStrage`로 사용할 수 있고 window를 생략하고 `localStrage`로 사용하는 것도 가능하다.



#### 리스트 유지하기

__template 수정__

```html
<!-- js 템플릿 -->
<script id="template-list-item" type="text/template">
	<li class="todo_content">
        <input type="checkbox" class="statement" {checked}><span class="displayed_todo {class}">{content}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        	<path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    </li>
</script>
```

- `{checked}`: checkbox에 체크를 등록해주기 위해
- `{class}`: 취소선의 여부
- `{content}`: 투두리스트의 내용



__저장하기__

```javascript
let savedList = JSON.parse(localStorage.getItem("toDoList"))

// 엔터로 등록했을 때 화면에 보이는 동시에 localStrage에 저장해줌
savedList[todo] = ""	// 새로운 리스트를 dictionary에 담아줌
window.localStorage.setItem("toDoList",JSON.stringify(savedList))	// 업데이트된 dictionary를 localStrage에 새로 저장해줌
```

저장되어있는 리스트를 `localStrage.getItem()`을 사용해서 불러온다. 저장할 때 `localStrage.setItem()`만 해주었을 때는 문자열 형식으로만 저장된다. 때문에 저장할 때는 `JSON.stringify()` 메서드를 사용해서 자바스크립트 객체를 JSON 문자열로 변환하여 저장하고, 불러올 때는 `JSON.parse()` 메서드를 사용하여 자바스크립트 객체로 바꾸어서 불러왔다.



__불러오기__

```javascript
if (savedList){
    let template = document.querySelector("#template-list-item").innerHTML
    for(let key in savedList){
        displayed_temp = template.replace("{content}", key).replace("{checked}", savedList[key])
        if(savedList[key] == "checked"){
            displayed_temp = displayed_temp.replace("{class}","strike")
        }
        ul.innerHTML += displayed_temp
    }
}
```

리스트의 dictionary가 비어있지 않다면, template에 dictionary를 대입해서 화면에 보여줌



__삭제__

```javascript
let deleteitem = function(){
    let li = this.parentNode;
    ul.removeChild(li);

    // 2020-12-16 localStrage에서 삭제
    delete savedList[li.innerText.trim()]
    localStorage.setItem("toDoList", JSON.stringify(savedList))
}  
```

`<li>`에서 삭제할 때 `localStrage`에서 같이 삭제 해줌



__진행상태(완료, 진행중)__

```javascript
function check_todo(){
    let displayed_todo = this.parentNode
    if(this.checked){
        displayed_todo.classList.add("strike")
        displayed_todo.querySelector(".statement").setAttribute("checked", true)
        savedList[displayed_todo.innerText.trim()] = "checked"
    }else{
        displayed_todo.classList.remove("strike")
        savedList[displayed_todo.innerText.trim()] = ""
    }
    localStorage.setItem("toDoList", JSON.stringify(savedList))
}
```

체크박스가 눌렸을 때 체크 여부를 확인하고 취소선을 그어주는 함수이다. 새로고침 후에 저장된 리스트를 불러올 때 완료 여부를 확인하기 위해서 완료되었으면 key를 리스트내용으로 하고 완료 여부를 value로 가지게 만들었고 완료되었을 경우 "checked"를, 진행중일 경우 ""를 value로 넣어주었다.

마찬가지로 dictionary가 업데이트되었기 때문에 localStrage에 새로 값을 저장해주었다.

