import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Header/Header";

export default function LandingSection5() {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  return (
    <LandingSection5Container>
      <HeaderWrapper>
        <Header isLoggedIn={false} marginTop="" />
      </HeaderWrapper>
      <LandingSection5SubTitle>
        프롬프렌 사용 방법에 대해 궁금한 점이 있으신가요?
      </LandingSection5SubTitle>
      <LandingSection5Title>
        자주 묻는 질문에서
        <br /> 답변을 찾아보세요!
      </LandingSection5Title>
      <LandingSection5Box
        onMouseEnter={() => setHoveredBox(1)}
        onMouseLeave={() => setHoveredBox(null)}
      >
        Q1: PromFren에 가입하려면 어떻게 해야 하나요?
      </LandingSection5Box>
      {hoveredBox === 1 && (
        <HoverText>
          A1: PromFren에 가입하려면 홈페이지 상단의 '회원가입' 버튼을 클릭하고,
          이메일 주소와 비밀번호를 입력한 후, 필요한 정보를 작성하여 가입 절차를
          완료하세요. 소셜 미디어 계정을 사용하여 빠르게 가입할 수도 있습니다.
        </HoverText>
      )}
      <LandingSection5Box
        onMouseEnter={() => setHoveredBox(2)}
        onMouseLeave={() => setHoveredBox(null)}
      >
        Q2: PromFren의 데이터는 안전하게 보호되나요?
      </LandingSection5Box>
      {hoveredBox === 2 && (
        <HoverText>
          A2: 네, PromFren은 사용자 데이터의 보안과 프라이버시를 최우선으로
          생각합니다. 모든 데이터는 암호화되어 전송되며, 최신 보안 프로토콜을
          준수합니다.
        </HoverText>
      )}
      <LandingSection5Box
        onMouseEnter={() => setHoveredBox(3)}
        onMouseLeave={() => setHoveredBox(null)}
      >
        Q3: 고객 지원팀에 문의하려면 어떻게 해야 하나요?
      </LandingSection5Box>
      {hoveredBox === 3 && (
        <HoverText>
          A3: 고객 지원팀에 문의하려면 홈페이지 하단의 '고객센터' 링크를
          클릭하여 문의 양식을 작성해 주세요. 또는
          이메일(support@promfren.com)을 통해 직접 문의하실 수 있습니다. 가능한
          한 빨리 답변드리겠습니다.
        </HoverText>
      )}
    </LandingSection5Container>
  );
}

const LandingSection5Container = styled.div`
  width: 1280px;
  height: 1203px;
  background: linear-gradient(
    180deg,
    rgba(114, 212, 155, 0.35) 30%,
    rgba(217, 217, 217, 0) 80%
  );
  padding-top: 88px;
  position: relative;
`;

const HeaderWrapper = styled.div`
  margin-top: 88px;
`;

const LandingSection5SubTitle = styled.div`
  color: #7e7e7e;
  font-family: "Gmarket Sans TTF";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 107px;
  margin-left:193px;
  margin-bottom: 20px;
`;

const LandingSection5Title = styled.div`
  color: #000;
  font-family: "Gmarket Sans TTF";
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left:193px;
  margin-bottom: 56px;
`;

const LandingSection5Box = styled.div`
  position: relative;
  width: 954px;
  height: auto;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid #b2f909;
  background: #fff;
  box-shadow: 15px 13px 1.5px 0px rgba(97, 220, 132, 0.25);
  color: #000;
  font-family: "Gmarket Sans TTF";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 193px;
  margin-bottom: 21.17px;
  padding: 16px;
`;

const HoverText = styled.div`
  width: 954px;
  margin-top: 8px;
  color: #555;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin-left: 193px;
  line-height: normal;
`;
