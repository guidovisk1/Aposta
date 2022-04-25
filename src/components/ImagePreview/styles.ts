import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

export const Container = styled.div`
  background: #f4f4f4;
  box-shadow: 0px 25px 25px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  width: 500px;
  height: 367px;
  border-top: 3px solid #ff5427;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ShadowedBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const IconX = styled(FiX)`
  position: absolute;
  z-index: 999;
  top: 15px;
  left: 460px;
  cursor: pointer;
`;

export const Name = styled.span`
  font-size: 26px;
  font-weight: 300;
  letter-spacing: 0.65px;
  text-align: center;
`;

export const Code = styled.span`
  font-size: 13px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 1.3px;
  text-align: center;
`;

export const TextsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 45px;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;

export const Image = styled.img`
  width: 150px;
  height: 150px;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 35px;
  display: flex;
  justify-content: center;
  width: 100%;
`;
