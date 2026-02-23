import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import S from './style';

gsap.registerPlugin(ScrollTrigger);

/**
 * 스크롤에 따라 텍스트를 순차적으로 교체하는 컴포넌트
 * @param {string} title - 고정 제목 (한글)
 * @param {string} englishTitle - 영어 제목 (선택사항)
 * @param {string[]} texts - 교체될 텍스트 배열
 * @param {string} sectionId - 섹션 ID
 */
const TextScrollSequence = ({
  title,
  englishTitle,
  texts = [],
  sectionId = 'text-sequence',
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || texts.length === 0) return;

    const container = containerRef.current;
    const textElement = textRef.current;
    let triggers = [];

    // 초기 텍스트 설정
    textElement.textContent = texts[0];
    gsap.set(textElement, { opacity: 1 });

    const setup = () => {
      triggers.forEach(t => t.kill());
      triggers = [];

      // window.innerHeight(px) 기준으로 계산 → vh보다 정확하고 모바일 안전
      const vh = window.innerHeight;
      const textHeight = vh * 0.8;        // 텍스트 1개당 0.8 화면 높이
      const lastTextHeight = vh * 1.2;    // 마지막 텍스트는 1.2 화면 높이 (충분히 보이도록)

      const sectionHeight = (texts.length - 1) * textHeight + lastTextHeight;
      container.style.height = `${sectionHeight}px`;

      texts.forEach((text, index) => {
        const isLast = index === texts.length - 1;
        const startOffset = index * textHeight;
        const endOffset = isLast ? sectionHeight : (index + 1) * textHeight;

        const showStart = startOffset + textHeight * 0.15;
        const showEnd = isLast ? sectionHeight - vh * 0.2 : endOffset - textHeight * 0.15;

        const trigger = ScrollTrigger.create({
          trigger: container,
          start: `top top-=${showStart}`,
          end: `top top-=${showEnd}`,
          scrub: 1,
          onEnter: () => {
            if (textElement.textContent !== text) {
              gsap.to(textElement, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                  textElement.textContent = text;
                  gsap.to(textElement, { opacity: 1, duration: 0.4 });
                },
              });
            } else {
              gsap.to(textElement, { opacity: 1, duration: 0.4 });
            }
          },
          onEnterBack: () => {
            if (textElement.textContent !== text) {
              gsap.to(textElement, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                  textElement.textContent = text;
                  gsap.to(textElement, { opacity: 1, duration: 0.4 });
                },
              });
            } else {
              gsap.to(textElement, { opacity: 1, duration: 0.4 });
            }
          },
          onLeave: () => {
            gsap.to(textElement, { opacity: 0, duration: 0.3 });
          },
          onLeaveBack: () => {
            gsap.to(textElement, { opacity: 0, duration: 0.3 });
          },
        });

        triggers.push(trigger);
      });
    };

    setup();
    window.addEventListener('resize', setup);

    return () => {
      triggers.forEach(t => t.kill());
      window.removeEventListener('resize', setup);
    };
  }, [texts]);

  return (
    <S.SequenceSection ref={containerRef} id={sectionId}>
      <S.SequenceContent>
        {englishTitle && <S.EnglishTitle>{englishTitle}</S.EnglishTitle>}
        <S.SequenceText ref={textRef}>
          {texts.length > 0 ? texts[0] : ''}
        </S.SequenceText>
      </S.SequenceContent>
    </S.SequenceSection>
  );
};

export default TextScrollSequence;
