import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HTMLCheckbox = styled.input`
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #ddd;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #ff5427;
  }
`;

export const LabelText = styled.label`
  font-size: 13px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 1.3px;
  color: #222222;
  margin-left: 6px;
`;
