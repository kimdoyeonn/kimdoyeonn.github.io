---
title: '[javascript]리스트에서 항목 삭제, 추가'
date: 2020-12-13
tags: [javascript, todolist]
---

이벤트 리스너 때문에 좀 한참 삽질을 했지만 결국 해결을 했다!

#### 리스트 추가하기

```javascript
let ul = document.querySelector('.list')
document.querySelector('#inputToDo').addEventListener('keypress', function(e) {
  let todo = document.querySelector('#inputToDo').value
  if (todo.trim() == '') {
    return
  }

  // "Enter"가 눌릴 경우 리스트에 값을 추가
  if (e.key == 'Enter') {
    ul.innerHTML +=
      '<li class="todo_content">' +
      '<input type="checkbox" class="statement"><span class="displayed_todo">' +
      todo +
      '</span>' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">' +
      '<path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>' +
      '</svg></li>'

    // 리스트에 등록되었으므로 input을 비워줌
    document.querySelector('#inputToDo').value = ''
    // console.log(todo)

    addEvent() // 이벤트 등록
  }
})

function addEvent() {
  dels = document.querySelectorAll('.bi')
  for (var i = 0; i < dels.length; i++) {
    dels[i].addEventListener('click', deleteitem)
    // console.log("삭제 리스너 등록")
  }
}
```

- 페이지가 로딩되었을 때 실행되어 이벤트를 감지해야하므로 모든 코드는 `window.onload = function(){}`안에 작성해야한다.

- `e.key == 'Enter'`로 엔터가 눌린 이벤트를 판별할 수 있다는걸 몰랐다. 전에 할 때는 13인가 번호로 했던거같은데 문자열로도 판별이 가능하다는게 신기했다.

- `innerHTML`을 사용해서 미리 만들어 둔 `<li>`에 입력된 값을 포함하여 넣어준다.

  > appendchild로도 할 수 있는거같아서 해보려고 했는데 미리 만들어둔 class랑 삭제 문자 부분을 어떻게 해결해야할지 몰라서 못 했다. 문자열로 넣어보려고도 해봤는데 node 타입이 아니라서 에러가 뜸

- 이벤트 리스너는 리스트가 업데이트될 때 마다 새로 등록해줘야한다. 새로 추가된 원소에 이벤트 리스너를 추가하는 식으로만 넣어도 되지 않을까 생각했는데 안됐음

- 이벤트등록은 페이지가 로딩될 때도 실행되어야 하므로 함수로 작성하였다.

```javascript
document.querySelector('#inputToDo').addEventListener('keypress', function(e) {
  let todo = document.querySelector('#inputToDo').value
  if (todo.trim() == '') {
    return
  }

  // "Enter"가 눌릴 경우 리스트에 값을 추가
  if (e.key == 'Enter') {
    // 2020-12-14 template를 사용해서 리스트 추가
    let template = document.querySelector('#template-list-item').innerHTML
    result_template = template.replace('{content}', todo)

    ul.innerHTML += result_template
    // 리스트에 등록되었으므로 input을 비워줌
    inputToDo.value = ''

    addEvent() // 이벤트 등록
  }
})
```

- 템플릿 처음 써봤다! 있으면 좋겠다고 생각한 적은 있었는데 되는지는 몰랐었는데 되다니... 좀더 공부해봐야겠다

#### 리스트 삭제

```javascript
let ul = document.querySelector('.list')
let deleteitem = function() {
  let li = this.parentNode
  ul.removeChild(li)
}

function addEvent() {
  dels = document.querySelectorAll('.bi')
  for (var i = 0; i < dels.length; i++) {
    dels[i].addEventListener('click', deleteitem)
  }
}
addEvent()
```

- 마찬가지로 `window.load = function() {}`안에 작성됨

- `querySelectorAll()`로는 이벤트 등록이 되지 않으므로 반복문을 사용하여 각각의 원소를 꺼내 등록해주어야 한다.

- 삭제는 `removeChild()`를 사용했다. `this.parentNode`를 사용해 클릭된 노드의 부모노드를 가져왔고 그걸 `removeChild()`에 넣어서 삭제를 완료했다.

  > 처음엔 outerHTML이라는 속성이 있길래 그걸 사용하려고 했었음
  >
  > innerHTML을 사용하면 자신 안의 내용을 가져왔는데, outerHTML은 자신을 포함한 내용을 가져옴
