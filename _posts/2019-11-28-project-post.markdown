---
layout: post
title:  "Spring boot Project "
description: springboot JPA QueryDSL ORM.
date:   2019-11-28 00:00:00 00000
categories: springboot JPA QueryDSL ORM
---
![Springboot](https://www.zekelabs.com/static/media/photos/2019/07/11/Springboot-training-in-gurgaon.jpg)
- 올 하반기에 시작한 프로젝트 목표는 3가지가 있었는데<br>
1. Spring-boot + Thymeleaf의 적용
2. Spring Data JPA ORM 적용
3. Spring Security를 활용한 로그인 적용
3. RESTAPI 적용
4. Git 서버 구축 및 사용
+@로 데이터 시각화를 위한 차트기능 강화와 데이터 조회기능 강화를 위한 Grid 또는 테이블 컴포넌트 적용이었다.<br>
<br>


Legacy System의 분석은 완료되었고, 설계와 사용 기술에 대한 선택은 <br>
내가 경험하고 싶은, 해보고 싶은 기술 위주로 선택했다<br>
물론 가장 많이 사용되고, 당연히 해야하는 주류인 것들을 선택하고자 노력했다.<br>
<br>
전에 했던 Spring MVC + Mybtis + SpringSecurity보다 확실히 초기 설정은 쉬웠다.<br>
IDE도 [IntellJ](https://www.jetbrains.com/idea/)로 변경하면서 개발이 한결 편해졌다.<br>
<br>
- 프로젝트 제약사항<br>
1. Legacy System의 DB구조 변경 불가 및 신규 생성불가<br>
   DB내 비즈니스로직 분리 불가(ERP연계 부분)<br>
   설계의 변경없이 JPA를 사용하다보니 개선의 폭이 매우 제한적이었다.

<br>
기존 JDBC방식과 Mybatis방식에서 불가능한 TypeSafe한 쿼리의 작성이 가능해졌지만
Oracle에서만 제공하는 기능을 사용한 쿼리들, 복잡한 쿼리의 구현을 위해서 QueryDSL에서 <br>
지원하는 거의 모든 기능을 사용해야 할 정도로 사용하다보니 JPA의 장점인 DB종속성으로 부터의 자유가<br>
저 멀리 사라져 버렸다...
<br>
초반에 너무너무 힘들었지만<br>
순조롭게 진행중이라 다행이다.<br>

이 프로젝트의 경험과 힘들었던 내용에 대해서 틈틈히 포스팅해봐야겠다.<br>

