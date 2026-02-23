import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import S from './style';

gsap.registerPlugin(ScrollTrigger);

const CoreValueSection = () => {
  const coreValueRef = useRef(null);
  const valueCardsRef = useRef([]);

  const coreValues = [
    {
      title: "통합 고객 서비스",
      description: "우리는 CS 업무와 판매 업무를 나누지 않습니다.\n한 사람이 한 고객을 처음부터 끝까지 책임지고 응대합니다.\nCS 업무를 하며 고객과 대화하며 고객의 수요를 파악한 영업방식을 선택합니다."
    },
    {
      title: "지속적인 성장",
      description: "우리는 '이 정도' 에서 만족하지 않습니다.\n당장에 들어오는 고객과 수익실현보다 더 많은 고객 유치에 힘을 쏟습니다."
    },
    {
      title: "차별화된 노하우",
      description: "어느 누구도 쉽게 할 수 있는 일을 누구도 따라오지 못 할 지표 달성률의 노하우를 갖고 있습니다."
    },
    {
      title: "열린 소통과 혁신",
      description: "각 지점 점장부터 신입 직원까지 열린 소통을 하여 빠르게 변화하는 통신 시장에서\n변화를 따라가는 것이 아닌 변화를 주도하는 KT 프라임입니다."
    }
  ];

  useEffect(() => {
    if (!coreValueRef.current || valueCardsRef.current.length === 0) return;

    const cards = valueCardsRef.current;
    const triggers = [];

    cards.forEach((card) => {
      if (!card) return;

      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
          );
        },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <S.CoreValueSection ref={coreValueRef} id="core-value">
      <S.CoreValueTitle>Core Value</S.CoreValueTitle>
      <S.CoreValueGrid>
        {coreValues.map((value, index) => (
          <S.CoreValueCard
            key={index}
            ref={el => (valueCardsRef.current[index] = el)}
          >
            <S.CoreValueCardTitle>{value.title}</S.CoreValueCardTitle>
            <S.CoreValueCardDescription>
              {value.description.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < value.description.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </S.CoreValueCardDescription>
          </S.CoreValueCard>
        ))}
      </S.CoreValueGrid>
    </S.CoreValueSection>
  );
};

export default CoreValueSection;
