# SneakerTech

#### Sneaker-Tech 시연.mp4 동영상 파일을 통해 웹 페이지의 기능을 알 수 있습니다.

### 1. SneakerTech 프로젝트
> 스니커즈 릴리즈 정보, 중고시세 비교 웹사이트 제작

### 2. 개요
1) 사용언어 : HTML, CSS(Bootstrap), JS(JQuery, Node.js, Express), MySQL
2) 폴더 구조

    2-1) spyder : 웹 페이지 텍스트, 이미지 크롤링
    
    2-2) db_structure : MySQL 데이터 베이스 구조 및 임의 데이터
    
    2-3) lib : 동적 웹페이지 생성을 위한 HTML 코드
    
    2-4) public : 클라이언트 웹 페이지 코드
    
    2-5) routes : 시맨틱 URL 라우트
    
3) 제작 화면
<div>
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/87252354-438e3180-c4ad-11ea-817f-6ccfeb30f729.PNG">
  &nbsp;&nbsp;&nbsp;
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/87252356-44bf5e80-c4ad-11ea-980d-7c2b67a7efdd.PNG">
</div>

> 왼쪽부터 메인 페이지, Release 페이지

<div>
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/87252357-4557f500-c4ad-11ea-8679-25d418f302ea.PNG">
  &nbsp;&nbsp;&nbsp;
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/87252358-4557f500-c4ad-11ea-90bb-ae4cafeac850.PNG">
</div>

> 왼쪽부터 Draw 페이지, Stock 페이지

<div>
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/87252359-45f08b80-c4ad-11ea-9a67-462a96113fc1.PNG">
  &nbsp;&nbsp;&nbsp;
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/87252360-45f08b80-c4ad-11ea-832b-3dc864596f02.PNG">
</div>

> 왼쪽부터 Sites 페이지, Stock Chart 페이지


### 3. 사용법
> 실행 : 로컬에 저장 -> db_structure를 통해 MySQL 데이터 베이스 작성 -> spyder의 .py 파일 실행을 통해 웹 페이지 크롤링 -> package.json 에 기재된 모듈 설치 npm install -> localhost:3000으로 실행

> 환경 : 구글 크롬, (모바일 : 개발자 도구의 Toggle device toolbar)

### 4. 기능
1) Chart.js를 통한 차트 생성
2) 스니커 릴리즈 웹 페이지 링크 (Draw와 Stock은 X)
3) 반응형 카드 및 메뉴
