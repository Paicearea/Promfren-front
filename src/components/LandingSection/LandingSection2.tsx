import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as LandingSection2ImgSVG } from "../../assets/images/LandingSection2Img.svg";
import circleImageURL from "../../assets/images/LandingSection2Circle.svg";

export default function LandingSection2() {
  useEffect(() => {
    const characters = document.querySelectorAll(".character");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    characters.forEach((character) => {
      observer.observe(character);
    });

    return () => {
      characters.forEach((character) => {
        observer.unobserve(character);
      });
    };
  }, []);

  return (
    <Container>
      <Div405>
        <Div405Title>프롬프트?</Div405Title>
        <Div405Stroke />
        <Div405Content>
          AI가 최상의 답을 할 수 있도록 훈련 시키고 AI로
          <br />
          부터 최상의 답을 이끌어내는 도구
        </Div405Content>
      </Div405>
      <Title>
        <TitleSpan>
          <Character className="character">프</Character>
          <Character className="character">롬</Character>
          <Character className="character">프</Character>
          <Character className="character">렌</Character>
        </TitleSpan>
        은 효과적인
        <TitleSpan>AI 사용</TitleSpan>을 도와줍니다
      </Title>
      <SubTitle>
        방대한 양의 데이터를 학습한 생성형 AI는 자율적인 판단없이 지시한대로
        결과물을 출<br />
        력하기 때문에 프롬프트를 개발할 때 정교한 구성이 필요합니다.
      </SubTitle>
      <BottomText>프롬프트는 프롬프렌과 함께 작성해보세요.</BottomText>
      <Image />
    </Container>
  );
}

const Container = styled.section`
  max-width: 100%;
  height: 100vh;
  text-align: center;
  margin: 0 auto;
`;
const Div405 = styled.div`
  display: flex;
  width: 100%;
  height: 14.0625rem;
  background: linear-gradient(90deg, #42d09f 0%, #2cc1bf 100%);
  align-items: center;
  padding: 0 1rem;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 2rem 1rem;
  }
`;

const Div405Title = styled.h2`
  font-family: "Gmarket Sans TTF";
  font-weight: 700;
  color: #fff;
  font-size: 4rem;
  margin-left: 16.6875rem;

  @media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
    font-size: 2rem;
  }
`;

const Div405Stroke = styled.div`
  width: 0.09375rem;
  height: 8.59375rem;
  background: #fff;
  flex-shrink: 0;
  margin-left: 3.875rem;

  @media (max-width: 768px) {
    width: 80%;
    height: 0.09375rem;
    margin: 1rem 0;
  }
`;

const Div405Content = styled.p`
  color: #fff;
  text-align: justify;
  font-family: "Noto Sans KR";
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.44858;
  margin-left: 3.875rem;

  @media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
    font-size: 0.875rem;
  }
`;
const Title = styled.h2`
  color: #000;
  font-family: "Gmarket Sans TTF";
  font-size: 2.25rem;
  font-weight: 300;
  margin-top: 7.56rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-top: 4rem;
  }
`;

const TitleSpan = styled.span`
  display: inline-block;
  color: #000;
  text-align: center;
  font-family: "Gmarket Sans TTF";
  font-size: 2.25rem;
  font-weight: 700;
  box-shadow: inset 0 -1.25rem 0 rgba(66, 208, 159, 0.39);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const dropAnimation = keyframes`
  0% {
    transform: translateY(-3rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Character = styled.span`
  position: relative;
  display: inline-block;
  margin: 0 0.125rem;
  opacity: 0;

  &::before {
    content: "";
    position: absolute;
    top: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0.5rem;
    height: 0.5rem;
    background: url(${circleImageURL}) no-repeat center center;
    background-size: contain;

    @media (max-width: 768px) {
      top: -0.5rem;
      width: 0.375rem;
      height: 0.375rem;
    }
  }

  &.animate {
    animation: ${dropAnimation} 0.5s ease-out forwards;
  }

  &.character:nth-child(1) {
    animation-delay: 0.1s;
  }
  &.character:nth-child(2) {
    animation-delay: 0.2s;
  }
  &.character:nth-child(3) {
    animation-delay: 0.3s;
  }
  &.character:nth-child(4) {
    animation-delay: 0.4s;
  }
`;

const SubTitle = styled.p`
  color: #000;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  margin-top: 1.875rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-top: 1rem;
  }
`;

const BottomText = styled.p`
  color: #42d09f;
  font-family: "Gmarket Sans TTF";
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 4.3125rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-top: 2rem;
  }
`;

const swayAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.3125rem);
  }
`;

const Image = styled(LandingSection2ImgSVG)`
  margin-top: 1rem;
  animation: ${swayAnimation} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    width: 80%;
    margin: 1rem auto;
  }
`;
