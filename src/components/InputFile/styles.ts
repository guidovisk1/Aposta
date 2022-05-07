import styled from 'styled-components';

export const Container = styled.label`
  width: 170px;
  display: flex;
  flex-direction: column;
  position: relative;

  img {
    position: absolute;
    right: 0;
  }
`;

export const LabelText = styled.div`
  font-weight: bold;
  font-size: 9px;
  letter-spacing: 1.8px;
  color: #888888;
  cursor: pointer;
`;

export const IconInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerInputFile = styled.label`
  width: 100%;
`;

export const Input = styled.input`
  display: none;
  width: 100%;
  &::placeholder {
    color: #cccccc;
    font-size: 13px;
    letter-spacing: 1.3px;
  }
`;

export const TextWrapper = styled.label`
  width: 100%;
  border: none;
  border-bottom: 2px solid #cccccc;
  background: transparent;
  margin-top: 5px;
  outline: none;
  letter-spacing: 1.3px;
  padding-left: 12px;
  padding-bottom: 6px;

  cursor: pointer;

  &::placeholder {
    font-weight: 600;
    font-size: 10px;
    letter-spacing: 1.3px;
    color: #cccccc;
  }

  span {
    font-weight: 600;
    font-size: 12px;
    color: #cccccc;
  }
`;
