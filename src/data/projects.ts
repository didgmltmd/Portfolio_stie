export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  retrospective: string;
  demoUrl?: string;
  githubUrl?: string;
  overview: string;
  period: string;
  team: string;
  role: string;
  keyFeatures: string[];
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
  challenges: string;
  outcome: string;
}

export const projects: Project[] = [
  {
    id: "ecommerce",
    title: "스마트 쇼핑 어플(Scan and Go)",
    description: "React-native와 TypeScript로 구축한 스마트 쇼핑 애플리케이션",
    image: "../../public/assets/cart_project.png",
    tags: ["React-native", "TypeScript", "Tailwind CSS"],
    retrospective: "진행중인 프로젝트입니다..!",
    demoUrl: "#",
    githubUrl: "#",
    overview: "사용자가 스마트폰 카메라로 상품을 스캔하고, 앱 내에서 장바구니·결제·게이트 통과까지 처리하는 통합 쇼핑 플랫폼 구축",
    period: "2025.09 - 2026.09 (12개월)",
    team: "프론트엔드 1명, 백엔드 4명",
    role: "프론트엔드 개발 및 PM",
    keyFeatures: [
      "바코드 스캔",
      "상품 조회",
      "장바구니 담기 / 확인",
      "예상 금액 설정 / 시각화",
      "결제 / 영수증 발행 / 조회",
      "게이트 연동"
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
    challenges: "도전중입니다.",
    outcome: "도전중입니다.",
  },
  {
    id: "festival-app",
    title: "축제주문관리 시스템",
    description: "WebSocket을 활용한 실시간 주문관리 시스템",
    image: "../../public/assets/fetival-project.png",
    tags: ["React", "WebSocket", "Node.js", "MUI"],
    retrospective: "실시간 통신의 어려움을 경험했습니다. 축제당일 금액오류,주문누락,주문서추적 등 현장에서 터진 오류에대한 대응이 가장 도전적이었습니다.",
    demoUrl: "#",
    githubUrl: "https://github.com/didgmltmd/festival_front",
    overview: "WebSocket을 기반으로 한 실시간 주문관리시스템입니다. 메뉴CRUD, 조리 / 서빙 상태추적, 주문서 확인 등 축제부스를 운영하기위한 기능을 구현했습니다.",
    period: "2025.05.16 - 2025.05.23 (7일)",
    team: "개인 프로젝트",
    role: "풀스택 개발",
    keyFeatures: [
      "메뉴 추가/삭제/수정",
      "주문서 작성",
      "주문내역 확인",
      "매출확인",
      "조리구역에 실시간 주문 전송",
      "서빙완료시 조리구역에 실시간 전송",
      "주문시 실시간 술제공 목록 추가"
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
    challenges: "socket 통신이 일부 클라이언트한테만 전송되는 문제가 있었습니다. socket.io 와 io.emit의 차이점에대해 공부한후 브로드캐스트 개념을 활용해 해결하였습니다.",
    outcome: "3명의 축제도우미 인원 감축 및 카운터와 조리구역간의 협업 능력향상하여 축제부스 운영에 기여하였습니다.",
  },
  {
    id: "dashboard",
    title: "포트폴리오 사이트",
    description: "나만의 포트폴리오 사이트",
    image: "../../public/assets/portfolio_site.png",
    tags: ["React", "Typescript", "Tailwind CSS"],
    retrospective: "아직 프로토타입으로 20%정도 완성한거같습니다.",
    demoUrl: "#",
    githubUrl: "https://github.com/didgmltmd/Portfolio_stie",
    overview: "더 추가할기능: 프로젝트 전체보기Page(ToyProject,해커톤프로젝트 추가), 블로그 보기 기능강화, 프로젝트내용 상세 회고포스트/컨퍼런스참여후기 등 블로그 카테고리화,블로그 글쓰기 기능,백엔드 개발,도메인 구매 후 CI/CD,각 프로젝트별 상세설명 및 기술에대한 회고 자세하고 체계적으로 작성,성능 최적화 및 리펙토링(ui,hook,component분리)",
    period: "2025.10.14 ~ ",
    team: "개인프로젝트",
    role: "풀스택 개발",
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
    challenges: "",
    outcome: "",
  },
   {
    id: "dashboard",
    title: "동아리 신청 플랫폼",
    description: "교내 동아리들을 한곳에서 확인/신청할 수 있는 플랫폼",
    image: "../../public/assets/club_porject.png",
    tags: ["React", "Recharts", "Storybook", "Tailwind CSS"],
    retrospective: "진행중인 프로젝트",
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
    challenges: "",
    outcome: "",
  },
];
