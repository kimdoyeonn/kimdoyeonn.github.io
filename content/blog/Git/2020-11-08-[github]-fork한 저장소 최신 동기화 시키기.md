---
title: '[github] fork한 저장소 동기회시키기'
tags: [github, remote, fetch, merge, checkout]
---

원본 repository의 변경사항을 fork한 repository에 적용할 때 사용했다.

1. 원본 repository를 remote repository로 추가해야함

   변경사항을 가져올 원본 repository를 upstream이라는 이름으로 remote reqository에 추가한다.

   ```
   git remote add upstream 원본URL
   ```

   `git remote -v`을 실행하면 제대로 추가되었는지 확인할 수 있음

2. `fetch`를 사용하여 원본 repository의 변경사항 가져오기

   ```
   git fetch upstream
   ```

3. checkout을 사용하여 브랜치 선택(ex. main)

   ```
   git checkout main
   ```

4. upstream의 기본 branch(ex.`upstream/main`)를 로컬 기본 branch로 merge. 이 과정에서 내 로컬 변경사항들의 손실없이 upstream repository와 동기화된다.

   ```
   git merge upstream/main
   ```

참조:

[https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/syncing-a-fork]: https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/syncing-a-fork
[https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork]: https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork

[ https://json.postype.com/post/210431 ](https://json.postype.com/post/210431)
