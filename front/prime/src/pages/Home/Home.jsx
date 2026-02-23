import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import S, { GlobalStyles } from './style';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const splitTextRef = useRef(null);
  const readerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!splitTextRef.current) return;

    const toSplit = splitTextRef.current;
    const content = toSplit.innerText;
    const contentLength = content.length;

    const PPC = 10; // Pixels per character
    const BUFFER = 40;

    document.documentElement.style.setProperty('--buffer', BUFFER);
    document.documentElement.style.setProperty('--ppc', PPC);
    document.documentElement.style.setProperty('--pad', 8);
    document.documentElement.style.setProperty('--content-length', contentLength + 2);

    const words = content.split(' ');
    toSplit.innerHTML = '';
    
    let cumulation = 10;
    words.forEach((word, index) => {
      const text = document.createElement('span');
      text.innerHTML = `<span>${word} </span>`;
      text.style.setProperty('--index', index);
      text.style.setProperty('--start', cumulation);
      text.style.setProperty('--end', cumulation + word.length);
      text.dataset.index = index;
      text.dataset.start = cumulation;
      text.dataset.end = cumulation + word.length;
      cumulation += word.length + 1;
      toSplit.appendChild(text);
    });

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
              trigger: readerRef.current,
              start: `top top-=${word.dataset.start * PPC}`,
              end: `top top-=${word.dataset.end * PPC}`,
              scrub: true,
            },
          }
        );
      }
    }

    // Set view-timeline for signature section
    if (sectionRef.current && CSS.supports('animation-timeline: scroll()')) {
      sectionRef.current.style.viewTimelineName = '--sign-off';
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <S.ReaderSection ref={readerRef} id="read">
        <S.Content>
          <S.SrOnly>
            With CSS, you can do way more than you think. One of the most fun CSS
            animation APIs ever. A magical way to create scroll-driven animations
            without the need to touch JavaScript. Animations run off the main
            thread. And you can choose to use View Timelines or Scroll Timelines.
          </S.SrOnly>
          <S.SplitText ref={splitTextRef} data-split aria-hidden="true">
            The little details that make your sites feel great. Combine sticky
            positioning with some scroll animation. With CSS, you can do way more
            than you think.
          </S.SplitText>
        </S.Content>
      </S.ReaderSection>
      <S.Section ref={sectionRef}>
        <S.H2>
          <span>You</span> got this.
        </S.H2>
        <S.SignatureSvg
          className="sig"
          viewBox="0 0 271 209"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <S.SignaturePath
            className="sign head"
            d="M40.3725 26.8984C58.6558 41.1564 141.659 43.1867 128.248 5.48254C127.911 4.53766 127.085 2.2403 125.938 2.0095C124.714 1.76297 121.929 6.39448 121.627 6.82375C100.965 36.1863 95.2641 73.5992 74.5923 102.644C63.7045 117.942 14.7891 145.678 5.55986 113.481C-17.5939 32.705 78.7483 76.0672 105.741 67.4678C119.757 63.0021 125.297 50.6825 132.831 39.1622C135.218 35.5126 137.628 24.6153 140.043 28.2467C144.771 35.3581 119.642 69.8761 115.559 78.4692C110.959 88.1482 129.228 46.7461 136.796 54.3333C146.229 63.7897 128.236 82.7359 153.367 61.6804C157.634 58.1059 166.582 46.4029 161.033 46.8455C153.977 47.4085 141.565 67.0198 151.685 70.0327C161.531 72.9635 176.039 38.7196 174.012 48.7901C173.009 53.769 168.343 67.3695 175.978 68.9069C186.537 71.0328 191.574 35.8659 197.537 44.8359C240.356 109.24 81.7126 283.324 50.2184 167.261C25.2159 75.1229 240.563 89.2082 268.88 137.08"
            stroke="currentColor"
            strokeWidth="4"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            style={{ '--path-speed': '2.1467741935483873' }}
          />
          <S.EarPath
            className="ear"
            d="M187.183 101.246C182.107 82.5407 155.739 77.9455 151.5 99"
            stroke="currentColor"
            strokeWidth="4"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            style={{
              '--path-speed': '0.08225806451612903',
              '--path-delay': '2.1467741935483873',
            }}
          />
          <S.EarPath
            className="ear"
            d="M117.998 100.704C117.998 91.1516 103.912 87.3662 96.5585 89.3717C84.7816 92.5836 80.6315 99.053 80.6315 110.505"
            stroke="currentColor"
            strokeWidth="4"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            style={{
              '--path-speed': '0.09193548387096774',
              '--path-delay': '2.229032258064516',
            }}
          />
          <S.EyePath
            className="eye"
            d="M170.025 108.347C168.627 105.551 162.781 110.631 165.494 114.577C168.207 118.523 173.936 114.091 171.643 109.965C171.035 108.871 168.547 107.832 167.355 108.428"
            stroke="currentColor"
            strokeWidth="4"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            style={{
              '--path-speed': '0.04516129032258064',
              '--path-delay': '2.3209677419354837',
            }}
          />
          <S.EyePath
            className="eye"
            d="M102.952 112.797C97.2672 112.797 96.7371 120.527 102.224 119.917C108.363 119.235 105.409 110.012 100.363 113.04"
            stroke="currentColor"
            strokeWidth="4"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            style={{
              '--path-speed': '0.041935483870967745',
              '--path-delay': '2.366129032258064',
            }}
          />
          <S.NosePath
            className="nose"
            d="M144.745 123.82C146.652 122.562 141.479 121.621 140.561 121.402C136.485 120.429 124.736 118.793 124.42 125.721C123.695 141.628 160.767 131.457 140.492 121.735"
            stroke="currentColor"
            strokeWidth="4"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            style={{
              '--path-speed': '0.1032258064516129',
              '--path-delay': '2.408064516129032',
            }}
          />
        </S.SignatureSvg>
      </S.Section>
      <S.Footer>jhey &copy; 2024 ʕ – ᴥ – ʔ</S.Footer>
    </>
  );
};

export default Home;
