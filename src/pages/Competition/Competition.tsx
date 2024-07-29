import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import CompetitionCarousel from "../../components/CompetitionComponent/CompetitionCarousel";
import DDayCountdown from "../../components/CompetitionComponent/CompetitonDDay";
import { ReactComponent as CompetitionImgExample } from "../../assets/images/CompetitionImgExample.svg";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

interface CompetitionData {
  title: string;
  participants: number;
  dateRange: string;
}

interface CompetitionsResponse {
  current: CompetitionData;
  past: CompetitionData[];
}

export default function Competition() {
  const [isProceeding] = useState<boolean>(true);
  const [currentCompetition, setCurrentCompetition] =
    useState<CompetitionData | null>(null);
  const [pastCompetitions, setPastCompetitions] = useState<CompetitionData[]>(
    []
  );

  useEffect(() => {
    axios
      .get<CompetitionsResponse>("http://localhost:3001/competitions")
      .then((response) => {
        setCurrentCompetition(response.data.current);
        setPastCompetitions(response.data.past);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!currentCompetition) return <div>Loading...</div>;

  return (
    <>
      <CompetitionCarousel />
      <CompetitionTitle>도전! 프롬프렌</CompetitionTitle>
      <CompetitionContainer>
        <CompetitionProceedingBox>
          <CompetitionProceed>
            <IsProceed isProceeding={isProceeding} />
            <CompetitionDday>D-DAY</CompetitionDday>
          </CompetitionProceed>
          <div id="stroke" />
          <h1>{currentCompetition.title}</h1>
          <p>
            현재<span>{currentCompetition.participants}명</span>참여중 !
          </p>
          <p>{currentCompetition.dateRange}</p>
          <StyledLink to="/competitionParticipation">
            <ParticipationButton>참여하기</ParticipationButton>
          </StyledLink>
        </CompetitionProceedingBox>
        <CompetitionImgBox>
          <CompetitionImgExample />
          <DDayCountdownBox>
            <DDayCountdown deadline={new Date("2024-07-31T23:59:59")} />
          </DDayCountdownBox>
        </CompetitionImgBox>
      </CompetitionContainer>
      <CompetitionPastBox>
        <div id="competitionStroke" />
        <h1>지난 대회</h1>
        <CompetitionPastImgContainer>
          {pastCompetitions.map((competition, index) => (
            <CompetitionPast key={index}>
              <CompetitionPastImgBox />
              <IsProceed isProceeding={!isProceeding} past />
              <h2>{competition.title}</h2>
              <div id="competitionPastStroke" />
              <p>
                <span>{competition.participants}</span>명 참여 완료
              </p>
              <p>{competition.dateRange}</p>
            </CompetitionPast>
          ))}
        </CompetitionPastImgContainer>
      </CompetitionPastBox>
      <Footer />
    </>
  );
}

const IsProceed = ({
  isProceeding,
  past = false,
}: {
  isProceeding: boolean;
  past?: boolean;
}) => {
  return (
    <ProceedingStatus isProceeding={isProceeding} past={past}>
      {isProceeding ? "진행중" : "마감"}
    </ProceedingStatus>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const CompetitionTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: "Gmarket Sans TTF";
  font-size: 2.5rem;
  font-weight: 500;
  margin-top: 3.19rem;
`;

const CompetitionContainer = styled.div`
  width: 80rem;
  margin: 0 auto;
  margin-top: 3.44rem;
  position: relative;
`;

const CompetitionProceedingBox = styled.div`
  width: 56.8125rem;
  height: 29.375rem;
  border-radius: 0rem 1rem 1rem 0rem;
  background: rgba(114, 212, 155, 0.2);
  margin-top: 3.44rem;
  display: flex;
  flex-direction: column;
  z-index: 1;

  #stroke {
    width: 19.18838rem;
    height: 0.13rem;
    background: rgba(114, 212, 155, 0.5);
    margin-left: 7.25rem;
  }
  h1 {
    color: #000;
    font-family: "Gmarket Sans TTF";
    font-size: 2.125rem;
    font-weight: 500;
    margin-top: 0.48rem;
    margin-left: 7.69rem;
  }
  p {
    color: #000;
    font-family: "Gmarket Sans TTF";
    font-size: 1.25rem;
    font-weight: 500;
    margin-left: 7.69rem;
    margin-top: 1.18rem;
  }
  span {
    color: #42d09f;
    font-family: "Gmarket Sans TTF";
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

const CompetitionProceed = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 7.69rem;
  margin-top: 4.3rem;
`;

const ProceedingStatus = styled.div<{ isProceeding: boolean; past?: boolean }>`
  width: 4.75rem;
  height: 2.23431rem;
  color: ${({ isProceeding }) => (isProceeding ? "#fff" : "#000")};
  font-family: "Gmarket Sans TTF";
  font-size: 1rem;
  font-weight: 500;
  background: ${({ isProceeding }) =>
    isProceeding ? "#72d49b" : "rgba(126, 126, 126, 0.13)"};
  text-align: center;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: ${({ past }) => (past ? "2.06rem" : "0")};
`;

const CompetitionDday = styled.div`
  width: 5.3125rem;
  height: 2.23431rem;
  background: #fff;
  border: 1px solid #72d49b;
  border-radius: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #72d49b;
  font-family: "Gmarket Sans TTF";
  font-size: 1rem;
  font-weight: 500;
`;

const ParticipationButton = styled.div`
  width: 19.1875rem;
  height: 5.38869rem;
  border-radius: 1rem;
  background: #72d49b;
  color: #fff;
  text-align: center;
  font-family: "Gmarket Sans TTF";
  font-size: 1.6875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 7.25rem;
  margin-top: 1.68rem;
  cursor: pointer;
  Link {
    text-decoration: none;
  }
`;

const CompetitionImgBox = styled.div`
  width: 35.5625rem;
  height: 23.70831rem;
  border-radius: 1rem;
  position: absolute;
  z-index: 2;
  left: calc(56.8125rem - 16rem);
  top: 3.44rem;
`;

const DDayCountdownBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4.25rem;
  border-radius: 0rem 0rem 1rem 1rem;
  background: #72d49b;
  position: absolute;
  bottom: 0;
`;

const CompetitionPastBox = styled.div`
  margin-bottom: 15.94rem;

  #competitionStroke {
    width: 79.9395rem;
    height: 0.0625rem;
    background: rgba(114, 212, 155, 0.5);
    margin-top: 3.44rem;
  }

  h1 {
    color: #000;
    font-family: "Gmarket Sans TTF";
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 2.25rem;
    margin-bottom: 3.25rem;
    margin-left: 7.25rem;
  }
`;

const CompetitionPast = styled.div`
  h2 {
    color: #000;
    font-family: "Gmarket Sans TTF";
    font-size: 1.6875rem;
    font-weight: 500;
    margin-top: 1.62rem;
  }

  #competitionPastStroke {
    width: 20.3125rem;
    height: 0.0625rem;
    background: #72d49b;
    margin-top: 0.94rem;
    margin-bottom: 1.06rem;
  }

  p {
    color: #000;
    font-family: "Gmarket Sans TTF";
    font-size: 1rem;
    font-weight: 300;
  }

  span {
    font-weight: 500;
  }
`;

const CompetitionPastImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 80rem;
  margin-top: 2rem;
  gap: 2.56rem;
`;

const CompetitionPastImgBox = styled.div`
  width: 20.3125rem;
  height: 12.8125rem;
  border-radius: 1rem;
  background: rgba(114, 212, 155, 0.2);
`;