---
title: "[project]관리자화면HTML+간단한 CSS"
excerpt: ""
category:
  - html
tags: [html, project]
---

### 관리자 화면 HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style type="text/css">
      #container {
        width: 80vw;
        border: 1px solid;
        position: absolute;
      }
      #page_title {
        font-size: x-large;
      }
      table {
        clear: both;
        margin: 0 auto;
        border-collapse: collapse;
      }
      tr,
      td,
      th {
        border-collapse: collapse;
        border: 1px solid;
      }
      th {
        background-color: bisque;
      }
      #search > div {
        float: left;
        text-align: center;
      }
      #search {
        left: 50%;

        /* 디자인 적용되면 꼬일듯 */
        width: 330px;
        margin-left: -165px;
        /*  */

        position: relative;
        text-align: center;
      }
      #result_paging {
        text-align: center;
      }
      #result {
        height: 400px;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <div id="page_title">주문관리</div>

      <div id="search">
        <div id="search_item">
          <select>
            <option>주문번호</option>
            <option>주문id</option>
            <option>메뉴</option>
          </select>
        </div>
        <div id="search_input"><input type="text" /></div>
        <div id="search_btn"><input type="button" value="검색" /></div>
      </div>

      <div id="result">
        <table id="order_tab">
          <tr>
            <th style="width: 60px;">주문번호</th>
            <th style="width: 60px;">주문id</th>
            <th style="width: 60px;">메뉴</th>
            <th style="width: 60px;">가격</th>
            <th style="width: 60px;">배달현황</th>
            <th style="width: 60px;">주문일자</th>
          </tr>
          <tr>
            <td>0000001</td>
            <td>test1</td>
            <td>어쩌고 피자 외 3</td>
            <td>43,000</td>
            <td>배달완료</td>
            <td>2020/08/01 13:23</td>
          </tr>
        </table>
      </div>
      <div id="result_paging">
        <a href=""><img src="" title="이전페이지" /></a>
        <a href=""><img src="" title="1" /></a>
        <a href=""><img src="" title="2" /></a>
        <a href=""><img src="" title="3" /></a>
        <a href=""><img src="" title="4" /></a>
        <a href=""><img src="" title="다음페이지" /></a>
      </div>
    </div>
  </body>
</html>
```
