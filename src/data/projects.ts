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
    title: "E-Commerce 플랫폼",
    description: "React와 TypeScript로 구축한 현대적인 이커머스 웹 애플리케이션",
    image: "https://images.unsplash.com/photo-1558181445-eca4774b2a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYwMzc4MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "TypeScript", "Tailwind CSS", "Redux"],
    retrospective: "상태 관리의 복잡성을 경험하며 Redux Toolkit의 효율성을 배웠습니다.",
    demoUrl: "#",
    githubUrl: "#",
    overview: "현대적인 UI/UX를 갖춘 풀스택 이커머스 플랫폼입니다. 사용자 친화적인 상품 검색, 장바구니, 결제 시스템을 구현했으며, 관리자 대시보드를 통해 상품과 주문을 관리할 수 있습니다.",
    period: "2024.01 - 2024.04 (4개월)",
    team: "프론트엔드 2명, 백엔드 2명",
    role: "프론트엔드 개발 (UI/UX 구현, 상태 관리)",
    keyFeatures: [
      "실시간 재고 확인 및 상품 검색 기능",
      "장바구니 및 위시리스트 관리",
      "토스페이먼츠 연동 결제 시스템",
      "주문 내역 조회 및 배송 추적",
      "관리자 대시보드 (상품/주문 관리)",
    ],
    techStack: {
      frontend: ["React 18", "TypeScript", "Redux Toolkit", "Tailwind CSS", "React Query"],
      backend: ["Node.js", "Express", "PostgreSQL"],
      deployment: ["Vercel", "AWS S3"],
    },
    kpt: {
      keep: [
        "Redux Toolkit을 활용한 체계적인 전역 상태 관리",
        "React Query를 통한 서버 상태와 캐싱 최적화",
        "컴포넌트 재사용성을 고려한 설계",
        "TypeScript로 타입 안정성 확보",
      ],
      problem: [
        "초기 상태 관리 설계의 복잡성으로 리팩토링에 시간 소요",
        "장바구니 동시성 이슈 처리 미흡",
        "이미지 최적화 부족으로 초기 로딩 속도 저하",
        "테스트 코드 작성 미흡",
      ],
      try: [
        "Zustand 같은 경량 상태 관리 라이브러리 검토",
        "낙관적 업데이트(Optimistic Update) 패턴 적용",
        "이미지 CDN 도입 및 WebP 포맷 사용",
        "테스트 주도 개발(TDD) 방식 도입",
      ],
    },
    challenges: "장바구니 기능 구현 시 여러 사용자가 동시에 같은 상품을 담을 때 재고 관리가 어려웠습니다. 이를 해결하기 위해 낙관적 UI 업데이트와 서버 사이드 검증을 조합하여 사용자 경험을 해치지 않으면서도 데이터 정합성을 유지할 수 있었습니다.",
    outcome: "사용자 피드백을 통해 장바구니 전환율 25% 향상, useMemo와 useCallback을 활용한 최적화로 렌더링 성능 30% 개선을 달성했습니다.",
  },
  {
    id: "chat-app",
    title: "실시간 채팅 애플리케이션",
    description: "WebSocket을 활용한 실시간 메시징 플랫폼",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBzY3JlZW58ZW58MXx8fHwxNzYwMzIzMDMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "WebSocket", "Node.js", "CSS Modules"],
    retrospective: "실시간 통신의 어려움을 경험했습니다. 연결 끊김 처리와 재연결 로직 구현이 가장 도전적이었습니다.",
    demoUrl: "#",
    githubUrl: "#",
    overview: "WebSocket을 기반으로 한 실시간 채팅 애플리케이션입니다. 1:1 채팅, 그룹 채팅, 파일 전송 기능을 지원하며, 읽음 표시와 타이핑 인디케이터 등 실용적인 기능을 구현했습니다.",
    period: "2023.09 - 2023.12 (3개월)",
    team: "개인 프로젝트",
    role: "풀스택 개발",
    keyFeatures: [
      "실시간 1:1 및 그룹 채팅",
      "파일 및 이미지 전송",
      "읽음 표시 및 타이핑 인디케이터",
      "메시지 검색 기능",
      "알림 시스템",
    ],
    techStack: {
      frontend: ["React", "Socket.io-client", "CSS Modules", "Zustand"],
      backend: ["Node.js", "Socket.io", "MongoDB", "Redis"],
      deployment: ["Heroku", "MongoDB Atlas"],
    },
    kpt: {
      keep: [
        "Socket.io를 활용한 안정적인 실시간 통신",
        "Redis를 통한 메시지 캐싱으로 성능 향상",
        "에러 바운더리를 통한 안정적인 에러 처리",
      ],
      problem: [
        "네트워크 불안정 시 재연결 로직의 복잡성",
        "대용량 파일 전송 시 성능 저하",
        "메시지 동기화 이슈",
      ],
      try: [
        "Service Worker를 활용한 오프라인 지원",
        "청크 업로드 방식으로 대용량 파일 처리",
        "메시지 큐 시스템 도입",
      ],
    },
    challenges: "네트워크 연결이 끊겼다가 다시 연결될 때 메시지 동기화가 가장 큰 도전 과제였습니다. 클라이언트에서 마지막 수신 메시지 ID를 저장하고, 재연결 시 서버에 요청하여 누락된 메시지를 가져오는 방식으로 해결했습니다.",
    outcome: "평균 메시지 전송 지연 시간 50ms 이하 달성, 동시 접속자 500명 이상 지원 가능한 안정적인 시스템 구축에 성공했습니다.",
  },
  {
    id: "dashboard",
    title: "대시보드 UI 시스템",
    description: "재사용 가능한 컴포넌트 라이브러리를 갖춘 관리자 대시보드",
    image: "https://images.unsplash.com/photo-1677214467820-ab069619bbb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzYwMzAwMTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "Recharts", "Storybook", "Tailwind CSS"],
    retrospective: "컴포넌트 설계의 중요성을 깊이 이해하게 되었습니다. Atomic Design 패턴을 적용하여 유지보수성을 높였습니다.",
    demoUrl: "#",
    githubUrl: "#",
    overview: "데이터 시각화와 관리 기능을 제공하는 관리자 대시보드입니다. 재사용 가능한 컴포넌트 라이브러리를 구축하고 Storybook으로 문서화했습니다.",
    period: "2023.05 - 2023.08 (4개월)",
    team: "프론트엔드 3명, 디자이너 1명",
    role: "프론트엔드 리드 개발자",
    keyFeatures: [
      "실시간 데이터 대시보드",
      "커스터마이징 가능한 차트 컴포넌트",
      "사용자/권한 관리 시스템",
      "데이터 내보내기 (CSV, Excel)",
      "다크 모드 지원",
    ],
    techStack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Storybook"],
      backend: ["REST API", "GraphQL"],
      deployment: ["Netlify", "Storybook Cloud"],
    },
    kpt: {
      keep: [
        "Atomic Design 패턴을 통한 체계적인 컴포넌트 설계",
        "Storybook을 활용한 효과적인 컴포넌트 문서화",
        "접근성(a11y)을 고려한 UI 구현",
        "타입스크립트로 안전한 props 관리",
      ],
      problem: [
        "초기 디자인 시스템 구축에 시간 소요",
        "차트 렌더링 성능 이슈",
        "다양한 브라우저 호환성 문제",
      ],
      try: [
        "디자인 토큰 시스템 도입",
        "가상화(Virtualization)를 통한 대용량 데이터 처리",
        "크로스 브라우저 테스트 자동화",
      ],
    },
    challenges: "대용량 데이터를 차트로 렌더링할 때 성능 이슈가 발생했습니다. React.memo, useMemo를 활용한 메모이제이션과 데이터 샘플링 기법을 통해 1000개 이상의 데이터 포인트도 부드럽게 렌더링할 수 있게 개선했습니다.",
    outcome: "재사용 가능한 컴포넌트 50개 이상 구축, 다른 팀에서도 사용할 수 있는 내부 라이브러리로 발전시켜 개발 생산성 40% 향상에 기여했습니다.",
  },
];
