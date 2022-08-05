import styled from 'styled-components';

export const Container = styled.div`
  width: 367px;
  height: 100%;
  overflow-y: scroll;

  padding: 11px 26px;
  background-color: #fff;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border-top: 1px solid #cccccc;
  position: relative;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 65px;

  position: relative;
  border-bottom: 1px solid #cccccc;
`;

export const HeaderTitle = styled.h1`
  color: #222222;
  font-size: 26px;
  font-weight: 300;
`;

export const AddButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: #39ff14;
  outline: 0;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 15px;
  cursor: pointer;
  left: 365px;
`;
