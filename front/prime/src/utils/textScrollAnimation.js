import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * 텍스트를 단어 단위로 분리하고 span 요소를 생성합니다.
 * @param {HTMLElement} toSplit - 텍스트를 분리할 요소
 * @param {number} PPC - Pixels per character
 * @param {number} BUFFER - 버퍼 값
 * @returns {HTMLElement[]} 생성된 span 요소들의 배열
 */
export const splitTextIntoWords = (toSplit, PPC = 10, BUFFER = 40) => {
  if (!toSplit) return [];

  const content = toSplit.innerText;
  const contentLength = content.length;

  // CSS 변수 설정
  document.documentElement.style.setProperty('--buffer', BUFFER);
  document.documentElement.style.setProperty('--ppc', PPC);
  document.documentElement.style.setProperty('--pad', 8);
  document.documentElement.style.setProperty('--content-length', contentLength + 2);

  const words = content.split(' ');
  toSplit.innerHTML = '';

  let cumulation = 10;
  const createdSpans = [];

  words.forEach((word, index) => {
    const text = document.createElement('span');
    // 공백을 &nbsp;로 변경하여 확실하게 표시
    text.innerHTML = `<span>${word}&nbsp;</span>`;
    text.style.setProperty('--index', index);
    text.style.setProperty('--start', cumulation);
    text.style.setProperty('--end', cumulation + word.length);
    text.style.setProperty('--active', '0'); // 초기값 설정
    text.dataset.index = index;
    text.dataset.start = cumulation;
    text.dataset.end = cumulation + word.length;
    cumulation += word.length + 1;
    toSplit.appendChild(text);
    createdSpans.push(text);
  });

  return createdSpans;
};

/**
 * GSAP ScrollTrigger를 사용하여 단어 애니메이션을 설정합니다.
 * @param {HTMLElement} toSplit - 텍스트가 분리된 요소
 * @param {HTMLElement} trigger - ScrollTrigger의 trigger 요소
 * @param {number} PPC - Pixels per character
 */
export const setupGSAPAnimations = (toSplit, trigger, PPC = 10) => {
  if (!toSplit || !trigger) return;

  // GSAP ScrollTrigger fallback for browsers that don't support CSS animation-timeline
  if (!CSS.supports('animation-timeline: scroll()')) {
    // Animate the words
    for (const word of toSplit.children) {
      gsap.fromTo(
        word,
        {
          '--active': 0,
        },
        {
          '--active': 1,
          ease: 'steps(1)',
          scrollTrigger: {
            trigger: trigger,
            start: `top top-=${word.dataset.start * PPC}`,
            end: `top top-=${word.dataset.end * PPC}`,
            scrub: true,
          },
        }
      );
    }
  }
};

/**
 * View timeline을 설정합니다.
 * @param {HTMLElement} sectionElement - view-timeline을 설정할 섹션 요소
 */
export const setupViewTimeline = (sectionElement) => {
  if (sectionElement && CSS.supports('animation-timeline: scroll()')) {
    sectionElement.style.viewTimelineName = '--sign-off';
  }
};

/**
 * ScrollTrigger를 정리합니다.
 */
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

/**
 * 텍스트 스크롤 애니메이션을 초기화하는 메인 함수
 * @param {Object} refs - ref 객체들
 * @param {React.RefObject} refs.splitTextRef - 텍스트를 분리할 요소의 ref
 * @param {React.RefObject} refs.readerRef - ScrollTrigger의 trigger 요소의 ref
 * @param {React.RefObject} refs.sectionRef - view-timeline을 설정할 섹션 요소의 ref
 * @param {number} PPC - Pixels per character (기본값: 10)
 * @param {number} BUFFER - 버퍼 값 (기본값: 40)
 * @returns {Function} cleanup 함수
 */
export const initTextScrollAnimation = (refs, PPC = 10, BUFFER = 40) => {
  const { splitTextRef, readerRef, sectionRef } = refs;

  if (!splitTextRef?.current) return () => {};

  const toSplit = splitTextRef.current;
  
  // 텍스트를 단어로 분리
  splitTextIntoWords(toSplit, PPC, BUFFER);

  // GSAP 애니메이션 설정
  setupGSAPAnimations(toSplit, readerRef?.current, PPC);

  // View timeline 설정
  setupViewTimeline(sectionRef?.current);

  // Cleanup 함수 반환
  return cleanupScrollTriggers;
};
