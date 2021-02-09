---
title: "[DB]MySQL CRUD 문법"
excerpt: ""
category:
  - DB
tags: [DB, MySQL]
---


참고: 생활코딩 MySQL 강의

### CREATE TABLE

```jsx
CREATE TABLE topic(
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NULL,
    created DATETIME NOT NULL,
    author VARCHAR NULL,
	profile VARCHAR(100) NULL,
    PRIMARY KEY(id));
```

- 테이블 생성
- id는 자동으로 증가하며, 중복을 허용하지 않는 Primary key로 설정하였다.

## CREATE

```powershell
INSERT INTO topic(title, description, created, author, profile) VALUES('Oracle', 'Oracle is...', NOW(), 'a', 'engineer');
```

- 데이터 생성
- 자동으로 증가하는 id는 insert시에 따로 넣어주지 않아도 된다.

## READ

```powershell
SELECT * FROM topic;
SELECT id, title, created FROM topic;
SELECT id as '아이디', title as '제목', created as '작성일' FROM topic;
SELECT id, title FROM topic WHERE author = 'a' ORDER BY id desc;
```

- 데이터 조회
- `as`를 사용하면 조회되는 컬럼의 이름을 테이블에 설정된 이름과 다른 이름으로 보여줄 수 있다.
- `where`를 사용하면 원하는 데이터만 걸러서 볼 수 있고, `order by`를 사용하면 뒤에 작성한 컬럼을 기준으로 정렬하여 조회된다. 기본값은 오름차순이고 내림차순으로 보고싶다면 컬럼 뒤에 `desc`을 붙여주면 된다.

## UPDATE

```powershell
UPDATE topic SET title='Oracle' WHERE id=2;
```

## DELETE

```powershell
DELETE FROM topic WHERE id = 5;
```

- update, delete는 where을 사용하지 않으면 모든 데이터를 바꿔버리거나 모든 데이터를 지워버릴 수 있으므로 조심해서 사용해야한다.