import React, { useEffect, useRef } from 'react';
import { initTextScrollAnimation } from 'utils/textScrollAnimation';
import S from './style';

/**
 * 텍스트 스크롤 애니메이션 컴포넌트
 * @param {string} text - 애니메이션할 텍스트
 * @param {string} title - 제목 (선택사항)
 * @param {string} englishTitle - 영어 제목 (선택사항)
 * @param {string} sectionId - 섹션 ID (기본값: 'read')
 * @param {number} PPC - Pixels per character (기본값: 10)
 * @param {number} BUFFER - 버퍼 값 (기본값: 40)
 */
const TextScrollAnimation = ({
  text,
  title,
  englishTitle,
  sectionId = 'read',
  PPC = 10,
  BUFFER = 40,
}) => {
  const splitTextRef = useRef(null);
  const readerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const cleanup = initTextScrollAnimation(
      {
        splitTextRef,
        readerRef,
        sectionRef,
      },
      PPC,
      BUFFER
    );

    return cleanup || (() => {});
  }, [PPC, BUFFER, text]);

  return (
    <S.ReaderSection 
      ref={readerRef} 
      id={sectionId}
    >
      <S.Content>
        {englishTitle && <S.EnglishTitle>{englishTitle}</S.EnglishTitle>}
        <S.SplitText ref={splitTextRef} data-split aria-hidden="true">
          {text}
        </S.SplitText>
      </S.Content>
    </S.ReaderSection>
  );
};

export default TextScrollAnimation;
