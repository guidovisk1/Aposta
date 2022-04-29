import styled from 'styled-components';

interface UserType {
  userType: string;
}

export const Container = styled.ul`
  text-decoration: none;
  margin-top: 23px;
`;

export const Item = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 36.5px;
  width: 100%;
  cursor: pointer;
  margin-top: 21px;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NameWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const Name = styled.span`
  font-size: 14px;
  letter-spacing: 1.4px;
  font-weight: 600;
  color: #222222;
`;

export const RoundedOutline = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  border: 2px solid #ff5427;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  margin-right: 15px;
`;

export const UserTypeWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const UserType = styled.span`
  font-size: 9px;
  letter-spacing: 1.8px;
  font-weight: 700;
`;

export const UserTypeText = styled.span<UserType>`
  font-size: 9px;
  letter-spacing: 1.8px;
  font-weight: 700;
  color: #3eab57;
  margin-left: 4px;
  ${props =>
    props.userType === 'admin' &&
    `
    color: #FF5427;
  `};
`;

export const DownInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
`;

export const Sector = styled.span`
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.8px;
  color: #888888;
`;
