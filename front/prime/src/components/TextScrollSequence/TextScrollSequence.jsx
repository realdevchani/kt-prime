import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import S from './style';

gsap.registerPlugin(ScrollTrigger);

/**
 * 스크롤에 따라 텍스트가 순차적으로 누적되는 컴포넌트
 * @param {string} title - 고정 제목 (한글)
 * @param {string} englishTitle - 영어 제목 (선택사항)
 * @param {string[]} texts - 순차적으로 나타날 텍스트 배열
 * @param {string} sectionId - 섹션 ID
 */
const TextScrollSequence = ({
  title,
  englishTitle,
  texts = [],
  sectionId = 'text-sequence',
}) => {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (!containerRef.current || texts.length === 0) return;

    const container = containerRef.current;
    let triggers = [];

    const setup = () => {
      triggers.forEach(t => t.kill());
      triggers = [];

      const vh = window.innerHeight;
      const scrollPerItem = vh * 0.8;
      const lastItemHeight = vh * 1.2;
      const sectionHeight = (texts.length - 1) * scrollPerItem + lastItemHeight;
      container.style.height = `${sectionHeight}px`;

      // 초기 상태: 모두 숨김
      itemRefs.current.forEach(el => {
        if (el) gsap.set(el, { opacity: 0, y: 20 });
      });

      texts.forEach((_, index) => {
        const startOffset = index * scrollPerItem;

        const trigger = ScrollTrigger.create({
          trigger: container,
          start: `top top-=${startOffset + scrollPerItem * 0.2}`,
          onEnter: () => {
            if (itemRefs.current[index]) {
              gsap.to(itemRefs.current[index], {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
              });
            }
          },
          onEnterBack: () => {
            // 역스크롤 시 해당 항목 이후는 다시 숨김
            for (let i = index + 1; i < texts.length; i++) {
              if (itemRefs.current[i]) {
                gsap.to(itemRefs.current[i], {
                  opacity: 0,
                  y: 20,
                  duration: 0.3,
                });
              }
            }
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
        <S.ItemList>
          {texts.map((text, index) => (
            <S.SequenceItem
              key={index}
              ref={el => (itemRefs.current[index] = el)}
            >
              {text}
            </S.SequenceItem>
          ))}
        </S.ItemList>
      </S.SequenceContent>
    </S.SequenceSection>
  );
};

export default TextScrollSequence;
