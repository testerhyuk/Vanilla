# Vanilla 쇼핑몰

---

<img src="https://github.com/testerhyuk/notes/blob/main/vanilla.png?raw=true" title="" alt="logo.PNG" data-align="center">

---

#### - 기술스택

<div align=left>
  <table>
    <tr>
        <td>Back-end</td>
        <td>
          <img src="https://img.shields.io/badge/Java-1.8.0-007396?style=flat&logo=Java&logoColor=white"/>
          <img src="https://img.shields.io/badge/Spring Boot-2.7.0-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white"/>
          <img src="https://img.shields.io/badge/Spring Security-5.6.6-6DB33F?style=flat-square&logo=Spring Security&logoColor=white"/>
          <br>
          <img src="https://img.shields.io/badge/MySQL-8.0.29-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
          <img src="https://img.shields.io/badge/JPA Hibernate-5.6.3.Final-59666C?style=flat-square&logo=Hibernate&logoColor=white"/>
          <br>
          <img src="https://img.shields.io/badge/Gradle-7.4.1-02303A?style=flat-square&logo=Gradle&logoColor=white"/>
          <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON Web Tokens&logoColor=white"/>
        </td>
    </tr>
    <tr> 
      <td><b>Front-end</td>
      <td>
      <img src="https://img.shields.io/badge/Node.js-000000?style=flat-square&logo=Node.js&logoColor=white"/>
      <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=React&logoColor=white"/>
      <img src="https://img.shields.io/badge/React Router-6.3.0-CA4245?style=flat-square&logo=React Router&logoColor=white"/>
      <img src="https://img.shields.io/badge/Redux Toolkit-1.8.3-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
      <img src="https://img.shields.io/badge/NPM-8.11.0-CB3837?style=flat-square&logo=NPM&logoColor=white"/>
      <br>
      </td>
    <tr>
    </table>  
  </div>

## 🔎 기술 소개

#### 메인페이지

<img src="https://github.com/testerhyuk/notes/blob/main/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80.PNG?raw=true" height:>

#### 회원가입 & 로그인

<img src="https://github.com/testerhyuk/notes/blob/main/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.gif?raw=true">
<img src="https://github.com/testerhyuk/notes/blob/main/%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif?raw=true">

> 사용자는 유효성 검증을 통해 회원가입 진행
> 회원 가입 시 이메일 인증 후 가입 가능
> 비밀번호 입력시 영문+숫자+특수문자 8자리 이상 기입해야 가입 가능
> DaumPost를 통해 주소를 찾고 기입 가능
> 로그인 시 자동 로그인 체크박스를 통해 자동 로그인 가능

#### 회원탈퇴

<img src="https://github.com/testerhyuk/notes/blob/main/%ED%9A%8C%EC%9B%90%ED%83%88%ED%87%B4.gif?raw=true">

#### 마이페이지 & 회원정보 수정

<img src="https://github.com/testerhyuk/notes/blob/main/%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8%EB%B3%80%EA%B2%BD.gif?raw=true">
<img src="https://github.com/testerhyuk/notes/blob/main/%EC%A3%BC%EC%86%8C%EB%B3%80%EA%B2%BD.gif?raw=true">

> 기존 비밀번호를 통해 해당 사용자 검증 후 새 비밀번호로 변경 가능
> DaumPost를 통해 주소를 찾고 주소 변경 가능

#### 검색

<img src="https://github.com/testerhyuk/notes/blob/main/%EA%B2%80%EC%83%89.gif?raw=true">

> 상품의 이름을 기준으로 검색 가능

#### 카테고리 조회

<img src="https://github.com/testerhyuk/notes/blob/main/%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%EC%A1%B0%ED%9A%8C.gif?raw=true">

> 남성별, 여성별 의류별(청바지, 티쳐스 등) 조회 가능

#### 장바구니

<img src="">

> 원하는 수량만큼 상품 담기 가능
> 장바구니 페이지에서 수량 조절 및 삭제 가능
> redux-persist를 이용해 브라우저를 닫고 다시 켜도 데이터 유지

#### 찜하기

<img src="https://github.com/testerhyuk/notes/blob/main/%EC%B0%9C%ED%95%98%EA%B8%B0.gif?raw=true">

#### 최근 본 기능

<img src="">

> 최근 본 상품을 모달 형식으로 제공
> 최근 본 상품 모달에서 바로 상품 상세페이지 접근 

#### 구현중
> 결제 및 결제 
> 찜목록
> 리뷰
> 아이디 & 비밀번호 
