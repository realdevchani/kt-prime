import React, { useRef } from 'react';
import TextScrollSequence from 'components/TextScrollSequence/TextScrollSequence';
import S from './style';

const CompanyHistorySection = () => {
  const sectionRef = useRef(null);

  const historyTexts = [
    "2023년 6월 브니엘 설립 및 신사역점 오픈",
    "2024년 6월  K-Start 2기 대상점 선정",
    "2025년 2월  2000 가입자 달성",
    "2025년 5월  사업자명 변경 프라임 KT 대리점 개설",
    "2025년 7월  KT프라임 잠실점 2호점 오픈",
    "2025년 12월  KT프라임 양재점 3호점 오픈",
    "2025년 12월  강남지사 우수대리점 시상"
  ];

  return (
    <S.Section ref={sectionRef}>
      <TextScrollSequence
        englishTitle="Company History"
        title="회사 연혁"
        texts={historyTexts}
        sectionId="company-history"
      />
    </S.Section>
  );
};

export default CompanyHistorySection;
