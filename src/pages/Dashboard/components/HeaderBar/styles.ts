import styled from 'styled-components';

export const Container = styled.header`
  width: calc(100% - 80px);
  height: 60px;
  position: absolute;
  left: 80px;
  border: none;

  padding: 0 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
`;

export const MainInfoWrapper = styled.div`
  display: flex;
`;

export const SystemTitle = styled.span`
  font-size: 16px;
  letter-spacing: 0.55px;
  color: #222222;
`;

export const Divider = styled.div`
  height: 18px;
  width: 2px;
  background-color: #cccccc;
  margin-left: 20px;
`;

export const RouteName = styled.span`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.55px;
  color: #222222;
  margin-left: 20px;
`;

export const ExitAndUserNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 150px;
`;

export const UserName = styled.span`
  font-size: 13px;
  color: #ea2828;
  letter-spacing: 1.3px;
  margin-right: 8.5px;
  font-weight: 600;
`;

export const ExitButton = styled.img`
  cursor: pointer;
`;
