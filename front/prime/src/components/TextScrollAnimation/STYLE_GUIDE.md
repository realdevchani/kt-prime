# TextScrollAnimation 스타일 가이드

이 문서는 `TextScrollAnimation` 컴포넌트의 CSS 구조와 커스터마이징 방법을 설명합니다.

## 📁 파일 구조

```
src/
├── components/
│   └── TextScrollAnimation/
│       ├── TextScrollAnimation.jsx  # 메인 컴포넌트
│       ├── style.js                 # 스타일 정의
│       └── STYLE_GUIDE.md           # 이 문서
├── pages/
│   └── Home/
│       └── style.js                 # 전역 스타일 (GlobalStyles)
└── styles/
    └── theme.js                      # 테마 변수
```

## 🎨 스타일 컴포넌트 구조

### 1. `S.ReaderSection` (최상위 섹션)

**위치**: `src/components/TextScrollAnimation/style.js`

**역할**: 텍스트 애니메이션 섹션의 컨테이너

**주요 스타일**:
```css
--thick: 0px;                    /* 아웃라인 두께 (현재 숨김) */
outline: var(--thick) dashed var(--accent);  /* 점선 아웃라인 */
height: calc(...);                /* 동적 높이 계산 */
```

**수정 방법**:
- 아웃라인을 보이게 하려면: `--thick: 2px;` (style.js의 7번째 줄)
- 아웃라인 색상 변경: `--accent` 변수 수정 (GlobalStyles에서)
- 섹션 높이 조정: `height` 속성 수정

**예시**:
```javascript
S.ReaderSection = styled.section`
  --thick: 2px;  // 아웃라인 보이기
  outline: var(--thick) dashed var(--accent);
  // ... 나머지 스타일
`;
```

---

### 2. `S.Content` (내용 컨테이너)

**위치**: `src/components/TextScrollAnimation/style.js`

**역할**: 텍스트와 제목을 감싸는 컨테이너, 화면 중앙 정렬

**주요 스타일**:
```css
position: sticky;           /* 스크롤 시 고정 */
top: 0;                    /* 상단 고정 위치 */
min-height: 100vh;         /* 최소 높이 (화면 전체) */
gap: 24px;                 /* 제목과 텍스트 사이 간격 */
width: 100ch;              /* 최대 너비 (100자) */
max-width: calc(100% - 4rem);  /* 반응형 최대 너비 */
display: flex;             /* Flexbox 레이아웃 */
flex-direction: column;    /* 세로 방향 */
justify-content: center;   /* 수직 중앙 정렬 */
align-items: center;       /* 수평 중앙 정렬 */
```

**수정 방법**:
- 간격 조정: `gap: 24px;` → `gap: 32px;` (23번째 줄)
- 너비 조정: `width: 100ch;` → `width: 80ch;` (24번째 줄)
- 패딩 조정: `padding: 2rem 0;` → `padding: 3rem 0;` (25번째 줄)

**제목 스타일 (`p` 태그)**:
```css
font-size: var(--font-size);  /* 전역 폰트 사이즈 */
font-weight: 600;             /* 굵기 */
color: #ffffff;               /* 색상 */
line-height: 1.2;             /* 줄 간격 */
text-align: center;           /* 중앙 정렬 */
margin: 0;                    /* 마진 제거 */
```

**예시**:
```javascript
S.Content = styled.div`
  gap: 32px;  // 간격 늘리기
  width: 80ch;  // 너비 줄이기
  padding: 3rem 0;  // 패딩 늘리기
  
  p {
    font-size: var(--font-size);
    font-weight: 700;  // 더 굵게
    color: #ff6b6b;  // 빨간색으로 변경
  }
`;
```

---

### 3. `S.SplitText` (애니메이션 텍스트)

**위치**: `src/components/TextScrollAnimation/style.js`

**역할**: 단어별로 분리된 텍스트의 스타일

**주요 스타일**:
```css
font-size: var(--font-size);    /* clamp(2rem, 8vmin + 1rem, 4rem) */
font-weight: 600;               /* 굵기 */
color: #ffffff;                 /* 텍스트 색상 */
line-height: 1.2;               /* 줄 간격 */
text-align: center;             /* 중앙 정렬 */
width: 100%;                    /* 전체 너비 */
```

**동적 span 요소 (`> span`)**:
```css
--active: 0;                    /* 애니메이션 상태 (0 또는 1) */
opacity: calc(var(--base, 0.4) + var(--active, 0));  /* 투명도 */
transition: opacity 0.5s;       /* 전환 효과 */
display: inline-block;          /* 인라인 블록 */
color: #ffffff;                 /* 색상 */
```

**수정 방법**:
- 폰트 사이즈: `font-size: var(--font-size);` → `font-size: 3rem;` (45번째 줄)
- 폰트 굵기: `font-weight: 600;` → `font-weight: 700;` (46번째 줄)
- 텍스트 색상: `color: #ffffff;` → `color: #ff6b6b;` (47번째 줄)
- 초기 투명도: `--base` 변수 수정 (GlobalStyles에서)
- 전환 속도: `transition: opacity 0.5s;` → `transition: opacity 0.3s;` (56번째 줄)

**예시**:
```javascript
S.SplitText = styled.div`
  font-size: 3rem;  // 고정 사이즈
  font-weight: 700;  // 더 굵게
  color: #ff6b6b;  // 빨간색
  
  > span {
    transition: opacity 0.3s;  // 더 빠른 전환
  }
`;
```

---

## 🌐 전역 스타일 (GlobalStyles)

**위치**: `src/pages/Home/style.js`

### CSS 변수

```css
:root {
  --font-size: clamp(2rem, 8vmin + 1rem, 4rem);  /* 반응형 폰트 사이즈 */
  --line: color-mix(in lch, canvasText 15%, transparent);  /* 점선 색상 */
  --base: 0.4;                                    /* 초기 투명도 */
  --accent: hsl(8 100% 55%);                      /* 강조 색상 (빨간색) */
  --header-height: 100vh;                        /* 헤더 높이 */
  --overlay: color-mix(in lch, canvas 70%, transparent);  /* 오버레이 */
}
```

**수정 방법**:
- 폰트 사이즈: `--font-size` 값 변경 (7번째 줄)
- 초기 투명도: `--base: 0.4;` → `--base: 0.6;` (9번째 줄)
- 강조 색상: `--accent: hsl(8 100% 55%);` → `--accent: #00d674;` (10번째 줄)

---

## 🎨 배경 스타일 수정

### 1. 점선 그리드 배경

**위치**: `src/pages/Home/style.js` (32-51번째 줄)

**현재 설정**:
```css
body::before {
  --size: 60px;                    /* 그리드 크기 */
  background: linear-gradient(...); /* 점선 패턴 */
  mask: linear-gradient(-15deg, transparent 40%, white);  /* 마스크 */
}
```

**수정 방법**:

#### 그리드 크기 변경
```javascript
body::before {
  --size: 80px;  // 더 큰 그리드
  // 또는
  --size: 40px;  // 더 작은 그리드
}
```

#### 점선 색상 변경
```javascript
:root {
  --line: color-mix(in lch, canvasText 30%, transparent);  // 더 진하게
  // 또는
  --line: rgba(255, 255, 255, 0.1);  // 직접 색상 지정
}
```

#### 마스크 각도 변경
```javascript
body::before {
  mask: linear-gradient(-30deg, transparent 40%, white);  // 각도 변경
  // 또는
  mask: linear-gradient(0deg, transparent 50%, white);  // 수평
}
```

#### 그리드 패턴 제거
```javascript
body::before {
  display: none;  // 완전히 숨기기
}
```

---

### 2. 배경 색상

**위치**: `src/pages/Home/style.js` (16-19번째 줄)

**현재 설정**:
```css
body {
  background: #1a1a1a;  /* 어두운 회색 */
  color: #ffffff;        /* 텍스트 색상 */
}
```

**수정 방법**:

#### 밝은 배경
```javascript
body {
  background: #2a2a2a;  // 조금 더 밝게
  // 또는
  background: #f5f5f5;  // 매우 밝게
  color: #000000;  // 텍스트도 검은색으로
}
```

#### 색상 테마
```javascript
body {
  background: #1e3a5f;  // 파란색 계열
  // 또는
  background: #2d1b3d;  // 보라색 계열
  // 또는
  background: #1a2e1a;  // 초록색 계열
}
```

#### 그라데이션 배경
```javascript
body {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  // 또는
  background: linear-gradient(to bottom, #1a1a2e, #16213e);
}
```

---

## 🎯 커스터마이징 예시

### 예시 1: 더 밝은 배경과 큰 폰트

```javascript
// src/pages/Home/style.js
body {
  background: #2a2a2a;  // 더 밝은 배경
}

:root {
  --font-size: clamp(2.5rem, 10vmin + 1rem, 5rem);  // 더 큰 폰트
  --base: 0.6;  // 더 밝은 초기 투명도
}
```

### 예시 2: 색상 테마 변경

```javascript
// src/pages/Home/style.js
:root {
  --accent: #00d674;  // 초록색 강조
}

body {
  background: #1a2e1a;  // 어두운 초록 배경
}

// src/components/TextScrollAnimation/style.js
S.SplitText = styled.div`
  color: #00d674;  // 초록색 텍스트
`;
```

### 예시 3: 그리드 패턴 커스터마이징

```javascript
// src/pages/Home/style.js
:root {
  --line: rgba(255, 255, 255, 0.15);  // 더 진한 점선
}

body::before {
  --size: 80px;  // 더 큰 그리드
  mask: linear-gradient(-20deg, transparent 30%, white);  // 다른 각도
}
```

---

## 📝 주요 수정 포인트 요약

| 수정 항목 | 파일 위치 | 줄 번호 | 설명 |
|---------|----------|--------|------|
| 배경 색상 | `pages/Home/style.js` | 17 | `body { background: ... }` |
| 폰트 사이즈 | `pages/Home/style.js` | 7 | `--font-size: ...` |
| 텍스트 색상 | `components/TextScrollAnimation/style.js` | 47 | `S.SplitText`의 `color` |
| 초기 투명도 | `pages/Home/style.js` | 9 | `--base: ...` |
| 그리드 크기 | `pages/Home/style.js` | 33 | `--size: ...` |
| 점선 색상 | `pages/Home/style.js` | 8 | `--line: ...` |
| 간격 조정 | `components/TextScrollAnimation/style.js` | 23 | `gap: ...` |
| 컨테이너 너비 | `components/TextScrollAnimation/style.js` | 24 | `width: ...` |

---

## 🔍 디버깅 팁

1. **스타일이 적용되지 않을 때**:
   - 브라우저 개발자 도구에서 해당 요소 선택
   - Computed 탭에서 실제 적용된 스타일 확인
   - CSS 변수가 제대로 전달되는지 확인

2. **애니메이션이 작동하지 않을 때**:
   - `--ppc`, `--content-length` 변수가 설정되었는지 확인
   - `data-split` 속성이 있는지 확인
   - 브라우저가 CSS animation-timeline을 지원하는지 확인

3. **배경이 보이지 않을 때**:
   - `body::before`의 `z-index: -1` 확인
   - `pointer-events: none` 확인
   - 마스크가 너무 강하게 적용되었는지 확인

---

## 📚 참고 자료

- [CSS Custom Properties (Variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Animation Timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)
- [Styled Components](https://styled-components.com/docs)
