import styled from 'styled-components';

export const Container = styled.div`
  width: 421px;
  height: 242px;
  padding: 24px;
  background-color: #fafafa;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
`;

export const HeaderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
`;

export const HeaderTexts = styled.span`
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #ff5427;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UrgencyBadge = styled.div`
  width: 70px;
  height: 20px;
  border-radius: 11px;
  background-color: #d24242;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
`;

export const PropertiesWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

export const Property = styled.span`
  font-size: 9px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 1.8px;
  color: #888888;
`;

export const Value = styled.span`
  font-family: Montserrat;
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 1.2999999523162842px;
  color: #525252;
`;
