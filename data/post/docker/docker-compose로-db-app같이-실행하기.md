---
title: docker compose로 DB랑 APP 한번에 실행하기
date: '2024-10-14'
tags: ['docker', 'docker-compose']
draft: true
---

최근에 docker를 더 공부해보다보니 Dockerfile은 단일 컴포넌트를 띄울 때 사용하고, docker-compose는 다중 컴포넌트를 띄울 때 사용한다는 것을 알게 되었다.
이전에 팀 프로젝트를 했을 때 DB는 docker compose를 사용해서 띄웠고, app은 그냥 로컬에서 실행해서 개발을 했었는데, 문득 docker-compose 안에서 app까지 한번에 띄워서 개발을 할 수 없는지 궁금해져서 한번 해보기로 했다.

## docker를 사용하고 로컬에서 DB 실행하기 싫어병이 완치됨

나는 로컬에서 DB를 실행하는 것을 피하고 싶은 사람이었다.. 지금까지는 프론트엔드 개발을 주로 했기 때문에 DB를 로컬에서 실행할 일이 없었는데, 백엔드 개발을 공부하면서 어쩔 수 없이 DB를 로컬에서 실행해야했다.. 근데 그 때 docker를 사용하면 편하다는 것을 알게 되어서 사용해봤는데, 뭐 이런 신세계가 다 있나 싶었다.

나는 처음 개발을 배울 때 Oracle을 사용했었다. 그 때 DB를 로컬에서 돌리는 것의 단점은 모두 경험했던 것 같다. 일단 설치도 오래 걸리고, 잘못 설치되면 디버깅을 하는 것보다 지우고 다시 설치하는게 빠르다는 말이 있었어서 DB 설치는 나한테 큰 산 같았다. 설치만 문제일까? 실행할 때면 리소스를 엄청 잡아먹어서 DB를 제대로 종료하지 않으면 컴퓨터 발열이 엄청 심했던 것으로 기억한다. 거기다 당시 내 짧은 지식으로는 DB를 끄고 켜는 것도 쉽지 않았다..

팀플을 진행할 때는 DB버전 문제 때문에 팀원의 로컬에서 프로젝트가 제대로 실행되지 않는 일이 있었는데, 그걸 해결하기 위해서 그 큰 DB를 다시 설치하는걸 보는건 나한텐 공포였다..

요즘엔 MySQL을 사용하고 있어서 그 때보다는 훨씬 덜하지만 그래도 로컬에서 DB를 실행하는 것은 지금까지도 웬만하면 나한텐 피하고 싶은 일이다.

그런데 docker를 사용하니 이 단점이 대부분 해결되었다.. DB 버전을 바꾸는게 nvm으로 node 버전 바꾸는 것만큼 간단했고(거짓말 좀 보탬) 거기다 docker-compose 파일를 공유하면 모든 개발자가 같은 DB 환경을 사용할 수 있었다. 거기다 프로젝트 별로 다른 버전, 다른 DB를 사용하고 있어도 docker로 올렸다 내렸다가 너무 간편했다.

## app도 docker로 띄워보자?

사실 생각해보면 애플리케이션을 도커로 실행하면서 개발하는 것이 일반적일 것 같지는 않다. 보통 라이브러리나 프레임워크에서 핫리로드 기능을 제공하기도 하고, 그게 아니더라도 코드가 변경될 때마다 컨테이너를 재빌드하고 실행하는 것은 로컬에서 개발을 하는 것보다 비효율적일 것 같다. 하지만 여러 컨테이너를 도커 안에서 연결하고 실행하는 실습을 해보고 싶어서 한번 해보기로 했다ㅎㅎ

## app이랑 db를 docker로 한번에 띄워보자

일단 내가 전에 사용했던 docker-compose.yml 파일은 다음과 같다.

```yaml
services:
  db:
    image: mariadb:10
    container_name: auth-db
    restart: always
    environment:
      MARIADB_ROOT_PASSWORD: ${MARIADB_ROOT_PASSWORD} # 루트 계정 비밀번호 설정
      MARIADB_DATABASE: ${DB_NAME} # 자동으로 생성될 데이터베이스 이름
      MARIADB_USER: ${DB_USER} # 추가 사용자 이름
      MARIADB_PASSWORD: ${DB_PASSWORD} # 추가 사용자의 비밀번호
    ports:
      - '${DB_PORT}:3306'
    volumes:
      - mariadb-data:/var/lib/maria # 데이터베이스 데이터가 저장될 위치
    networks:
      - auth-network

volumes:
  mariadb-data:

networks:
  auth-network:
```

- Dockerfile 생성
- .dockerignore로 node_modules 제외
- 컨테이너를 같은 네트워크로 설정
- DB_HOST는 localhost가 아니라 서비스 이름(db)로 설정
