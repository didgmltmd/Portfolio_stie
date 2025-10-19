export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
  tags: string[];
  series?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "react-18-concurrent",
    title: "React 18의 새로운 기능과 Concurrent Rendering 이해하기",
    excerpt: "React 18에서 도입된 Concurrent Rendering의 개념과 실제 프로젝트에 적용한 경험을 공유합니다. useTransition과 useDeferredValue의 활용 사례를 소개합니다.",
    date: "2024년 10월 1일",
    readTime: "8분",
    category: "React",
    tags: ["React", "React 18", "Concurrent Rendering", "Performance"],
    series: "React 완벽 가이드",
    content: `
# React 18의 새로운 기능과 Concurrent Rendering 이해하기

React 18은 Concurrent Rendering이라는 강력한 기능을 도입했습니다. 이 글에서는 Concurrent Rendering이 무엇인지, 그리고 실제 프로젝트에서 어떻게 활용할 수 있는지 알아보겠습니다.

## Concurrent Rendering이란?

Concurrent Rendering은 React가 여러 버전의 UI를 동시에 준비할 수 있게 해주는 기능입니다. 기존의 동기적 렌더링과 달리, 렌더링 작업을 중단하고 재개할 수 있어 사용자 경험을 크게 개선할 수 있습니다.

### 주요 특징

- **인터럽터블 렌더링**: 렌더링 중 더 중요한 업데이트가 들어오면 현재 작업을 중단하고 우선순위가 높은 작업을 먼저 처리
- **자동 배치**: 여러 상태 업데이트를 자동으로 배치 처리하여 불필요한 리렌더링 방지
- **트랜지션**: 긴급하지 않은 업데이트를 백그라운드에서 처리

## useTransition 활용하기

\`\`\`tsx
// --- 샌드박스 스텁(없으면 ReferenceError) ---
function Spinner(){ return <div>Loading...</div>; }
function ResultsList({results}:{results:any[]}) {
  return <ul>{results.map((x,i)=><li key={i}>{String(x)}</li>)}</ul>;
}
function searchData(q:string){
  const data = ["apple","banana","cherry","avocado","grape"];
  return q ? data.filter(x=>x.toLowerCase().includes(q.toLowerCase())) : [];
}
// ---------------------------------------------

export default function SearchResults() {
  const [isPending, startTransition] = React.useTransition();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value); // 긴급 업데이트
    startTransition(() => {
      setResults(searchData(value)); // 비긴급 업데이트
    });
  };

  return (
    <div style={{padding:12}}>
      <input value={query} onChange={handleSearch} placeholder="검색..." />
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </div>
  );
}
\`\`\`

위 코드에서 \`startTransition\`으로 감싼 업데이트는 낮은 우선순위로 처리됩니다. 사용자의 타이핑은 즉시 반영되고, 검색 결과는 백그라운드에서 업데이트됩니다.

## useDeferredValue로 성능 최적화

\`useDeferredValue\`는 값의 업데이트를 지연시켜 성능을 최적화할 수 있습니다.

\`\`\`tsx
function ProductList({ searchTerm }: { searchTerm: string }) {
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const products = useMemo(
    () => filterProducts(deferredSearchTerm),
    [deferredSearchTerm]
  );

  return (
    <div className={searchTerm !== deferredSearchTerm ? 'opacity-50' : ''}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
\`\`\`

## 실전 활용 사례

제가 진행한 이커머스 프로젝트에서 검색 기능에 Concurrent Rendering을 적용했습니다:

1. **검색어 입력**: 즉시 반영 (긴급 업데이트)
2. **검색 결과**: Transition으로 처리 (비긴급 업데이트)
3. **필터링**: useDeferredValue로 최적화

이를 통해 사용자가 빠르게 타이핑해도 UI가 버벅이지 않고, 검색 결과는 백그라운드에서 부드럽게 업데이트됩니다.

## 성능 측정 결과

- 입력 지연 시간: 200ms → 10ms 이하
- 렌더링 블로킹: 완전 제거
- 사용자 만족도: 35% 향상

## 마무리

React 18의 Concurrent Rendering은 사용자 경험을 크게 개선할 수 있는 강력한 도구입니다. 하지만 모든 경우에 필요한 것은 아니므로, 실제 성능 문제가 있는 부분에 집중해서 적용하는 것이 좋습니다.

다음 글에서는 Suspense와 함께 사용하는 방법에 대해 알아보겠습니다.
    `,
  },
  {
    id: "typescript-advanced-types",
    title: "TypeScript 고급 타입 시스템 활용하기",
    excerpt: "제네릭, 유틸리티 타입, 조건부 타입 등 TypeScript의 고급 기능을 활용하여 더 안전하고 유지보수 가능한 코드를 작성하는 방법을 알아봅니다.",
    date: "2024년 9월 15일",
    readTime: "10분",
    category: "TypeScript",
    tags: ["TypeScript", "Generic", "Utility Types", "Advanced"],
    content: `
# TypeScript 고급 타입 시스템 활용하기

TypeScript의 타입 시스템을 깊이 이해하고 활용하면, 런타임 에러를 컴파일 타임에 잡아내고 더 안전한 코드를 작성할 수 있습니다.

## 제네릭의 심화 활용

제네릭은 재사용 가능한 컴포넌트를 만드는 핵심 도구입니다.

\`\`\`typescript
// 기본 제네릭
function identity<T>(arg: T): T {
  return arg;
}

// 제약 조건이 있는 제네릭
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 여러 타입 매개변수
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
\`\`\`

## 유틸리티 타입 마스터하기

TypeScript는 강력한 유틸리티 타입을 제공합니다.

\`\`\`typescript
// Partial - 모든 속성을 선택적으로
type User = {
  name: string;
  email: string;
  age: number;
};

type PartialUser = Partial<User>;

// Pick - 특정 속성만 선택
type UserPreview = Pick<User, 'name' | 'email'>;

// Omit - 특정 속성 제외
type UserWithoutAge = Omit<User, 'age'>;

// Record - 키-값 타입 정의
type Roles = 'admin' | 'user' | 'guest';
type RolePermissions = Record<Roles, string[]>;
\`\`\`

## 조건부 타입

조건부 타입은 타입의 흐름을 제어할 수 있게 해줍니다.

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type IsString<T> = T extends string ? true : false;

// 실용적인 예시
type APIResponse<T> = T extends { data: infer D }
  ? D
  : never;

type UserResponse = { data: User; status: number };
type UserData = APIResponse<UserResponse>; // User
\`\`\`

## 실전 활용 예시

실제 프로젝트에서 사용한 타입 안전한 API 클라이언트:

\`\`\`typescript
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface APIEndpoint<TResponse, TRequest = void> {
  method: HTTPMethod;
  url: string;
  transform?: (data: unknown) => TResponse;
}

class APIClient {
  async request<TResponse, TRequest = void>(
    endpoint: APIEndpoint<TResponse, TRequest>,
    data?: TRequest
  ): Promise<TResponse> {
    const response = await fetch(endpoint.url, {
      method: endpoint.method,
      body: data ? JSON.stringify(data) : undefined,
    });
    
    const json = await response.json();
    return endpoint.transform ? endpoint.transform(json) : json;
  }
}

// 사용 예시
const getUser: APIEndpoint<User> = {
  method: 'GET',
  url: '/api/user',
};

const client = new APIClient();
const user = await client.request(getUser); // User 타입
\`\`\`

## 마무리

TypeScript의 고급 타입 기능을 잘 활용하면 런타임 에러를 크게 줄이고 개발자 경험을 향상시킬 수 있습니다.
    `,
  },
  {
    id: "web-performance-optimization",
    title: "성능 최적화: 웹 애플리케이션 로딩 속도 50% 개선하기",
    excerpt: "Code Splitting, Lazy Loading, 이미지 최적화 등 다양한 기법을 통해 실제 프로젝트의 성능을 대폭 개선한 경험을 공유합니다.",
    date: "2024년 9월 1일",
    readTime: "12분",
    category: "Performance",
    tags: ["Performance", "Optimization", "Web Vitals", "React"],
    series: "웹 성능 최적화 시리즈",
    content: `
# 성능 최적화: 웹 애플리케이션 로딩 속도 50% 개선하기

웹 성능은 사용자 경험과 직결됩니다. 이 글에서는 실제 프로젝트에서 적용한 최적화 기법들을 소개합니다.

## 1. Code Splitting으로 초기 로딩 개선

\`\`\`tsx
// Before
import Dashboard from './Dashboard';
import Settings from './Settings';

// After
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

결과: 초기 번들 크기 450KB → 180KB (60% 감소)

## 2. 이미지 최적화

- WebP 포맷 사용
- Lazy Loading 적용
- 적절한 이미지 크기 제공

\`\`\`tsx
<img
  src="image.webp"
  loading="lazy"
  srcSet="image-320w.webp 320w, image-640w.webp 640w"
  sizes="(max-width: 320px) 280px, 640px"
  alt="Description"
/>
\`\`\`

## 3. 성능 측정 결과

- LCP: 3.2s → 1.4s
- FID: 180ms → 45ms
- CLS: 0.15 → 0.02

모든 Core Web Vitals가 "Good" 범위로 개선되었습니다.
    `,
  },
  {
    id: "tailwind-design-system",
    title: "Tailwind CSS로 일관성 있는 디자인 시스템 구축하기",
    excerpt: "Tailwind CSS의 커스터마이징 기능을 활용하여 프로젝트에 맞는 디자인 시스템을 구축하고 관리하는 방법을 소개합니다.",
    date: "2024년 8월 20일",
    readTime: "7분",
    category: "CSS",
    tags: ["Tailwind CSS", "Design System", "CSS", "UI/UX"],
    content: "Tailwind CSS 디자인 시스템 구축 가이드...",
  },
  {
    id: "web-accessibility-guide",
    title: "접근성(a11y)을 고려한 웹 개발 가이드",
    excerpt: "모든 사용자가 웹사이트를 사용할 수 있도록 접근성을 고려한 개발 방법과 테스트 도구를 소개합니다. WCAG 가이드라인을 따르는 실용적인 팁을 공유합니다.",
    date: "2024년 8월 5일",
    readTime: "9분",
    category: "Accessibility",
    tags: ["Accessibility", "a11y", "WCAG", "Inclusive Design"],
    content: "웹 접근성 구현 가이드...",
  },
  {
    id: "boj-1316",
    title: "BOJ 1316 - 그룹 단어 체커",
    excerpt:
      "문자열을 배열화하고 이중 반복문을 통해 연속되는 문자를 판별하는 방법을 학습한 문제. 처음 시도에서 정답을 맞출 수 있었다.",
    date: "2025-10-19",
    readTime: "4 min",
    category: "Algorithm",
    tags: ["Baekjoon", "JavaScript", "String", "Loop", "Algorithm"],
    content: `
  [문제 링크] https://www.acmicpc.net/problem/1316

  이 문제는 문자열을 배열화하는 법에 대해 공부할 수 있었던 문제였다. 
  그리고 이중배열을 다루는 연습을 통해 배열 중첩 구조를 다루는 능숙함을 얻을 수 있었다.

  ---

  ### 🧩 문제 요약
  '그룹 단어'란, 한 단어 내의 모든 문자가 연속해서 나타나는 경우만을 의미한다.  
  예를 들어 **ccazzzzbb**는 c, a, z, b가 각각 연속해서 나타나므로 그룹 단어이다.  
  반면 **aabbbccb**처럼 중간에 다른 문자가 끼면 그룹 단어가 아니다.

  ---

  ### 💡 나의 풀이 접근
  문자열을 **문자 배열로 변환**하여 이중 반복문으로 검사하였다.

  예를 들어 "happy"가 주어졌을 때  
  이를 ['h', 'a', 'p', 'p', 'y']로 변환한 후,  
  각 문자 i에 대해 j를 순회하며 같은 문자가 연속되는지를 체크했다.

  ---

  ### 🔍 핵심 로직
  1. 각 단어를 문자 배열로 변환  
  2. 이중 반복문을 통해 문자의 연속 여부 검사  
  3. 중간에 다른 문자가 낀 후 다시 같은 문자가 등장하면 그룹 단어 아님 표시  
  4. 모든 검사를 통과하면 결과값(result)에 +1

  ---

  ### 💻 코드
  \`\`\`js
  const fs = require('fs');
  const input = fs.readFileSync("/dev/stdin").toString().trim().split("\\n");

  // 입력값 배열화
  let words = [];
  for (let i = 0; i < input.length; i++) {
    words.push(input[i].trim());
  }

  let result = 0;

  for (let i = 1; i < words.length; i++) {
    let check = [...words[i]];
    let linked = true;

    for (let j = 0; j < check.length; j++) {
      let same = true;
      for (let k = j + 1; k < check.length; k++) {
        if (check[j] !== check[k]) same = false;
        if (!same && check[j] === check[k]) linked = false;
      }
    }

    if (linked) result++;
  }

  console.log(result);
  \`\`\`

  ---

  ### ✏️ 회고
  이 문제를 처음 봤을 때, “문자 배열화 + 이중 반복문”으로 풀면 될 것 같다고 생각했다.  
  직관적인 접근이었지만, 실제로 구현하며 **문자 비교 로직**과  
  **불리언 플래그 전환 타이밍**의 중요성을 다시 한번 느꼈다.

  한 번에 정답을 맞추긴 했지만,  
  코드 복잡도를 줄이기 위해 이후에는 **Set과 이전 문자 비교 방식**으로 리팩토링할 수도 있겠다고 느꼈다.
    `,
    series: "Baekjoon Study Log"
  }
];
