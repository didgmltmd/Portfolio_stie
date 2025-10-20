export type BlogCategory  = "공부" | "프로젝트" | "알고리즘" | "대외활동";

export interface BlogPost {
  id: string;
  primary:boolean;
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
  id: "boj-1316-group-word-checker",
  primary:true,
  title: "백준 1316번 - 그룹 단어 체커 풀이",
  excerpt:
    "문자열을 배열화하고 이중 반복문을 다루는 연습을 할 수 있었던 문제입니다. 그룹 단어의 조건을 검사하는 과정을 단계별로 설명합니다.",
  date: "2024년 3월 1일",
  readTime: "6분",
  category: "알고리즘",
  tags: ["백준", "문자열", "JavaScript", "그룹 단어 체커"],
  series: "Baekjoon 풀이 모음",
  content: `
백준 1316번
이 문제는 문자열을 배열화 하는 법에대해 공부할 수 있었던 문제였다. 그리고 이중배열을 다루는데 좀더 능숙해질 수 있었다.
 

https://www.acmicpc.net/problem/1316

 
1316번: 그룹 단어 체커

그룹 단어란 단어에 존재하는 모든 문자에 대해서, 각 문자가 연속해서 나타나는 경우만을 말한다. 예를 들면, ccazzzzbb는 c, a, z, b가 모두 연속해서 나타나고, kin도 k, i, n이 연속해서 나타나기 때

www.acmicpc.net
 

 

 

처음이자 정답으로 제출한 코드

\`\`\`js
const input = "3\\nhappy\\nnew\\nyear".trim().split("\\n");

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
      if (check[j] != check[k]) same = false;
      if (!same && check[j] == check[k]) linked = false;
    }
  }

  if (linked) result++;
}

console.log(result);
\`\`\`

이 문제를 처음 봤을떄 문자를 배열화하여 이중배열로 확인하면 금방 풀리겠다 라고 생각했다.

 

처음의 생각했던 방식은 아래와 같다.

 

happy 라는 입력값이 있을경우 이를 배열화 하여

[ 'h', 'a', 'p', 'p', 'y'] 로 변환하고 이중배열을 통하여 이어지는 알파벳들을 검사한다.

 

i번째 인덱스가 h일때 j번째 인덱스는 appy를 검사하고

i번째 인덱스가 a일때 j번째 인덱스는 ppy를 검사한다.

 

이때 same 이라는 boolean 값을 하나 만들어 반복문이 실행될때 이 값을 true로 두고 

i번째 인덱스값과 j번째 인덱스가 달라질경우 해당 값을 false로 변경한다.

 

이떄 same값이 false 일때부터 i번째 인덱스와 j번째 인덱스가 같을경우 linked 값을 false로 변경하여 링크단어가 아님을 표시한다.

 

마지막으로 반복문이 끝날때 linked 값이 true이면 result 값에 1을 더하고 아닐경우 그냥 패스한다.

 

 

해당 문제를 위와 같은 과정으로 풀이하였고 다행히 한번에 통과할 수 있었다.
  `,
},
  {
    id: "react-18-concurrent",
    primary:true,
    title: "React 18의 새로운 기능과 Concurrent Rendering 이해하기",
    excerpt: "React 18에서 도입된 Concurrent Rendering의 개념과 실제 프로젝트에 적용한 경험을 공유합니다. useTransition과 useDeferredValue의 활용 사례를 소개합니다.",
    date: "2024년 10월 1일",
    readTime: "8분",
    category: "공부",
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
  id: "boj-1384-message",
  primary: true,
  title: "백준 1384번 - 메시지 풀이",
  excerpt:
    "문제의 방향을 잘못 이해해 처음에 헤맸던 문제입니다. 종이를 넘기는 방향과 인덱스 역추적 로직을 구현하며 문제를 해결했습니다.",
  date: "2024년 3월 3일",
  readTime: "7분",
  category: "알고리즘",
  tags: ["백준", "구현", "JavaScript", "메시지"],
  series: "Baekjoon 풀이 모음",
  content: `
  위 문제는 처음에 문제 이해를 잘못해서 풀이방향이 잘못될뻔한 문제이다..종이를 넘기는것이 입력받은 값기준 첫번째 줄이 두번째줄에게 종이를 넘기는 것이므로 예제 1번에서 N은 아래로 두번째 있는 아이가 쓴것이라고 이해했다.근데 왜인지 위로 두번째를 넘겼어야했다. 이건 아직도 잘모르겠지만..위로 하니까 풀렸다(예제출력을 보고 알았다)

  https://www.acmicpc.net/problem/1316

  
  1316번: 그룹 단어 체커

  그룹 단어란 단어에 존재하는 모든 문자에 대해서, 각 문자가 연속해서 나타나는 경우만을 말한다. 예를 들면, ccazzzzbb는 c, a, z, b가 모두 연속해서 나타나고, kin도 k, i, n이 연속해서 나타나기 때

  www.acmicpc.net
  

  

  

  처음이자 정답으로 제출한 코드

\`\`\`js
const input = [
  "3",
  "Amy P P N",
  "Bob N P P",
  "Chloe P N P",
  "4",
  "Ann P P P P",
  "Ben P P P P",
  "Cara P P P P",
  "Dan P P P P",
  "0"
];

const checkPN = (group, child) => {
  console.log("Group " + group);
  let badChild = false;
  for (let i = 0; i < child.length; i++) {
    for (let j = 1; j < child[0].length; j++) {
      if (child[i][j] === "N") {
        badChild = true;
        if (i - j < 0) {
          console.log(
            child[i - j + child.length][0] + " was nasty about " + child[i][0]
          );
        } else {
          console.log(child[i - j][0] + " was nasty about " + child[i][0]);
        }
      }
    }
  }
  if (!badChild) console.log("Nobody was nasty");
  console.log();
};

let roof = 0;
let group = 1;

while (roof < input.length && Number(input[roof]) !== 0) {
  const n = Number(input[roof]);
  const childPaper = [];
  for (let i = roof + 1; i <= roof + n; i++) {
    childPaper.push(input[i].trim().split(" "));
  }
  checkPN(group, childPaper);
  roof += n + 1;
  group++;
}
\`\`\`


첫번째 제출에서 출력형식이 잘못됬던 점은 그룹의 인원을 출력하고 console.log()로 띄어쓰기를 한번 해주어야됬었다.

 

위 문제를 보고 떠올린 아이디어는 간단하다.

이중배열로 데이터를 받고 각 인덱스의 0번째 인덱스에는 아이들의 이름이 들어갈것이고 그 이후의 인덱스에는 P 또는 N의 값이 있을것이다.

 

이중배열로 1번째 배열부터 검색하여 N 이라는 값이 나올경우에는 badChild이라는 boolean 값을 참으로 바꾸고 N이 나온 인덱스로부터 역추적하면된다.

역추적은 상하인덱스로 이동을 해주면되기 떄문에 위 코드에서는 j번째 인덱스는 놔두고 i번째 인덱스를 옮겨주면된다.

 

그 이후 추적한 i번째 인덱스의 [0]번째 값에는 이름이 들어있으므로 이와 기존 i번째 인덱스의 [0] 번째 값을 출력해주면된다.

 

만일 nasty 학생이 없을경우  badChild 값이 false로 유지되므로 if 문을 통해 !badChild 일경우 nasty 한 학생이 없었음을 출력해주면된다.

 

위 문제는 단순 구현의 문제로 구현하는데는 오래걸렸지만 아이디어를 내는 부분에서는 크게 생각할거리가 없었던거 같다.
  `,
},
  {
    id: "web-performance-optimization",
    primary:false,
    title: "성능 최적화: 웹 애플리케이션 로딩 속도 50% 개선하기",
    excerpt: "Code Splitting, Lazy Loading, 이미지 최적화 등 다양한 기법을 통해 실제 프로젝트의 성능을 대폭 개선한 경험을 공유합니다.",
    date: "2024년 9월 1일",
    readTime: "12분",
    category: "프로젝트",
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
    primary:false,
    title: "Tailwind CSS로 일관성 있는 디자인 시스템 구축하기",
    excerpt: "Tailwind CSS의 커스터마이징 기능을 활용하여 프로젝트에 맞는 디자인 시스템을 구축하고 관리하는 방법을 소개합니다.",
    date: "2024년 8월 20일",
    readTime: "7분",
    category: "프로젝트",
    tags: ["Tailwind CSS", "Design System", "CSS", "UI/UX"],
    content: "Tailwind CSS 디자인 시스템 구축 가이드...",
  },
  {
    id: "boj-1384-message",
    primary:false,
    title: "백준 1384번 메시지",
    excerpt: "모든 사용자가 웹사이트를 사용할 수 있도록 접근성을 고려한 개발 방법과 테스트 도구를 소개합니다. WCAG 가이드라인을 따르는 실용적인 팁을 공유합니다.",
    date: "2024년 4월 14일",
    readTime: "7분",
    category: "알고리즘",
    tags: ["백준","JavaScript", "메시지"],
    content: `
    
    
    
    `,
  },
  {
  id: "boj-1316-group-word-checker",
  primary:true,
  title: "백준 1316번 - 그룹 단어 체커 풀이",
  excerpt:
    "문자열을 배열화하고 이중 반복문을 다루는 연습을 할 수 있었던 문제입니다. 그룹 단어의 조건을 검사하는 과정을 단계별로 설명합니다.",
  date: "2024년 3월 1일",
  readTime: "6분",
  category: "알고리즘",
  tags: ["백준", "문자열", "JavaScript", "그룹 단어 체커"],
  series: "Baekjoon 풀이 모음",
  content: `
백준 1316번
이 문제는 문자열을 배열화 하는 법에대해 공부할 수 있었던 문제였다. 그리고 이중배열을 다루는데 좀더 능숙해질 수 있었다.
 

https://www.acmicpc.net/problem/1316

 
1316번: 그룹 단어 체커

그룹 단어란 단어에 존재하는 모든 문자에 대해서, 각 문자가 연속해서 나타나는 경우만을 말한다. 예를 들면, ccazzzzbb는 c, a, z, b가 모두 연속해서 나타나고, kin도 k, i, n이 연속해서 나타나기 때

www.acmicpc.net
 

 

 

처음이자 정답으로 제출한 코드

\`\`\`js
const input = "3\\nhappy\\nnew\\nyear".trim().split("\\n");

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
      if (check[j] != check[k]) same = false;
      if (!same && check[j] == check[k]) linked = false;
    }
  }

  if (linked) result++;
}

console.log(result);
\`\`\`

이 문제를 처음 봤을떄 문자를 배열화하여 이중배열로 확인하면 금방 풀리겠다 라고 생각했다.

 

처음의 생각했던 방식은 아래와 같다.

 

happy 라는 입력값이 있을경우 이를 배열화 하여

[ 'h', 'a', 'p', 'p', 'y'] 로 변환하고 이중배열을 통하여 이어지는 알파벳들을 검사한다.

 

i번째 인덱스가 h일때 j번째 인덱스는 appy를 검사하고

i번째 인덱스가 a일때 j번째 인덱스는 ppy를 검사한다.

 

이때 same 이라는 boolean 값을 하나 만들어 반복문이 실행될때 이 값을 true로 두고 

i번째 인덱스값과 j번째 인덱스가 달라질경우 해당 값을 false로 변경한다.

 

이떄 same값이 false 일때부터 i번째 인덱스와 j번째 인덱스가 같을경우 linked 값을 false로 변경하여 링크단어가 아님을 표시한다.

 

마지막으로 반복문이 끝날때 linked 값이 true이면 result 값에 1을 더하고 아닐경우 그냥 패스한다.

 

 

해당 문제를 위와 같은 과정으로 풀이하였고 다행히 한번에 통과할 수 있었다.
  `,
},
{
  id: "feature-kakaomap-realtime",
  primary: true,
  title: "KakaoMap 실시간 위치 표시 & 경로 시각화",
  excerpt: "브라우저 Geolocation과 KakaoMap Overlay를 결합해 현재 위치를 스트리밍하고, 이동 경로를 폴리라인으로 시각화했습니다.",
  date: "2025년 10월 19일",
  readTime: "2분",
  category: "프로젝트",
  tags: ["KakaoMap", "Geolocation", "Polyline", "실시간"],
  series: "SafeRoute",
  content: `
카카오맵 API를 활용했습니다.


  `,
},
{
  id: "festival_01",
  primary: false,
  title: "메뉴 추가 / 수정 / 삭제 구현",
  excerpt: "브라우저 Geolocation과 KakaoMap Overlay를 결합해 현재 위치를 스트리밍하고, 이동 경로를 폴리라인으로 시각화했습니다.",
  date: "2025년 10월 19일",
  readTime: "2분",
  category: "프로젝트",
  tags: ["Modal", "axios"],
  series: "Festival",
  content: `

\`\`\`tsx
import React, { useState } from "react";

const zones = ["A", "B", "C", "Counter"];
const menus = [];

function MenuAdd({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [zone, setZone] = useState("A");

  if (!open) return null;

  const submit = () => {
    if (!name || !price) return alert("모든 항목을 입력해주세요");
    menus.push({ name, price: parseInt(price), zone });
    onAdd();
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 8,
          width: 280,
        }}
      >
        <h3>메뉴 추가</h3>
        <input
          placeholder="메뉴 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <input
          placeholder="가격"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        >
          {zones.map((z) => (
            <option key={z}>{z} 구역</option>
          ))}
        </select>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onClose}>취소</button>
          <button onClick={submit}>추가</button>
        </div>
      </div>
    </div>
  );
}

export default function CounterPage() {
  const [modal, setModal] = useState(false);
  const [list, setList] = useState([...menus]);

  const refresh = () => setList([...menus]);

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setModal(true)} style={{ marginRight: 8 }}>
          메뉴 추가
        </button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={{ textAlign: "left", padding: 8 }}>품목</th>
            <th style={{ textAlign: "right", padding: 8 }}>가격</th>
            <th style={{ textAlign: "right", padding: 8 }}>구역</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ padding: 8, textAlign: "center", color: "#666" }}>
                등록된 메뉴가 없습니다.
              </td>
            </tr>
          ) : (
            list.map((menu, i) => (
              <tr key={i}>
                <td style={{ padding: 8 }}>{menu.name}</td>
                <td style={{ padding: 8, textAlign: "right" }}>{menu.price}원</td>
                <td style={{ padding: 8, textAlign: "right" }}>{menu.zone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <MenuAdd open={modal} onClose={() => setModal(false)} onAdd={refresh} />
    </div>
  );
}

\`\`\`


\`\`\`tsx
import React, { useState } from "react";

const zones = ["A", "B", "C", "Counter"];

export default function EditMenuPage() {
  const [menus, setMenus] = useState([
    { name: "소시지야채볶음", price: 5000, zone: "C" },
    { name: "황도후르츠", price: 4000, zone: "C" },
  ]);

  const [editItem, setEditItem] = useState(null);

  const handleUpdate = (updatedItem) => {
    setMenus((prev) =>
      prev.map((m) => (m.name === updatedItem.name ? updatedItem : m))
    );
    setEditItem(null);
  };

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={{ textAlign: "left", padding: 8 }}>품목</th>
            <th style={{ textAlign: "right", padding: 8 }}>가격</th>
            <th style={{ textAlign: "right", padding: 8 }}>구역</th>
            <th style={{ textAlign: "center", padding: 8 }}>관리</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((it, i) => (
            <tr key={i}>
              <td style={{ padding: 8 }}>{it.name}</td>
              <td style={{ padding: 8, textAlign: "right" }}>{it.price}원</td>
              <td style={{ padding: 8, textAlign: "right" }}>{it.zone}</td>
              <td style={{ padding: 8, textAlign: "center" }}>
                <button onClick={() => setEditItem(it)}>수정</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editItem && (
        <EditModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

function EditModal({ item, onClose, onSave }) {
  const [price, setPrice] = useState(item.price);
  const [zone, setZone] = useState(item.zone);

  const handleSubmit = () => {
    onSave({ ...item, price: parseInt(price), zone });
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 8,
          width: 280,
        }}
      >
        <h3>메뉴 수정</h3>
        <div style={{ marginBottom: 8 }}>
          <b>품목:</b> {item.name}
        </div>
        <input
          type="number"
          placeholder="가격"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        >
          {zones.map((z) => (
            <option key={z}>{z} 구역</option>
          ))}
        </select>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onClose}>취소</button>
          <button onClick={handleSubmit}>수정</button>
        </div>
      </div>
    </div>
  );
}
\`\`\`

\`\`\`tsx
import React, { useState, useEffect } from "react";

export default function DeleteMenuPage() {
  const [menus, setMenus] = useState([
    { name: "소시지야채볶음", price: 5000, zone: "C" },
    { name: "황도후르츠", price: 4000, zone: "C" },
    { name: "음료수", price: 1000, zone: "Counter" },
  ]);
  const [pendingDelete, setPendingDelete] = useState(null); 
  const [timeoutId, setTimeoutId] = useState(null); 

  const askDelete = (name) => {
    if (pendingDelete !== name) {
      setPendingDelete(name);
      
      const id = setTimeout(() => setPendingDelete((prev) => (prev === name ? null : prev)), 5000);
      setTimeoutId((old) => {
        if (old) clearTimeout(old);
        return id;
      });
      return;
    }
    
    setMenus((prev) => prev.filter((m) => m.name !== name));
    setPendingDelete(null);
    if (timeoutId) clearTimeout(timeoutId);
  };

  const cancelDelete = () => {
    setPendingDelete(null);
    if (timeoutId) clearTimeout(timeoutId);
  };

  
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={{ textAlign: "left", padding: 8 }}>품목</th>
            <th style={{ textAlign: "right", padding: 8 }}>가격</th>
            <th style={{ textAlign: "right", padding: 8 }}>구역</th>
            <th style={{ textAlign: "center", padding: 8 }}>관리</th>
          </tr>
        </thead>
        <tbody>
          {menus.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: 8, color: "#666" }}>
                등록된 메뉴가 없습니다.
              </td>
            </tr>
          ) : (
            menus.map((it, i) => (
              <tr key={i}>
                <td style={{ padding: 8 }}>{it.name}</td>
                <td style={{ padding: 8, textAlign: "right" }}>{it.price}원</td>
                <td style={{ padding: 8, textAlign: "right" }}>{it.zone}</td>
                <td style={{ padding: 8, textAlign: "center" }}>
                  {pendingDelete === it.name ? (
                    <>
                      <button onClick={() => askDelete(it.name)} style={{ marginRight: 6 }}>
                        확인
                      </button>
                      <button onClick={cancelDelete}>취소</button>
                    </>
                  ) : (
                    <button onClick={() => askDelete(it.name)}>삭제</button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

\`\`\`
  `,
},
{
  id: "festival_02",
  primary: false,
  title: "주문서 작성 구현",
  excerpt: "브라우저 Geolocation과 KakaoMap Overlay를 결합해 현재 위치를 스트리밍하고, 이동 경로를 폴리라인으로 시각화했습니다.",
  date: "2025년 10월 19일",
  readTime: "2분",
  category: "프로젝트",
  tags: ["Modal", "axios"],
  series: "Festival",
  content: `

\`\`\`tsx
import React, { useEffect, useState } from "react";

function Modal({ open, onClose, children, width = 400 }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          maxWidth: "90vw",
          borderRadius: 10,
          background: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          padding: 16,
        }}
      >
        {children}
      </div>
    </div>
  );
}

const INITIAL_MENUS = [
  { name: "소세지야채볶음", price: 7000, zone: "B" },
  { name: "통삼겹마늘간장볶음", price: 9000, zone: "A" },
  { name: "두부제육볶음", price: 8000, zone: "A" },
  { name: "골뱅이 소면", price: 8000, zone: "B" },
  { name: "오뎅탕", price: 6000, zone: "B" },
  { name: "비빔납작만두", price: 6000, zone: "C" },
  { name: "우동", price: 5000, zone: "B" },
  { name: "황도", price: 4000, zone: "C" },
  { name: "양념감자", price: 4000, zone: "Counter" },
];

/* 외부인 추가요금 규칙 (2: +4000, 1: +2000, 0: +0) */
const MENU_DETAIL = {
  "소세지야채볶음": 2,
  "통삼겹마늘간장볶음": 2,
  "두부제육볶음": 2,
  "골뱅이 소면": 2,
  "오뎅탕": 1,
  "비빔납작만두": 1,
  "우동": 1,
  "황도": 1,
  "양념감자": 0,
};

function saveSafe(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function QtyModal({ open, onClose, menu, onConfirm }) {
  const [qty, setQty] = useState(1);
  useEffect(() => { setQty(1); }, [menu]);

  return (
    <Modal open={open} onClose={onClose} width={360}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>수량 선택</div>
      <div style={{ marginBottom: 8 }}>{menu?.name} / {menu?.price?.toLocaleString()}원</div>
      <input
        type="number"
        value={qty}
        min={1}
        onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))}
        style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 8 }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
        <button onClick={onClose} style={btnSecondary}>취소</button>
        <button
          onClick={() => { onConfirm(menu, qty); onClose(); }}
          style={btnPrimary}
        >
          담기
        </button>
      </div>
    </Modal>
  );
}

function TableModal({ open, onClose, onSubmit }) {
  const [num, setNum] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => { setNum(""); setErr(""); }, [open]);

  const submit = () => {
    const n = parseInt(num, 10);
    if (Number.isNaN(n) || n < 1 || n > 100) {
      setErr("테이블 번호는 1~100 사이의 정수여야 합니다.");
      return;
    }
    onSubmit(n);
  };

  return (
    <Modal open={open} onClose={onClose} width={360}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>테이블 번호 입력</div>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
        placeholder="1~100"
        style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 8 }}
      />
      <div style={{ color: "crimson", minHeight: 20, fontSize: 13, marginTop: 6 }}>{err}</div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button onClick={onClose} style={btnSecondary}>취소</button>
        <button onClick={submit} style={btnPrimary}>확인</button>
      </div>
    </Modal>
  );
}

function SummaryModal({ open, onClose, cart, tableNumber, outsider, onToggleOutsider, onConfirm }) {
  const calcPrice = (item) => {
    if (!outsider) return { unit: item.price, total: item.total };
    const kind = MENU_DETAIL[item.name];
    const s = kind === 2 ? 4000 : kind === 1 ? 2000 : 0;
    const unit = item.price + s;
    return { unit, total: unit * item.quantity };
    };

  const sum = cart.reduce((acc, it) => acc + calcPrice(it).total, 0);

  return (
    <Modal open={open} onClose={onClose} width={420}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>주문 확인</div>
      <div style={{ marginBottom: 8 }}>테이블 번호: <b>{tableNumber}</b></div>

      <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 8, maxHeight: 280, overflowY: "auto" }}>
        {cart.map((item, idx) => {
          const { unit, total } = calcPrice(item);
          return (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "6px 4px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ marginRight: 8 }}>{item.name} ({item.quantity}개)</div>
              <div style={{ whiteSpace: "nowrap" }}>
                단가: {unit.toLocaleString()}원 / 총액: {total.toLocaleString()}원
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "right", marginTop: 10, fontWeight: 600 }}>
        총액: {sum.toLocaleString()}원
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
        <button
          onClick={onToggleOutsider}
          style={{
            ...btnPrimary,
            background: outsider ? "crimson" : "#111827"
          }}
        >
          {outsider ? "외부인" : "재학생"}
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onConfirm} style={btnPrimary}>주문 확정</button>
          <button onClick={onClose} style={btnSecondary}>취소</button>
        </div>
      </div>
    </Modal>
  );
}

export default function OrderCreatePlain() {
  const [menuList, setMenuList] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [tableModal, setTableModal] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState(null);
  const [outsider, setOutsider] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMenuList(INITIAL_MENUS);
  }, []);

  const addToCart = (item, quantity) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.name === item.name);
      if (idx === -1) {
        return [...prev, { ...item, quantity, total: item.price * quantity, served: false }];
      }
      const next = [...prev];
      const exist = next[idx];
      next[idx] = { ...exist, quantity: exist.quantity + quantity, total: exist.total + item.price * quantity };
      return next;
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const openTableAndSummary = () => {
    if (cart.length === 0) {
      setError("장바구니가 비어 있습니다.");
      return;
    }
    setError("");
    setTableModal(true);
  };

  const confirmTableThenSummary = (num) => {
    setTableNumber(num);
    setTableModal(false);
    setSummaryOpen(true);
  };

  const handleSubmitOrder = () => {
    const adjustedCart = outsider
      ? cart.map((it) => {
          const kind = MENU_DETAIL[it.name];
          const s = kind === 2 ? 4000 : kind === 1 ? 2000 : 0;
          const price = it.price + (kind ? s : 0);
          return { ...it, price, total: price * it.quantity };
        })
      : cart;

    const totalPrice = adjustedCart.reduce((acc, it) => acc + it.total, 0);

    const order = {
      tableNumber,
      items: adjustedCart.map(({ name, quantity, zone, price, total }) => ({ name, quantity, zone, price, total })),
      totalPrice,
      outsider,
      served: false,
      timestamp: new Date().toISOString(),
    };


    const prev = JSON.parse(localStorage.getItem("festival_orders") || "[]");
    saveSafe("festival_orders", [...prev, order]);

    if (outsider) {
      let drinking = 0;
      adjustedCart.forEach((item) => {
        const kind = MENU_DETAIL[item.name];
        if (kind) drinking += kind * item.quantity;
      });
      const prevDrunk = JSON.parse(localStorage.getItem("festival_drunk_orders") || "[]");
      saveSafe("festival_drunk_orders", [
        ...prevDrunk,
        {
          tableNumber,
          items: adjustedCart.map(({ name, quantity, zone }) => ({ name, quantity, zone })),
          timestamp: new Date().toISOString(),
          drinking,
        },
      ]);
    }

    setSummaryOpen(false);
    setCart([]);
    setTableNumber(null);
    setOutsider(false);
    setError("");
  };

  return (
    <div style={{ padding: 16, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <h2 style={{ margin: 0, marginBottom: 12 }}>주문서 작성</h2>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, background: "#f5f5f5", border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>장바구니</div>
          <div style={{ border: "1px solid #eaeaea", borderRadius: 8, maxHeight: 360, overflowY: "auto" }}>
            {cart.length === 0 ? (
              <div style={{ padding: 12, color: "#666", textAlign: "center" }}>비어 있습니다.</div>
            ) : (
              cart.map((it, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <div style={{ marginRight: 8 }}>
                    <div style={{ fontWeight: 600 }}>{it.name}</div>
                    <div style={{ fontSize: 13, color: "#666" }}>
                      {it.quantity}개 / {it.total.toLocaleString()}원
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(idx)} style={btnSecondarySmall}>삭제</button>
                </div>
              ))
            )}
          </div>

          <div style={{ textAlign: "right", marginTop: 10, fontWeight: 600 }}>
            총액: {cart.reduce((acc, it) => acc + it.total, 0).toLocaleString()}원
          </div>
          <div style={{ textAlign: "right", marginTop: 8 }}>
            <button
              onClick={openTableAndSummary}
              disabled={cart.length === 0}
              style={{ ...btnPrimary, opacity: cart.length === 0 ? 0.6 : 1 }}
            >
              주문 완료
            </button>
            {!!error && <div style={{ color: "crimson", marginTop: 6, fontSize: 13 }}>{error}</div>}
          </div>
        </div>

        <div style={{ flex: 1, background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>메뉴</div>
          <div style={{ maxHeight: 420, overflowY: "auto", border: "1px solid #eaeaea", borderRadius: 8 }}>
            {menuList.map((it, idx) => (
              <div key={idx}>
                <button
                  onClick={() => setSelectedMenu(it)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    textAlign: "left",
                    background: "white",
                    padding: 12,
                    border: "none",
                    borderBottom: "1px solid #f3f4f6",
                    cursor: "pointer",
                  }}
                >
                  <span>{it.name} ({it.zone})</span>
                  <span style={{ whiteSpace: "nowrap" }}>{it.price.toLocaleString()}원</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <QtyModal
        open={!!selectedMenu}
        onClose={() => setSelectedMenu(null)}
        menu={selectedMenu}
        onConfirm={addToCart}
      />

      <TableModal
        open={tableModal}
        onClose={() => setTableModal(false)}
        onSubmit={confirmTableThenSummary}
      />

      <SummaryModal
        open={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        cart={cart}
        tableNumber={tableNumber}
        outsider={outsider}
        onToggleOutsider={() => setOutsider((v) => !v)}
        onConfirm={handleSubmitOrder}
      />
    </div>
  );
}

const btnPrimary = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  background: "#111827",
  color: "white",
  cursor: "pointer",
};
const btnSecondary = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
};
const btnSecondarySmall = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
};

\`\`\`
  `,
},
{
  id: "festival_03",
  primary: false,
  title: "주문내역 확인",
  excerpt: "테이블·시간 필터와 커스텀 모달로 주문 검색/삭제를 구현했습니다.",
  date: "2025년 10월 19일",
  readTime: "2분",
  category: "프로젝트",
  tags: ["Modal", "axios"],
  series: "Festival",
  content: `

\`\`\`tsx
import React, { useEffect, useState } from "react";

const listBtnPrimary = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  background: "#111827",
  color: "white",
  cursor: "pointer",
};
const listBtnSecondary = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
};
const listBtnIconDanger = {
  border: "1px solid #f3d1d1",
  background: "#fff5f5",
  color: "#b00020",
  borderRadius: 8,
  padding: "4px 8px",
  cursor: "pointer",
};


function ListModalShell({ open, onClose, width = 680, children }) {
  if (!open) return null;
  return (
    <div
      onClick={() => onClose && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          maxWidth: "95vw",
          maxHeight: "85vh",
          overflow: "hidden",
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
}


function ListTableInputModal({ open, onClose, onSubmit }) {
  const [num, setNum] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    if (open) { setNum(""); setErr(""); }
  }, [open]);

  const submit = () => {
    const n = parseInt(num, 10);
    if (Number.isNaN(n) || n < 1 || n > 100) {
      setErr("테이블 번호는 1~100 사이의 정수여야 합니다.");
      return;
    }
    onSubmit && onSubmit(String(n));
  };

  return (
    <ListModalShell open={open} onClose={onClose} width={360}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #eee", fontWeight: 700 }}>테이블 검색</div>
      <div style={{ padding: 16 }}>
        <input
          type="number"
          placeholder="1~100"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 8 }}
        />
        <div style={{ color: "crimson", minHeight: 20, fontSize: 13, marginTop: 6 }}>{err}</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} style={listBtnSecondary}>취소</button>
          <button onClick={submit} style={listBtnPrimary}>검색</button>
        </div>
      </div>
    </ListModalShell>
  );
}


function ListDeleteConfirmModal({ open, order, onCancel, onConfirm }) {
  if (!order) return null;
  return (
    <ListModalShell open={open} onClose={onCancel} width={420}>
      <div style={{ padding: 16 }}>
        <div style={{ marginBottom: 8 }}>
          테이블 <b>{order.tableNumber}</b>번 주문을 삭제하시겠습니까?
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 8, maxHeight: 240, overflowY: "auto" }}>
          {(order.items || []).map((it, i) => (
            <div key={i} style={{ padding: "4px 2px" }}>• {it.name} - {it.quantity}개</div>
          ))}
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            총액: {Number(order.totalPrice || 0).toLocaleString()}원
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
          <button onClick={onCancel} style={listBtnSecondary}>취소</button>
          <button onClick={onConfirm} style={{ ...listBtnPrimary, background: "crimson" }}>삭제</button>
        </div>
      </div>
    </ListModalShell>
  );
}

function OrderListModal({ open, onClose, orders, setOrders }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchTable, setSearchTable] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [tableInputModalOpen, setTableInputModalOpen] = useState(false);

  const within3MinSameDate = (orderIso, hhmm) => {
    if (!hhmm) return true;
    const orderDate = new Date(orderIso);
    const [hh, mm] = hhmm.split(":").map(Number);
    if (Number.isNaN(hh) || Number.isNaN(mm)) return true;
    const now = new Date();
    const searchDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0);
    const same =
      orderDate.getFullYear() === searchDate.getFullYear() &&
      orderDate.getMonth() === searchDate.getMonth() &&
      orderDate.getDate() === searchDate.getDate();
    if (!same) return false;
    return Math.abs(orderDate.getTime() - searchDate.getTime()) <= 3 * 60 * 1000;
  };

  const filtered = orders.filter((order) => {
    const matchTable =
      searchTable === "" || String(order.tableNumber).includes(searchTable);
    const matchTime = within3MinSameDate(order.timestamp, searchTime);
    return matchTable && matchTime;
  });

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setOrders((prev) => prev.filter((o) => o.timestamp !== deleteTarget.timestamp));
    setDeleteTarget(null);
  };

  return (
    <ListModalShell open={open} onClose={onClose} width={720}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #eee" }}>
        <div style={{ fontWeight: 700 }}>전체 주문 내역</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {searchTable && (
            <div style={{ fontSize: 12, color: "#666", marginRight: 6 }}>
              현재 테이블 검색: {searchTable}
            </div>
          )}
          <button onClick={() => setTableInputModalOpen(true)} style={listBtnSecondary}>테이블 검색</button>
          <input
            type="time"
            value={searchTime}
            onChange={(e) => setSearchTime(e.target.value)}
            style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb" }}
          />
        </div>
      </div>

      <div style={{ padding: 16, overflowY: "auto" }}>
        {filtered.length === 0 ? (
          <div style={{ color: "#666" }}>주문 내역이 없습니다.</div>
        ) : (
          filtered.map((order, idx) => (
            <div key={idx} style={{ marginBottom: 12, position: "relative", borderBottom: "1px solid #f3f4f6", paddingBottom: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>
                테이블 {order.tableNumber}번 - {new Date(order.timestamp).toLocaleString()}
              </div>
              {(order.items || []).map((it, i) => (
                <div key={i} style={{ paddingLeft: 8 }}>• {it.name} - {it.quantity}개</div>
              ))}
              <div style={{ paddingLeft: 8, marginTop: 4, fontWeight: 600 }}>
                총액: {Number(order.totalPrice || 0).toLocaleString()}원
              </div>
              <button
                onClick={() => setDeleteTarget(order)}
                title="삭제"
                style={{ position: "absolute", right: 0, top: 0, ...listBtnIconDanger }}
              >
                삭제
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: 12, borderTop: "1px solid #eee" }}>
        <button onClick={onClose} style={listBtnSecondary}>닫기</button>
      </div>

      <ListDeleteConfirmModal
        open={!!deleteTarget}
        order={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
      <ListTableInputModal
        open={tableInputModalOpen}
        onClose={() => setTableInputModalOpen(false)}
        onSubmit={(tableStr) => {
          setSearchTable(String(tableStr));
          setTableInputModalOpen(false);
        }}
      />
    </ListModalShell>
  );
}

export default function OrdersDemo() {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders([
      {
        tableNumber: 1,
        items: [
          { name: "소세지야채볶음", quantity: 1, zone: "B", price: 7000, total: 7000 },
          { name: "우동", quantity: 2, zone: "B", price: 5000, total: 10000 },
        ],
        totalPrice: 17000,
        outsider: false,
        served: false,
        timestamp: new Date().toISOString(),
      },
      {
        tableNumber: 5,
        items: [
          { name: "골뱅이 소면", quantity: 1, zone: "B", price: 8000, total: 8000 },
          { name: "오뎅탕", quantity: 1, zone: "B", price: 6000, total: 6000 },
        ],
        totalPrice: 14000,
        outsider: true,
        served: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
      {
        tableNumber: 12,
        items: [
          { name: "비빔납작만두", quantity: 3, zone: "C", price: 6000, total: 18000 },
          { name: "황도", quantity: 1, zone: "C", price: 4000, total: 4000 },
        ],
        totalPrice: 22000,
        outsider: false,
        served: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
    ]);
  }, []);

  return (
    <div style={{ padding: 16, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <button onClick={() => setOpen(true)} style={listBtnPrimary}>주문내역 열기</button>

      <OrderListModal
        open={open}
        onClose={() => setOpen(false)}
        orders={orders}
        setOrders={setOrders}
      />
    </div>
  );
}

\`\`\`
  `,
},
{
  id: "festival_order_issue",
  primary: false,
  title: "축제 실시간 주문 시스템: 현장 피드백을 실시간 반영한 경험",
  excerpt: "테이블·시간 필터와 커스텀 모달로 주문 검색/삭제를 구현했습니다.",
  date: "2025년 10월 19일",
  readTime: "2분",
  category: "프로젝트",
  tags: ["Modal", "axios"],
  series: "Festival",
  content: `
# 현장 이슈를 즉시 해결한 방법 (샌드박스 비교)

아래 샌드박스는 **문제 상황**과 **해결 버전**을 나란히 보여줍니다.  
(좌: 문제 코드 · 우: 해결 코드)

---

## 1) 새 주문이 아래로 쌓여 시인성 저하

### 문제 상황
- 주문 데이터를 그대로 \`map\`으로 순차 출력 → **새 주문이 가장 아래**에 위치
- 바쁜 조리 구역에서 새 주문 확인이 늦어짐

### 해결 방법
- **최신순 정렬**로 렌더 순서를 역전
  - \`.slice().reverse()\` 를 사용하여 해결했습니다.

\`\`\`tsx
export default function App() {
  const base = [
    { id: 1, name: "우동", qty: 1, ts: Date.now() - 1000 * 60 * 2 }, 
    { id: 2, name: "소세지야채볶음", qty: 2, ts: Date.now() - 1000 * 60 * 1 }, 
  ];
  const [list, setList] = React.useState(base);
  const [tick, setTick] = React.useState(0);

  // 새 주문 시뮬레이션
  const addOrder = () => {
    const id = list.length + 1;
    const names = ["우동", "골뱅이 소면", "오뎅탕", "비빔납작만두"];
    const name = names[Math.floor(Math.random()*names.length)];
    const qty = 1 + Math.floor(Math.random()*3);
    setList(prev => [...prev, { id, name, qty, ts: Date.now() }]);
    setTick(t => t+1);
  };

  const box = { border: "1px solid #e5e7eb", borderRadius: 12, padding: 12, flex: 1, background: "#fff" };
  const head = { fontWeight: 700, marginBottom: 8 };
  const row = { padding: "8px 10px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" };

  const chronological = list;                        // 문제점!
  const newestFirst = list.slice().reverse();        // 해결방법!

  return (
    <div style={{ fontFamily: "ui-sans-serif, system-ui", padding: 16 }}>
      <h3 style={{ margin: 0, marginBottom: 12 }}>주문 정렬 이슈 - 비교</h3>
      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
        <button onClick={addOrder} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>
          새 주문 추가
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* 문제 버전 */}
        <div style={box}>
          <div style={head}>문제: 순차 출력 (새 주문이 하단으로 추가됨)</div>
          <div style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
            {chronological.map(o => (
              <div key={o.id} style={row}>
                <span>{o.name}</span>
                <span>{o.qty}개</span>
              </div>
            ))}
          </div>
        </div>

        {/* 해결 버전 */}
        <div style={box}>
          <div style={head}>해결: 최신순 출력 (새 주문이 상단으로 추가됨)</div>
          <div style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
            {newestFirst.map(o => (
              <div key={o.id} style={row}>
                <span>{o.name}</span>
                <span>{o.qty}개</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
\`\`\`


---

## 2) 재학생/외부인 가격 분리 즉시 반영

### 문제 상황
- 재학생/외부인 가격 정책이 존재하지만, **UI에서 단가가 고정**되어 금액 혼선

### 해결 방법
- 주문서 단계에 **재학생/외부인 토글** 추가
- 메뉴별 외부인 **가산 규칙**(예: 2=+4000, 1=+2000, 0=+0)을 반영해 **총액 즉시 갱신**

\`\`\`tsx
export default function App() {
  const MENU_DETAIL = { // 2:+4000, 1:+2000, 0:+0
    "소세지야채볶음":2, "통삼겹마늘간장볶음":2, "두부제육볶음":2,
    "골뱅이 소면":2, "오뎅탕":1, "비빔납작만두":1, "우동":1, "황도":1, "양념감자":0,
  };
  const items = [
    { name: "소세지야채볶음", price: 7000, qty: 1 },
    { name: "우동", price: 5000, qty: 2 },
    { name: "황도", price: 4000, qty: 1 },
  ];

  const [outsider, setOutsider] = React.useState(false);

  // (문제) 단가 고정 합계
  const wrongTotal = items.reduce((a,i)=> a + i.price * i.qty, 0);

  // (해결) 외부인 가산 반영 합계
  const rightTotal = items.reduce((a,i)=>{
    if (!outsider) return a + i.price * i.qty;
    const kind = MENU_DETAIL[i.name] ?? 0;
    const s = kind === 2 ? 4000 : kind === 1 ? 2000 : 0;
    const unit = i.price + s;
    return a + unit * i.qty;
  }, 0);

  const box = { border: "1px solid #e5e7eb", borderRadius: 12, padding: 12, flex: 1, background: "#fff" };
  const head = { fontWeight: 700, marginBottom: 8 };
  const row = { padding: "8px 10px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" };
  const pill = (active) => ({
    padding: "6px 10px", borderRadius: 999, border: "1px solid #e5e7eb",
    background: active ? "#111827" : "#fff", color: active ? "#fff" : "#111",
    cursor: "pointer"
  });

  return (
    <div style={{ fontFamily: "ui-sans-serif, system-ui", padding: 16 }}>
      <h3 style={{ margin: 0, marginBottom: 12 }}>가격 정책 반영 - 비교</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* 문제 버전 */}
        <div style={box}>
          <div style={head}>문제: 단가 고정(정책 미반영)</div>
          <div style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
            {items.map((i,idx)=>(
              <div key={idx} style={row}>
                <span>{i.name} x {i.qty}</span>
                <span>{(i.price*i.qty).toLocaleString()}원</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "right", marginTop: 8, fontWeight: 700 }}>
            합계: {wrongTotal.toLocaleString()}원
          </div>
        </div>

        {/* 해결 버전 */}
        <div style={box}>
          <div style={head}>해결: 외부인 토글 → 즉시 단가/합계 반영</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <button onClick={()=>setOutsider(false)} style={pill(!outsider)}>재학생</button>
            <button onClick={()=>setOutsider(true)} style={pill(outsider)}>외부인</button>
          </div>
          <div style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
            {items.map((i,idx)=>{
              const kind = outsider ? (MENU_DETAIL[i.name] ?? 0) : 0;
              const s = kind === 2 ? 4000 : kind === 1 ? 2000 : 0;
              const unit = i.price + s;
              return (
                <div key={idx} style={row}>
                  <span>{i.name} x {i.qty}</span>
                  <span>{(unit*i.qty).toLocaleString()}원</span>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "right", marginTop: 8, fontWeight: 700 }}>
            합계: {rightTotal.toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
}
\`\`\`


---

## 정리
- **정렬 문제**는 렌더 순서만 바꿔도 현장 혼선을 즉시 줄일 수 있었음
- **가격 정책**은 데이터 구조/로직을 약간만 확장해도 사용자 경험을 해치지 않고 반영 가능

이 경험으로, 협업은 단순 요청 처리보다 **실제 불편을 함께 해결하는 과정**임을 재확인했습니다.
    `,
}



];
