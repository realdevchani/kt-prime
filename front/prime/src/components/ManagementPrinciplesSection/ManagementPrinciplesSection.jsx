import React from 'react';
import TextScrollAnimation from 'components/TextScrollAnimation/TextScrollAnimation';

const ManagementPrinciplesSection = () => {
  return (
    <TextScrollAnimation
      englishTitle="Management Principles"
      title="경영원칙"
      text="정도(正道) 경영과 10년의 노하우 1만 시간의 법칙으로 고객 신뢰와 만족을 실현하는 KT 프라임 입니다."
      sectionId="read"
      backgroundColor="#1a1a1a"
      PPC={10}
      BUFFER={40}
    />
  );
};

export default ManagementPrinciplesSection;
