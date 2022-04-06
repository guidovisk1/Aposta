import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 55px;
  border: none;
  border-bottom: 2.5px solid #cccccc;
`;

export const Label = styled.span`
  text-align: left;
  font-size: 9px;
  font-weight: bold;
  letter-spacing: 1.8px;
  color: #888888;
`;

export const HTMLInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  margin-top: 5px;
  height: 50%;
  outline: none;
  font-size: 13px;
  letter-spacing: 1.3px;

  &::placeholder {
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 1.3px;
    color: #cccccc;
  }
`;
