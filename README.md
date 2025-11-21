# 🌌 개인 포트폴리오 사이드

> 프론트엔드 개발자로서 도전하며 성장 기록을 남기는 개인 포트폴리오 사이트입니다.  
> 프로젝트, 활동, 기술 스택, 블로그에대한 정보를 한 번에 확인할 수 있도록 구성했습니다.

---

## 🔗 배포 주소

>  **Demo**: https://portfolio-stie.onrender.com/

---

## ✨ 주요 기능 (Features)

- **프로필 소개**
  - 간단한 프로필 정보를 제공합니다.
- **프로젝트 소개**
  - 프로젝트 | 해커톤 | 토이 프로젝트로 분류하여 진행했던 프로젝트 정보를 제공합니다.
  - 사용해본 기술 스택을 태그화 하여 필터링 기능을 제공합니다.
  - 각 프로젝트에대해 배포되어있는 데모 URL을 제공합니다. ( RN 프로젝트 제외 )
- **블로그 소개**
  - 공부 | 프로젝트 | 알고리즘 | 대외활동 으로 분류하여 작성된 포스트 정보를 제공합니다.
  - 샌드박스 기능을 제공하여 작성된 코드를 즉시 실행해보고 체험해볼 수 있습니다.
- **다크/라이트 모드** 
  - 토글로 테마 전환 가능합니다.

---
> 현재 포트폴리오 사이트는 처음부터 갈아엎을예정으로 개발이 잠시 중단되었습니다.
---

## 🧱 기술 스택 (Tech Stack)

- **Front-end**
  - React + TypeScript
  - Vite
  - Tailwind CSS 
- **품질 & 개발 환경**
  - ESLint
  - npm


---

## 화면 구성 (UI Screens)

### 메인 페이지
<p align="center">
  <img src="./images/MainPage.png" width="500" alt="메인 페이지" />
  <img src="./images/MainPage_2.png" width="500" alt="메인 페이지" />
</p>

> **기능 요약**  
> - SideBar를 통해 간단한 프로필과 수상경력, 연락처 정보를 제공합니다.
> - Pinned 된 프로젝트에대한 정보를 제공합니다.
> - Pinned 된 블로그 포스트에대한 정보를 제공합니다.

---

### 메인 페이지 ( Mobile )
<p align="center">
  <img src="./images/MainPage_mobile_1.png" width="350" alt="메인 페이지_모바일" />
  <img src="./images/MainPage_mobile_2.png" width="350" alt="메인 페이지_모바일" />
</p>

> **기능 요약**  
> - Sidebar를 좌측 상단 햄버거 시트를 통해 조회할 수 있습니다.
> - 우측 상단 토글버튼을 통해 다크모드를 사용할 수 있습니다.

---

### 프로젝트 목록 페이지
<p align="center">
  <img src="./images/ProjectListPage_1.png" width="500" alt="프로젝트_목록" />
  <img src="./images/ProjectListPage_2.png" width="500" alt="프로젝트_목록" />
</p>

> **기능 요약**  
> - 전체 | 프로젝트 | 해커톤 | 토이 프로젝트 로 분류하여 프로젝트 정보를 제공합니다.
> - 기술 태그를 분류하여 필터링 기능을 제공합니다.
> - 프로젝트 카드의 데모, 코드 버튼을 통해 배포주소, 깃헙 레포를 구경할 수 있습니다.

---

### 프로젝트 목록 페이지 ( Mobile )
<p align="center">
  <img src="./images/ProjectListPage_mobile_1.png" width="250" alt="프로젝트_목록_모바일" />
  <img src="./images/ProjectListPage_moblie_2.png" width="250" alt="프로젝트_목록_모바일" />
</p>

> **기능 요약**  
> - 카테고리,기술태그 필터링 기능을 좌측 상단 햄버거시트로서 구현했습니다.
> - 우측 상단 토글버튼을 통해 다크모드기능을 사용할 수 있습니다.

---

### 프로젝트 상세 페이지 
<p align="center">
  <img src="./images/ProjectDetailPage_1.png" width="700" alt="프로젝트_상세" />
</p>

> **기능 요약**  
> - 데모 URL, 깃헙 주소, 프로젝트 진행 기간, 팀 구성, 나의 역할 에대한 정보를 제공합니다.
> - 프로젝트에대한 간단한 설명을 제공합니다.

<p align="center">
  <img src="./images/ProjectDetailPage_2.png" width="700" alt="프로젝트_상세" />
</p>

> **기능 요약**  
> - 프로젝트 구성 화면을 swipe 통해 구경할 수 있습니다.
> - 프로젝트를 주요 기능별로 나누어 프로젝트 개요를 파악할 수 있습니다.
> - 주요 기능에대해 어떻게 구현되었는지 우측 "관련 글"을 통해 이에대해 자세하게 작성된 블로그로 연결했습니다.

<p align="center">
  <img src="./images/ProjecDetailPage_3.png" width="700" alt="프로젝트_상세" />
</p>

> **기능 요약**  
> - 프로젝트 구현을 위한 핵심기술들을 태그로 분류하여 정보를 제공합니다.

<p align="center">
  <img src="./images/ProjecDetailPage_4.png" width="700" alt="프로젝트_상세" />
</p>

> **기능 요약**  
> - 해당 프로젝트를 진행하며 겪었던 어려움들에대해 기술하고 이에대한 해결방안을 짧게 작성했습니다.
> - 우측 "자세히 보기"를 통해 해결방안에대해 자세하게 작성된 블로그글을 연결했습니다.

<p align="center">
  <img src="./images/ProjectDetailPage_5.png" width="700" alt="프로젝트_상세" />
</p>

> **기능 요약**  
> - 해당 프로젝트에대한 KPT 회고정보를 제공합니다.

---

### 블로그 목록 페이지
<p align="center">
  <img src="./images/BlogListPage_1.png" width="500" alt="블로그_목록" />
  <img src="./images/BlogListPage_2.png" width="500" alt="블로그_목록" />
</p>

> **기능 요약**  
> - 전체 | 공부 | 프로젝트 | 알고리즘 | 대외활동으로 분류하여 작성된 포스트정보를 제공합니다.
> - 기술 태그로 필터링 기능을 제공하여 해당 기술을 가지고 작성한 포스터 정보를 볼 수 있습니다.

---

### 블로그 목록 페이지 ( Mobile )
<p align="center">
  <img src="./images/BlogListPage_mobile_1.png" width="350" alt="블로그_목록_모바일" />
  <img src="./images/BlogListPage_mobile_2.png" width="370" alt="블로그_목록_모바일" />
</p>

> **기능 요약**
> - 카테고리, 필터링 기능을 좌측 상단 햄버거 시트로서 구현했습니다.
> - 우측 상단 토글버튼을 통해 다크모드를 사용할 수 있습니다.

---






