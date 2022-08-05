import styled from 'styled-components';

export const Container = styled.form`
  width: 500px;
  height: 479px;
  background-color: #fff;
  z-index: 99;
  position: absolute;
  border-radius: 13px;
  box-shadow: 0px 25px 25px rgba(0, 0, 0, 0.1);

  display: flex;

  flex-direction: column;
  padding: 28px 37px 28px 45px;
`;

export const MainTitle = styled.h1`
  color: #39ff14;
  font-weight: bold;
  font-size: 20px;
`;

export const SecondaryText = styled.h2`
  font-weight: 300;
  color: #222222;
  text-align: left;
  font-size: 18px;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

export const ButtonsWrapper2 = styled.div`
  width: 100%;
  margin-left: 6rem;
  margin-top: 60px;
`;

export const LineSeparator = styled.hr`
  width: 100%;
  border: 1px solid #cccccc;
  margin-top: 47px;
`;

export const ForgetPasswordText = styled.a`
  font-size: 12px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0.9px;
  text-align: center;
`;
