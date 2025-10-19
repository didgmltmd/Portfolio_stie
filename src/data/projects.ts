export type ProjectCategory  = "프로젝트" | "해커톤" | "토이 프로젝트";


export interface Challenge {
  title:string;
  problem:string;
  solution:string;
  relatedBlogId?:string;
}

export interface KeyFeature{
  title:string;
  description?:string;
  relatedBlogId?:string;
}
export interface Project {
  id: string;
  primary: boolean;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category:ProjectCategory;
  retrospective: string;
  demoUrl?: string;
  githubUrl?: string;
  overview: string;
  period: string;
  team: string;
  role: string;
  keyFeatures: KeyFeature[];
  techStack: {
    frontend: string[];
    backend?: string[];
    deployment?: string[];
  };
  kpt: {
    keep: string[];
    problem: string[];
    try: string[];
  };
  challenges: Challenge[] | [];
  outcome: string;
  screenshots:string[];
}

export const projects: Project[] = [
  {
    id: "ScanAndGo",
    primary: false,
    title: "스마트 쇼핑 어플(Scan and Go)",
    description: "React-native와 TypeScript로 구축한 스마트 쇼핑 애플리케이션",
    image: "/assets/cart_project.png",
    tags: ["React-native", "TypeScript", "Tailwind CSS"],
    category: "프로젝트",
    retrospective: "진행중인 프로젝트입니다..!",
    demoUrl: "#",
    githubUrl: "#",
    overview: "사용자가 스마트폰 카메라로 상품을 스캔하고, 앱 내에서 장바구니·결제·게이트 통과까지 처리하는 통합 쇼핑 플랫폼 구축",
    period: "2025.09 - 2026.09 (12개월)",
    team: "프론트엔드 1명, 백엔드 4명",
    role: "프론트엔드 개발 및 PM",
    keyFeatures: [
      {
        title:"바코드 스캔",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"상품 조회",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"장바구니 담기 / 확인",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"예상 금액 설정 / 시각화",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"결제 / 영수증 발행 / 조회",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"게이트 연동",
        description:"#",
        relatedBlogId:"#"
      },
    ],
    techStack: {
      frontend: ["React-native", "TypeScript", "Tailwind CSS"],
      backend: [],
      deployment: [],
    },
    kpt: {
      keep: [
  
      ],
      problem: [

      ],
      try: [

      ],
    },
    challenges: [],
    outcome: "도전중입니다.",
    screenshots:[]
  },
  {
    id: "festival-app",
    primary: true,
    title: "축제주문관리 시스템",
    description: "WebSocket을 활용한 실시간 주문관리 시스템",
    image: "/assets/fetival-project.png",
    tags: ["React", "WebSocket", "Node.js", "MUI"],
    category: "프로젝트",
    retrospective: "실시간 통신의 어려움을 경험했습니다. 축제당일 금액오류,주문누락,주문서추적 등 현장에서 터진 오류에대한 대응이 가장 도전적이었습니다.",
    demoUrl: "https://didgmltmd.github.io/festival_front/",
    githubUrl: "https://github.com/didgmltmd/festival_front",
    overview: "WebSocket을 기반으로 한 실시간 주문관리시스템입니다. 메뉴CRUD, 조리 / 서빙 상태추적, 주문서 확인 등 축제부스를 운영하기위한 기능을 구현했습니다.",
    period: "2025.05.16 - 2025.05.23 (7일)",
    team: "개인 프로젝트",
    role: "풀스택 개발",
    keyFeatures: [
      {
        title:"메뉴 추가/삭제/수정",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"주문서 작성",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"주문내역 확인",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"매출확인",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"조리구역에 실시간 주문 전송",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"서빙완료시 조리구역에 실시간 전송",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"주문시 실시간 술제공 목록 추가",
        description:"#",
        relatedBlogId:"#"
      },
    ],
    techStack: {
      frontend: ["React", "Socket.io-client", "MUI"],
      backend: ["Node.js", "Socket.io"],
      deployment: [],
    },
    kpt: {
      keep: [
        "WebSocket 기반의 실시간 통신 구조 설계 및 성공적인 다중 페이지 동기화 구현",
        "React + Node.js + Socket.IO를 활용한 풀스택 개발 및 실배포 경험",
        "축제 현장에서 직접 운영하며 실사용자 피드백을 받아 UI/UX 개선",
      ],
      problem: [
        "주문 상태 변경 시 모든 클라이언트에 즉시 반영되지 않는 오류 경험 (→ socket.emit vs io.emit 문제)",
        "주문 내역 누락 방지를 위한 에러 처리 및 로깅 시스템 부재",
        "기능이 빠르게 붙은 만큼 코드 구조의 일관성 및 유지보수성 저하",
      ],
      try: [
        "WebSocket 통신 로직을 공통 유틸로 모듈화하여 유지보수성 향상",
        "상태관리 개선 (예: Zustand, Redux) → 각 페이지의 상태 흐름을 통합적으로 관리",
        "주문 기록을 DB에 영속화하여 주문 이력/통계 제공 기능 추가",
      ],
    },
    challenges:[],
    outcome: "3명의 축제도우미 인원 감축 및 카운터와 조리구역간의 협업 능력향상하여 축제부스 운영에 기여하였습니다.",
    screenshots:["/assets/festival/1.png","/assets/festival/2.png","/assets/festival/3.png","/assets/festival/4.png","/assets/festival/5.png","/assets/festival/6.png"]
  },
  {
    id: "portfolio",
    primary: true,
    title: "포트폴리오 사이트",
    description: "나만의 포트폴리오 사이트",
    image: "/assets/portfolio_site.png",
    tags: ["React", "Typescript", "Tailwind CSS"],
    category: "프로젝트",
    retrospective: "아직 완성해나가는중입니다...!(현재 진행도 20%)",
    demoUrl: "#",
    githubUrl: "https://github.com/didgmltmd/Portfolio_stie",
    overview: "더 추가할기능:블로그 보기 기능강화, 프로젝트내용 상세 회고포스트/컨퍼런스참여후기 등 블로그 카테고리화,블로그 글쓰기 기능,백엔드 개발,도메인 구매 후 CI/CD,각 프로젝트별 상세설명 및 기술에대한 회고 자세하고 체계적으로 작성,성능 최적화 및 리펙토링(ui,hook,component분리)",
    period: "2025.10.14 ~ ",
    team: "개인프로젝트",
    role: "풀스택 개발",
    keyFeatures: [
      {
        title:"메인 페이지 (Home / About)",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"프로젝트 카드 리스트",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"프로젝트 필터링 / 및 상세 페이지",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"블로그 / 기록 섹션 (Blog or Note)",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"다크모드 기능(Toggle형태)",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"반응형 디자인",
        description:"#",
        relatedBlogId:"#"
      },
    ],
    techStack: {
      frontend: ["React", "TypeScript", "Tailwind CSS","shadcn/ui","lucide-react","framer-motion"],
      backend: [],
      deployment: [],
    },
    kpt: {
      keep: [
      ],
      problem: [
      ],
      try: [
      ],
    },
    challenges: [],
    outcome: "",
    screenshots:[]
  },
   {
    id: "dashboard",
    primary: false,
    title: "동아리 신청 플랫폼",
    description: "교내 동아리들을 한곳에서 확인/신청할 수 있는 플랫폼",
    image: "/assets/club_porject.png",
    tags: ["React", "Recharts", "Storybook", "Tailwind CSS"],
    category: "프로젝트",
    retrospective: "진행중인 프로젝트입니다..!",
    demoUrl: "#",
    githubUrl: "https://github.com/ClubApplicationPlatform",
    overview: "교내 동아리들을 한곳에서 확인/신청할 수 있는 플랫폼",
    period: "2025.05 - 2025.12 (7개월)",
    team: "프론트엔드 1명, 백엔드 5명",
    role: "프론트엔드 리드 개발자 및 PM",
    keyFeatures: [
    ],
    techStack: {
      frontend: ["React", "TypeScript", "Tailwind CSS"],
      backend: [],
      deployment: [],
    },
    kpt: {
      keep: [
      ],
      problem: [
      ],
      try: [
      ],
    },
    challenges: [],
    outcome: "",
    screenshots:[]
  },
  {
    id: "hackerton_0",
    primary: true,
    title: "안심 귀가길 서비스",
    description: "대전시 CCTV 데이터를 활용한 안전 귀가 경로 안내 서비스",
    image: "/assets/kakaoMap_service.png",
    tags: ["React", "JavaScript", "Node.js", "OpenRouteService", "KakaoMap"],
    category: "해커톤",
    retrospective: "목적지를 입력받을 때 키워드형 검색 기능과 CCTV 기반 안전 경로 계산이 가장 도전적이었습니다. KakaoMap과 OpenRouteService를 함께 사용하는 과정에서 좌표 변환과 CORS 문제를 해결했습니다.",
    demoUrl: "https://hackerton-frontend.github.io/FrontEnd/",
    githubUrl: "https://github.com/orgs/Hackerton-Frontend/repositories",
    overview: "대전광역시 방범용 CCTV 위치 데이터를 활용하여 사용자의 출발지와 목적지 사이 가장 안전한 귀가 경로를 안내하는 웹 서비스입니다. 사용자는 키워드로 목적지를 검색하고, 지도 위에서 CCTV가 많은 경로와 일반 경로를 비교할 수 있습니다.",
    period: "2025.05.09 - 2025.05.10 (1일)",
    team: "프론트엔드 3명, 백엔드 1명",
    role: "풀스택 리드개발자 및 PM",
    keyFeatures: [
      {
        title:"KakaoMap을 통한 실시간 위치 표시 및 경로 시각화",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title: "OpenRouteService API를 이용한 안전 경로 및 일반 경로 탐색",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"대전시 공공데이터 기반 CCTV 위치 시각화",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"목적지 키워드 검색 및 지도 마커 표시 기능",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"프론트-백 간 Axios 통신을 통한 경로 요청 및 결과 표시",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"사용자 UI/UX 최적화를 위한 반응형 인터페이스 구현",
        description:"#",
        relatedBlogId:"#"
      },

    ],
    techStack: {
      frontend: ["React", "JavaScript", "styled-components", "KakaoMap API"],
      backend: ["Node.js", "Express", "OpenRouteService API"],
      deployment: ["Render", "GitHub Pages"]
    },
    kpt: {
      keep: [
        "CCTV 데이터를 활용한 안전 귀가 경로 탐색 로직 설계",
        "OpenRouteService와 KakaoMap API의 성공적인 통합",
        "팀 내 역할 분담 및 깃허브 협업 체계 확립"
      ],
      problem: [
        "지도 API 간 좌표계 차이로 인한 경로 불일치 문제 발생",
        "OpenRouteService 요청 시 CORS 및 인증키 관련 에러 처리 필요",
        "안전 경로 탐색 시 성능 최적화 부족으로 일부 구간 로딩 지연"
      ],
      try: [
        "좌표계 변환 로직을 별도 유틸 함수로 모듈화하여 재사용성 강화",
        "백엔드 Proxy 서버를 통한 API 요청 안정화",
        "CCTV 밀집도 가중치를 반영한 안전도 점수 계산 기능 추가 계획"
      ]
    },
    challenges: [],
    outcome: "실제 대전시 CCTV 데이터를 활용해 안전 귀가 경로를 시각화하고, 사용자에게 두 가지 경로(일반/안전)를 비교 제공하는 기능을 완성했습니다. 팀 협업을 통해 데이터 처리 및 지도 시각화 능력을 크게 향상시켰습니다.",
    screenshots:["/assets/hackerton_1/1.png","/assets/hackerton_1/2.png","/assets/hackerton_1/3.png","/assets/hackerton_1/4.png","/assets/hackerton_1/5.png"]
  },
  {
    id: "care_in_my_hand",
    primary: true,
    title: "내 손안의 요양사",
    description: "AI를 활용한 노인 음성 진료보조 및 병원 연동 서비스",
    image: "/assets/hackerton_1.png",
    tags: ["React", "JavaScript", "styled-componets", "node.js"],
    category: "해커톤",
    retrospective: "AI, 음성인식, OCR, 지도검색 등 여러 기능을 하나의 서비스로 통합하는 과정이 가장 도전적이었습니다.",
    demoUrl: "https://aihackerton.github.io/Ai_HackerTonFrontEnd/",
    githubUrl: "https://github.com/AiHackerTon/Ai_HackerTonFrontEnd",
    overview: "노인들이 증상을 음성으로 말하면 AI가 이를 분석해 응급 여부를 판단하고, 병원을 추천·안내하는 스마트 요양 보조 서비스입니다. 음성(STT), 시각(OCR), 언어(NLP), 음성출력(TTS)을 결합하여 의료 접근성을 높이는 것을 목표로 했습니다.",
    period: "2025.09.27 - 2025.09.28",
    team: "프론트엔드 1명, 백엔드 2명, 의료데이터 담당 2명",
    role: "프론트엔드 리드 및 백엔드 연동 개발",
    keyFeatures: [
      {
        title:"음성 입력(STT)으로 증상 인식 및 텍스트 변환",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"OpenAI API를 통한 증상 분석 및 응급/비응급 분류",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"비응급 시 진료과 추천 및 근처 병원 검색 기능 (KakaoMap 연동)",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"Google Vision OCR을 이용한 처방전 문자 인식",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"TTS(Text-to-Speech)를 통한 음성 안내",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"Flask 백엔드와 Axios 통신으로 AI 분석 결과 연동",
        description:"#",
        relatedBlogId:"#"
      },
    ],
    techStack: {
      frontend: ["React", "JavaScript", "Axios","styled-components","ORS(OpenRouterService)"],
      backend: ["Flask", "Python", "Google Vision API", "OpenAI API"],
      deployment: ["Render"]
    },
    kpt: {
      keep: [
        "STT, OCR, AI 분류, TTS 등 다양한 기능을 하나의 서비스로 안정적으로 통합",
        "Flask 백엔드와 React Native 간 비동기 통신 구조 설계",
        "Google Vision과 OpenAI API의 복합 호출 로직 구현 성공"
      ],
      problem: [
        "Flask에서 OpenAI API 응답 지연으로 인한 프론트엔드 대기 시간 문제",
        "모바일 기기별 마이크 접근 권한 처리 및 음성 인식 품질 편차",
        "처방전 이미지 품질에 따른 OCR 인식률 저하"
      ],
      try: [
        "비동기 큐(AsyncIO) 도입으로 백엔드 API 응답 속도 개선",
        "전처리 필터를 적용해 OCR 인식률 향상",
        "AI 응답을 캐싱하여 반복 요청 최소화 및 UX 향상"
      ]
    },
    challenges: [],
    outcome: "노인 사용자 중심의 직관적 UI/UX와 음성 중심 인터페이스를 구현하여, 의료 접근성이 낮은 고령층도 스스로 증상을 파악하고 병원을 예약할 수 있는 프로토타입을 완성했습니다.",
    screenshots:["/assets/hackerton_2/1.png","/assets/hackerton_2/2.png","/assets/hackerton_2/3.png"]
  },

 {
    id: "maple_project",
    primary: false,
    title: "Maple Ranking & Spec-Up Tracker",
    description: "넥슨 Open API 기반 메이플스토리 캐릭터 랭킹·스펙업 추적 웹",
    image: "/assets/maple_project.png",
    tags: ["React", "JavaScript", "Axios", "localStorage"],
    category: "토이 프로젝트",
    retrospective: "API 호출을 최소화하기 위해 ocid/장비 정보를 localStorage에 캐시하고, 페이지 전환 시에도 재호출 없이 계산 결과만 렌더링하도록 흐름을 재설계한 점이 가장 도전적이었습니다.",
    demoUrl: "https://didgmltmd.github.io/Maple_Project/",
    githubUrl: "https://github.com/didgmltmd/Maple_Project",
    overview: "여러 캐릭터의 장비·스탯을 수집하여 환산 전투력과 랭킹을 계산하고, 장비 업그레이드(스타포스/잠재옵션) 변화를 감지해 스펙업 로그를 제공하는 웹 애플리케이션입니다.",
    period: "2025.06.09 - 2025.06.22(13일)",
    team: "개인 프로젝트",
    role: "프론트엔드 개발",
    keyFeatures: [
      {
        title:"닉네임 → ocid 1회 조회 후 localStorage에 캐시",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"캐릭터 장비/스탯 수집 및 환산 전투력 계산",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"이전 장비와 비교해 스타포스/잠재옵션 상승 감지(스펙업 로그)",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"최대 6명 캐릭터 동시 비교 및 랭킹 산출",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"메인 페이지에서 데이터 선조회 → 상세 페이지 무(無) API 렌더링",
        description:"#",
        relatedBlogId:"#"
      },
      {
        title:"정렬/필터(직업, 전투력, 최근 갱신) 및 반응형 UI",
        description:"#",
        relatedBlogId:"#"
      },
    ],
    techStack: {
      frontend: ["React", "JavaScript", "Axios", "styled-components", "localStorage"],
      backend: [],
      deployment: ["Render"]
    },
    kpt: {
      keep: [
        "API 응답 캐싱 전략으로 호출 수·지연 최소화",
        "계산 로직(환산 전투력/랭킹)과 UI를 분리한 모듈화",
        "페이지 간 상태 흐름 일원화(메인 선조회 → 상세 표시 전용)"
      ],
      problem: [
        "Nexon Open API 레이트리밋과 일부 캐릭터 데이터 누락 케이스 대응 미흡",
        "스펙업 비교 로직의 예외 케이스(잠재 등급 표기 불일치) 처리 부족",
        "테스트 커버리지 및 타입 안정성 부족으로 리팩토링 부담"
      ],
      try: [
        "요청 배칭/지수 백오프 및 백그라운드 리프레시 도입",
        "TypeScript 전환과 계산 유닛테스트 추가",
        "스펙업 로그를 시계열 그래프로 시각화 및 내보내기(CSV) 지원"
      ]
    },
    challenges: [],
    outcome: "최대 6개 캐릭터의 전투력을 즉시 비교·랭킹화하고, 장비 변화에 따른 스펙업 내역을 명확히 기록·표시하여 성장 추적 효율을 크게 향상했습니다.",
    screenshots:["/assets/maple_project.png","/assets/maple/1.png"]
  },

  {
    id: "toy_1",
    primary: false,
    title: "스마트 카트 어플",
    description: "RFID 인식 기반 실시간 장바구니 동기화 시스템",
    image: "/assets/smartcart_app.png",
    tags: ["React-native", "TypeScript", "socket.io", "node.js"],
    category: "토이 프로젝트",
    retrospective: "아두이노의 Wifi모듈을 사용하여 서버와 socket연결 하는것이 가장 도전적이었습니다.",
    demoUrl: "#",
    githubUrl: "https://github.com/didgmltmd/Arduino_App",
    overview: "Arduino를 통해 RFID 태그로 상품을 인식하고, Wi-Fi를 통해 서버에 UID를 전송한 뒤, React Native 앱에서 실시간으로 장바구니에 상품 정보를 표시하는 구조를 구현했습니다.",
    period: "2025.05.13 - 2025.05.30 (17일)",
    team: "프론트엔드 1명, 백엔드 1명, 아두이노 3명",
    role: "프론트엔드,백엔드 리드 개발자",
    keyFeatures: [
    ],
    techStack: {
      frontend: ["React-native", "TypeScript"],
      backend: ["node.js","socket.io"],
      deployment: [],
    },
    kpt: {
      keep: [
        "RFID 태그 인식 → Wi-Fi → 서버 전송 → 앱 실시간 반영 흐름을 처음부터 끝까지 성공적으로 구성",
        "Socket.IO를 통한 실시간 통신 기능을 안정적으로 동작하게 구성",
        "React Native 앱에서의 실시간 상태 관리 및 렌더링 처리 경험 축적"
      ],
      problem: [
        "UID → 상품 정보 매핑이 하드코딩 형태로 되어 있어 확장성 부족",
        "실제 사용자 테스트 미비 → 사용자의 직관적인 UX 반응 확인 부족",
        "에러 처리와 예외 상황 대응 부족 (예: 서버 연결 오류, 네트워크 불안정 시 앱 동작 미정의)"
      ],
      try: [
        "UID-상품 매핑을 DB + REST API 기반으로 전환해 관리 효율성 향상",
        "React Native 앱 구조 리팩토링: 상태 관리 라이브러리(Zustand, Redux 등) 활용",
      ],
    },
    challenges: [],
    outcome: "",
    screenshots:[]
  },
];
