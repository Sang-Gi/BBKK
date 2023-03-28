import React, { useState } from "react";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Avatar1, Avatar2, Avatar3 } from "@/assets/user";
import ProfileIcon from "@/assets/mypage/ProfileIcon.svg";
import ReviewIcon from "@/assets/mypage/ReviewIcon.svg";
import LikesIcon from "@/assets/mypage/LikesIcon.svg";
import { UserProfile } from "types/mypage";

interface StringMapByNumber {
  [key: number]: string;
}

const imageSrcMap: StringMapByNumber = {
  1: Avatar1,
  2: Avatar2,
  3: Avatar3,
};

const dummyData = "HelloUseLocation!";

export default function LeftNavBar(props: UserProfile) {
  // // API 연결 후 사용
  const [imageNumber, setImageNumber] = useState<number>(3); // 프로필 이미지 번호

  const navigate = useNavigate();

  return (
    <Wrapper>
      <ProfileWrapper>
        <ProfileImageWrapper>
          <ProfileImage src={imageSrcMap[imageNumber]} alt="profile image" />
        </ProfileImageWrapper>
        <ProfileName>{props.nickname}</ProfileName>
        {/* 칭호(?)는 아직 정해진 바가 없음! */}
        {/* <ProfileTitle>{userProfile.title}</ProfileTitle> */}
      </ProfileWrapper>
      <NavWrapper>
        <NavItem onClick={() => navigate("", { state: props })}>
          <img src={ProfileIcon} />
          <span> Profile</span>
        </NavItem>
        <NavItem onClick={() => navigate("reviews")}>
          <img src={ReviewIcon} />
          <span> Reviews</span>
        </NavItem>
        <NavItem onClick={() => navigate("likes")}>
          <img src={LikesIcon} />
          <span> Likes</span>
        </NavItem>
      </NavWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  padding: 1rem;
  width: 23%;
  height: 100%;
  background-color: ${theme.colors.container};
  border-radius: 1.5rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background-color: ${theme.colors.containerLight};
  padding: 2rem 1rem;
  border-radius: 1.5rem;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 25rem;
  background-color: ${theme.colors.container};
`;

const ProfileImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 12rem;
  border-radius: 1.5rem;
  text-align: center;
`;

const ProfileName = styled.h1`
  color: ${theme.colors.pink};
  font-size: 2.5rem;
  text-align: center;
  font-weight: ${theme.fontWeight.bold};
  margin: 0;
`;

// const ProfileTitle = styled.h2`
//   color: ${theme.colors.white};
//   font-size: 2rem;
//   text-align: center;
//   font-weight: ${theme.fontWeight.bold};
//   margin: 0;
// `;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  background-color: ${theme.colors.containerLight};
  padding: 0.5rem;
  border-radius: 1.5rem;
`;

const NavItem = styled.div`
  color: ${theme.colors.white};
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  padding: 2rem;
  @media (max-height: 800px) {
    padding: 1rem;
  }
  cursor: pointer;
  border: none;
  border-radius: 1.5rem;
  background-color: ${theme.colors.container};
`;
