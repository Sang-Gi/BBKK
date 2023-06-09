import React, { useEffect } from "react";
import Header from "@components/common/Header";
import LeftNavBar from "@components/mypage/LeftSection/LeftNavBar";
import RightContent from "@components/mypage/RightSection/RightContent";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { showToast } from "@/components/common/Toast";
import { useNavigate } from "react-router-dom";
import { requestCheckLoginUser } from "@/api/auth";

export default function MyPage() {
  const navigate = useNavigate();

  const handleToastClick = (
    type: IToastProps["type"],
    message: IToastProps["message"]
  ) => {
    showToast({ type, message });
  };

  useEffect(() => {
    const userId = Number(localStorage.getItem("userId"));

    const request = async () => {
      try {
        const {
          data: { isLoginUser },
        } = await requestCheckLoginUser(userId);
        if (!isLoginUser) {
          handleToastClick("error", "정상적인 접근이 아닙니다.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        handleToastClick("error", "정상적인 접근이 아닙니다.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        console.log(error);
      }
    };

    request();
  }, []);
  return (
    <>
      <Header />
      <BackGround>
        <ContentWrapper>
          <LeftNavBar />
          <RightContent />
        </ContentWrapper>
      </BackGround>
    </>
  );
}

const BackGround = styled.div`
  height: 90vh;
  background-color: ${theme.colors.background};
`;

const ContentWrapper = styled.div`
  width: 90%;
  box-sizing: border-box;
  height: 92%;
  @media (min-width: 768px) {
    height: 94%;
  }
  margin: 3rem auto;
  padding: 3rem;
  @media (max-height: 768px) {
    padding: 2rem;
  }
  gap: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-items: flex-start;
  background-color: ${theme.colors.containerLight};
  border-radius: 1.5rem;
`;
