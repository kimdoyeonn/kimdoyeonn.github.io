---
title: Git - merge 명령어와 옵션들
date: 2021-12-08 23:41:20
categories:
tags:
---

```bash
git merge
```

merge 명령어는 브랜치를 생성하여 작업 후, 두 브랜치를 병합할 때 사용한다.

#####

## merge 명령어 흐름

1. main 브랜치에서 fix 브랜치를 생성한 후, fix 브랜치에서 작업을 진행한다.

   - `checkout -b` 명령어를 사용하면 새로운 브랜치를 만들고 만들어진 브랜치로 이동한다.

   ```bash
   git checkout -b fix
   ```

2. 작업을 완료한 fix 브랜치의 결과를 main 브랜치에 적용시키려고 한다. 일단 `checkout` 명령어를 사용하여 현재 브랜치 위치를 main 브랜치로 이동한다.

   ```bash
   git checkout main
   ```

3. `merge`를 진행한다.

   ```bash
   git merge fix
   ```

#####

## 병합 유형

### Fast-forward

main 브랜치에 fix 브랜치를 병합할 때, main 브랜치의 상태가 변경되지 않았다면 쉽게 병합이 진행될 수 있다. fix 브랜치가 이미 main 브랜치의 상태를 모두 포함하고 있기 때문이다. 이 같은 병합 방식을 **Fast-forward**이라고 한다.

병합이 끝나고 나면 fix 브랜치의 마지막 커밋이 최근 커밋이 되고, fix 브랜치는 사라진다.

### merge commit

하지만 main 브랜치의 상태도 변경되었다면, main 브랜치의 변경과 fix 브랜치의 변경을 합치는 병합이 진행된다. 이 병합 방식은 **merge commit**이라고 한다.

병합이 진행되면서 새로운 커밋이 생성되기 때문에 마지막 커밋은 이 새로운 커밋이 된다. fix 브랜치도 그대로 남는다.

만약 Fast-forward가 가능한 경우에 병합 이후에도 브랜치를 남기고 싶다면 **non-fast-forward** 옵션을 지정하여 병합을 진행하면 된다.

### conflict

만약 main 브랜치과 fix 브랜치가 같은 파일을 수정했다고 가정해보자. 그리고 똑같이 main 브랜치로 fix 브랜치를 병합하는 과정을 진행하면 git은 main브랜치의 변경사항과 fix 브랜치의 변경사항 중에 어떤걸 선택해야할지 알 수 없기 때문에 충돌이 발생하면서 merge를 진행하지 않는다. 이럴 때는 개발자가 직접 코드부분을 보고 해결해주어야 한다.

충돌 부분을 보면 아래와 같은 내용이 있는 것을 확인할 수 있다.

```jsx
add: 변경 사항을 만들어서 인덱스에 등록해보기
<<<<<<< HEAD
commit: 인덱스의 상태를 기록하기
=======
pull: 원격 저장소의 내용을 가져오기
>>>>>>> fix
```

`<<<<<<< HEAD` 아래 부분은 현재 브랜치의 내용 여기서는 main 브랜치의 내용이고, `=======` 아래 부분부터 `>>>>>>> fix` 위까지는 병합하려는 브랜치의 내용, 여기서는 fix 브랜치의 내용이다. 개발자는 이 부분을 확인하여 어떤 부분을 남길지 확인하고 수정하여 다시 커밋을 해주면 된다.

충돌해결을 위한 새로운 커밋을 추가한 새로운 커밋이 마지막 커밋이 되고, main 브랜치의 시작이 새로운 커밋 위치로 이동한다. 이와 같은 방식의 커밋을 **non fast-forward** 라고 한다.

#####

## merge 옵션

### `—squash`

대상 브랜치를 병합할 때, 대상 브랜치가 가진 커밋 이력을 하나의 커밋으로 합쳐서 병합한다.

만약 main 브랜치에서 fix 브랜치를 생성하고 4번의 커밋을 진행했다고 생각해보자. 이 때 main 브랜치로 fix 브랜치르 병합하면서 `--squash` 옵션을 사용하면 5번의 커밋을 무시하고 파일의 변경 내역을 합쳐서 하나의 커밋으로 main 브랜치에 병합된다. 따라서 깔끔한 히스토리와 함께 병합을 할 수 있다.

### `—no-ff`

fast-forward 관계에서 병합을 하면 merge commit이 생략되는데, `--no-ff` 옵션을 사용하면 merge commit이 생성된다. merge commit을 생략해야하는 경우에 사용하는 옵션은 `—ff` 이다.

### `—continue`

병합 과정에서 충돌이 발생한 경우, 충돌을 해결한 후에 `--continue` 사용할 수 있다. 사용할 경우 병합을 이어서 진행한다.

#

참고:

- **[브랜치 통합하기](https://backlog.com/git-tutorial/kr/stepup/stepup1_4.html)**
- **[병합할 때 발생하는 충돌 해결하기](https://backlog.com/git-tutorial/kr/stepup/stepup2_7.html)**
- [[Git] 명령어(4) - merge, conflict](https://victorydntmd.tistory.com/78)
- [https://git-scm.com/docs/git-merge#\_description](https://git-scm.com/docs/git-merge#_description)
