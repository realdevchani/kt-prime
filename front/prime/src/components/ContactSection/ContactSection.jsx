import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import S from './style';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const contactRef = useRef(null);
  const cardRefs = useRef([]);
  const mapRefs = useRef([]);

  const branches = [
    {
      name: "잠실점",
      address: "서울 송파구 올림픽로35길 112",
      fullAddress: "서울특별시 송파구 올림픽로35길 112",
      phone: "02-419-3010",
      hours: "평일/주말 10:00~19:00",
    },
    {
      name: "양재점",
      address: "서울 서초구 마방로10길 33",
      fullAddress: "서울특별시 서초구 마방로10길 33",
      phone: "02-515-3258",
      hours: "평일/주말 10:00~19:00",
    },
    {
      name: "신사역점",
      address: "서울 강남구 도산대로 116 1층",
      fullAddress: "서울특별시 강남구 도산대로 116",
      phone: "02-541-2296",
      hours: "평일/주말 10:00~19:00",
    }
  ];

  // 카카오맵 API 스크립트 동적 로드
  useEffect(() => {
    const apiKey = process.env.REACT_APP_KAKAO_JS_KEY;
    
    console.log('=== 카카오맵 API 키 확인 ===');
    console.log('환경변수 로드:', apiKey ? '성공' : '실패');
    console.log('API 키 (전체):', apiKey);
    console.log('API 키 길이:', apiKey ? apiKey.length : 0);
    
    if (!apiKey) {
      console.error('카카오맵 API 키가 설정되지 않았습니다. .env 파일에 REACT_APP_KAKAO_JS_KEY를 설정해주세요.');
      return;
    }

    // 이미 로드되어 있는지 확인
    if (window.kakao && window.kakao.maps) {
      console.log('카카오맵 API가 이미 로드되어 있습니다.');
      return;
    }

    // 스크립트가 이미 추가되어 있는지 확인
    const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
    if (existingScript) {
      console.log('카카오맵 스크립트가 이미 추가되어 있습니다.');
      return;
    }

    // 카카오맵 API 스크립트 동적 로드 (autoload=false → kakao.maps.load() 콜백 후 사용 가능)
    const script = document.createElement('script');
    script.type = 'text/javascript';
    const scriptUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
    script.src = scriptUrl;
    script.async = true;
    
    console.log('스크립트 로드 시도:', scriptUrl);
    
    script.onload = () => {
      console.log('✅ 카카오맵 API 로드 완료');
      if (window.kakao && window.kakao.maps) {
        console.log('✅ 카카오맵 객체 확인:', window.kakao.maps);
        console.log('✅ onloadcallbacks 배열 길이:', window.kakao.maps.onloadcallbacks?.length || 0, '(비어있어도 정상입니다)');
        console.log('✅ readyState:', window.kakao.maps.readyState, '(2 = 로드 완료)');
        console.log('✅ services 확인:', window.kakao.maps.services ? '있음' : '없음');
      } else {
        console.error('❌ 카카오맵 객체가 없습니다.');
      }
    };
    
    script.onerror = (error) => {
      console.error('❌ 카카오맵 API 로드 실패 (401 에러 = 인증 실패)');
      console.error('에러 상세:', error);
      console.error('사용된 API 키:', apiKey);
      console.error('스크립트 URL:', scriptUrl);
      console.error('');
      console.error('=== 401 에러 추가 확인 사항 ===');
      console.error('1. 카카오 개발자 콘솔 → 내 애플리케이션 → 앱 설정 → 앱 키');
      console.error('   → JavaScript 키를 다시 복사해서 .env 파일에 넣어보세요');
      console.error('2. 플랫폼 설정 확인:');
      console.error('   - Web 플랫폼이 등록되어 있는지');
      console.error('   - 사이트 도메인에 정확히 "http://localhost:3000" (따옴표 없이)');
      console.error('3. 제품 설정 → 카카오맵 → 활성화 상태 확인');
      console.error('4. 브라우저 캐시 삭제 후 재시도');
      console.error('5. 다른 브라우저에서 테스트');
      console.error('');
      console.error('=== 테스트용 URL ===');
      console.error('브라우저에서 직접 열어보세요:', scriptUrl);
    };

    document.head.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거하지 않음 (다른 곳에서도 사용 가능)
    };
  }, []);

  // 카드 내부 지도 초기화
  useEffect(() => {
    const apiKey = process.env.REACT_APP_KAKAO_JS_KEY;
    if (!apiKey) return;

    const initializedFlags = new Array(branches.length).fill(false);

    const initSingleMap = (branch, index) => {
      if (initializedFlags[index]) return;
      const mapContainer = mapRefs.current[index];
      if (!mapContainer || !window.kakao || !window.kakao.maps) return;

      initializedFlags[index] = true;
      const { kakao } = window;

      // Geocoder로 fullAddress → 정확한 좌표 변환 (하드코딩 오차 없음)
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(branch.fullAddress, (result, status) => {
        if (status !== kakao.maps.services.Status.OK || result.length === 0) {
          console.error(`${branch.name} 주소 검색 실패:`, status);
          return;
        }
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const map = new kakao.maps.Map(mapContainer, { center: coords, level: 3 });
        new kakao.maps.Marker({ position: coords }).setMap(map);
        requestAnimationFrame(() => map.relayout());
      });
    };

    // kakao.maps.load() 콜백 안에서만 API 생성자 사용 가능
    // 스크립트가 아직 없으면 로드 완료 후, 이미 있으면 바로 load() 호출
    const runAfterKakaoReady = (cb) => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(cb);
        return;
      }
      const timer = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(timer);
          window.kakao.maps.load(cb);
        }
      }, 100);
    };

    const observers = [];

    runAfterKakaoReady(() => {
      branches.forEach((branch, index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              // 카드가 뷰포트에 들어온 뒤 GSAP 애니메이션(0.7s) 끝날 시간 확보
              setTimeout(() => initSingleMap(branch, index), 800);
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(card);
        observers.push(observer);
      });
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);


  // 스크롤 애니메이션
  useEffect(() => {
    if (!contactRef.current || cardRefs.current.length === 0) return;

    const cards = cardRefs.current;
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

  const handleCardClick = (branch) => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // 모바일: 전화걸기 / 연락처 복사
      const action = window.confirm(
        `${branch.name}\n\n확인: 전화걸기\n취소: 연락처 복사`
      );

      if (action) {
        // 확인: 전화걸기
        window.location.href = `tel:${branch.phone.replace(/-/g, '')}`;
      } else {
        // 취소: 연락처 복사
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(branch.phone).then(() => {
            alert('연락처가 클립보드에 복사되었습니다.');
          }).catch(() => {
            // 클립보드 API 실패 시 fallback
            const textArea = document.createElement('textarea');
            textArea.value = branch.phone;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            try {
              document.execCommand('copy');
              alert('연락처가 클립보드에 복사되었습니다.');
            } catch (err) {
              alert('연락처 복사에 실패했습니다.');
            }
            document.body.removeChild(textArea);
          });
        } else {
          // 클립보드 API 미지원 시 fallback
          const textArea = document.createElement('textarea');
          textArea.value = branch.phone;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            alert('연락처가 클립보드에 복사되었습니다.');
          } catch (err) {
            alert('연락처 복사에 실패했습니다.');
          }
          document.body.removeChild(textArea);
        }
      }
    } else {
      // 데스크탑: 카카오맵으로 보기
      const confirmed = window.confirm(
        `${branch.name}의 위치를 카카오맵에서 보시겠습니까?`
      );

      if (confirmed) {
        // 카카오맵 링크 생성 (주소 검색)
        const encodedAddress = encodeURIComponent(branch.fullAddress);
        window.open(`https://map.kakao.com/link/search/${encodedAddress}`, '_blank');
      }
    }
  };

  const handleRecruitClick = () => {
    window.location.href = '/recruiting';
  };

  return (
    <S.ContactSection ref={contactRef} id="contact">
      <S.ContactTitle>Contact</S.ContactTitle>
      <S.ContactGrid>
        {branches.map((branch, index) => (
          <S.ContactCard
            key={index}
            ref={el => (cardRefs.current[index] = el)}
            onClick={() => handleCardClick(branch)}
          >
            <S.ContactCardName>{branch.name}</S.ContactCardName>
            <S.ContactCardInfo>
              <S.ContactCardItem>
                <S.ContactCardLabel>주소</S.ContactCardLabel>
                <S.ContactCardValue>{branch.address}</S.ContactCardValue>
              </S.ContactCardItem>
              <S.ContactCardItem>
                <S.ContactCardLabel>연락처</S.ContactCardLabel>
                <S.ContactCardValue>
                  <S.ContactPhone 
                    href={`tel:${branch.phone.replace(/-/g, '')}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {branch.phone}
                  </S.ContactPhone>
                </S.ContactCardValue>
              </S.ContactCardItem>
              <S.ContactCardItem>
                <S.ContactCardLabel>운영시간</S.ContactCardLabel>
                <S.ContactCardValue>{branch.hours}</S.ContactCardValue>
              </S.ContactCardItem>
            </S.ContactCardInfo>
            <S.MapContainer
              ref={el => (mapRefs.current[index] = el)}
              id={`map-${index}`}
            />
          </S.ContactCard>
        ))}
      </S.ContactGrid>
      
      <S.RecruitingSection>
        <S.RecruitingTitle>Recruiting</S.RecruitingTitle>
        <S.RecruitingSubtitle>KT 프라임과 함께 성장할 동료를 찾습니다.</S.RecruitingSubtitle>
        <S.RecruitingButton onClick={handleRecruitClick} className="btn-4">
          <span>지원하기</span>
        </S.RecruitingButton>
      </S.RecruitingSection>
    </S.ContactSection>
  );
};

export default ContactSection;
