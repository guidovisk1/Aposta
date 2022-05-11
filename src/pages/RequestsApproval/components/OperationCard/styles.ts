import styled, { css } from 'styled-components';

interface Props {
  success?: boolean;
}

export const Container = styled.div`
  height: 155px;
  width: 621px;
  left: 645px;
  top: 128px;
  border-radius: 0px;
  background-color: #fafafa;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const SuccessStatus = styled.div<Props>`
  width: 100%;
  height: 41px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.success
      ? css`
          background-color: #48bd2b;
        `
      : css`
          background-color: #ff0000;
        `}
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #dddddd;
  padding: 10px 49px;
`;

export const SuccessStatusText = styled.span`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 1.7999999523162842px;
  text-align: center;
  color: #fafafa;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  padding: 0px 49px;
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
