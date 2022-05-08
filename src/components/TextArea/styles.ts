import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

export const TextAreaInput = styled.textarea`
  width: 100%;
  height: 74px;
  background-color: #fff;
  color: #cccccc;

  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  border: 0;
  outline: 0;

  &::placeholder {
    color: #cccccc;
  }
  padding: 12px;
`;

export const LabelText = styled.span`
  color: #888888;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 1.8px;
  margin-bottom: 12px;
`;
