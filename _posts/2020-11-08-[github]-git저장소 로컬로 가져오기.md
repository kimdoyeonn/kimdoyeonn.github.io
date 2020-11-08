---
title: "[github] 원격저장소를 로컬저장소로 가져오기"
excerpt: ""
category:
  - github
tags: [github, clone, init]
---
github를 이용해서 스터디를 하면서 repo를 만들 일이 많아졌다. 만드는건 github 페이지에서 하니까 크게 어렵지 않은데 문제는 원격 저장소와 로컬 저장소를 연결할 때다. 그 전에는 할 일이 자주 없어서 해야 될 때마다 구글에서 검색해서 보고 따라하는 것으로 해결했다. 근데 이번에 github기능이 뭐가 되나 보면서 fork 기능을 사용해서 뭘 좀 해보려고 하는데 시도하기도 전에 저장소 가져오는 것부터 버벅거리는게 답답하고 인터넷에 관련 포스팅들이 너무 많아 나한테 맞게 기록해두려고 한다.

1. `git init`

   프로젝트 디렉토리로 가서 `git init`을 실행한다. 디렉토리에 git 저장소가 새로 만들어지고 프로젝트를 버전관리 할 수 있다.

   이 명령어를 실행하면 내부에서 어떤 일이 일어나는지 (링크)[https://git-scm.herokuapp.com/book/ko/v2/Git%EC%9D%98-%EB%82%B4%EB%B6%80-Plumbing-%EB%AA%85%EB%A0%B9%EA%B3%BC-Porcelain-%EB%AA%85%EB%A0%B9#_plumbing_porcelain]

2. `git clone URL주소 .`

   .을 붙이지 않으면 폴더 형태로 불려오기 때문에 안의 파일들을 가져오려면 `.`을 작성해주어야 한다.