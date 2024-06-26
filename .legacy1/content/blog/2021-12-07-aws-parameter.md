---
title: AWS - 환경변수 설정
date: 2021-12-07 22:18:47
categories:
tags:
---

개발을 하다보면 API키나 데이터베이스 비밀번호 같이 외부에 유출되면 안되는 정보들을 사용하게 된다. 이 값들은 소스코드에 직접 포함하여 git 같은 곳에 공유할 경우 문제가 발생할 수 있기 때문에 환경변수로 만들어서 파일을 따로 관리해 주어야 한다.

실습을 하는 동안에는 .env 파일을 사용하여 환경변수를 설정해주고 이 파일이 GitHub에 올라가지 않도록 설정하여 관리했다. AWS에 배포를 할 때도 이와 비슷한 설정을 해주어야 한다.

<aside>
📌 환경변수명은 로컬에서 개발할 때 사용하던 이름 그대로 설정해주면 된다.

</aside>


### 클라이언트

CodeBuild 서비스에서 환경 변수 설정을 할 수 있다.

배포 프로젝트 → 편집 → 환경 → 추가 구성 → 환경변수 입력 → 환경 업데이트 → 변경사항 릴리즈

위 단계로 환경변수를 설정하면 배포된 클라이언트에 환경변수를 적용할 수 있다.


### 서버

AWS Parameter Store 서비스를 이용하여 EC2 인스턴스에 환경변수를 전달할 수 있다. 환경 변수 설정에 앞서 EC2에 AWS CLI가 설치되어 있어야 환경변수가 전달될 수 있다.

파라미터 생성 → 환경변수명, 환경변수값을 입력 → 파라미터 생성 → 자동화배포 때 사용했던 코드에 환경변수를 가져올 수 있는 코드를 작성

```jsx
export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
```