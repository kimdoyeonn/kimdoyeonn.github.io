---
title: "[github]디폴트 브랜치 main으로 전환하기"
excerpt: ""
category:
  - github
tags: [github, branch]
---

![github](https://user-images.githubusercontent.com/53068706/107882617-bb35aa80-6f2d-11eb-9c95-a9818e03212c.png)

작년 추석 연휴쯤 Github Repo의 기본 branch 이름이 master에서 main으로 변경되었다. 이는 IT업계에서 이전부터 논란이 됐던 master/slave, blacklist/whitelist와 같은 인종차별적 언어 문제를 개선하려는 움직임의 일환이었던 것으로 보인다. 조금씩 사회가 살기 좋은 곳으로 변화하는 것은 분명 좋은 일이다. 하지만 그와는 별개로 나는 기존의 설정을 바꾸기 위해 구글링을 좀 해야했다

지금까지는 외면하고 있었지만 깃허브에서 commit, push만 열심히 날리던 나에게 그 이후로 branch 문제가 졸졸 쫓아다니고 있다. 내 컴퓨터는 자꾸 master branch를 생성해서 push해버리는 문제였는데 아마 내 컴퓨터에서 git init을 할 때 생기는 기본 branch의 이름 master인데 더이상 repo에 master branch가 없어서 생긴 문제가 아닐까 추측만 해봤다......🤪

지금까지는 repo를 만들 일도 없고 문제를 확인한 당시에는 어찌저찌 vscode를 만졌더니 다시 잘 되길래 아무 생각 없이 넘어갔는데 지금 repo를 생성해서 push를 날리고 보니 해결 된 것이 아니었다는 것을 알았다. 어차피 언젠가는 해결해야될 문제였으니 지금이라도 알아서 다행이라 생각한다. 그리고 하는 김에 기존에 master로 설정되어있던 branch까지 싹다 바꿀거다!👊



## 로컬 저장소 default branch 변경하기

git config에서 default branch를 main으로 변경하는 명령어를 날려야한다.

```
git config --global init.defaultBranch main
```

이 이후로는 `git init`으로 로컬에서 repo를 생성하면 default branch가 `main`으로 생성된다.



## 기존 branch 명 변경하기

이 블로그 repo도 예전에 생성되었기 때문에 기본 branch가 master로 설정되어있었다. 일단 이 이름부터 바꿔주었다. 

repo로 들어가서 `setting` -> `Branches` -> `Default branch`에서 branch이름을 원하는 이름으로 수정할 수 있었다. 나는 헷갈리지 않게 `main`으로 설정했다.



## 이미 생성된 프로젝트의 default branch 변경하기

기존에 default branch로 master를 쓰고 있는 프로젝트도 main으로 변경했다.

```
git checkout -B main
git push -u origin main
```

위의 명령어는 구글링으로 찾은 것인데, github에서 알려주는 방법도 있었다.

```
git branch -m master main
git fetch origin
git branch -u origin/main main
```

첫번째 방법으로 하기는 했는데 둘 중 아무거나로 해도 상관없을 것 같다.

### 확인하기

변경을 완료한 후에 다음 명령어를 입력해보면 branch가 잘 바뀌었는지 확인할 수 있다.

```
git branch -a
```

![default_branch_master_to_main](https://user-images.githubusercontent.com/53068706/107882623-c7ba0300-6f2d-11eb-82f1-2f663e2c12f5.png)

참고: https://youngjinmo.github.io/2020/10/github-branch-to-main/