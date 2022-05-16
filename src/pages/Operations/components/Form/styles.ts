import styled from 'styled-components';
import { Form } from 'formik';

interface InputsWrapperProps {
  column?: boolean;
}

export const Container = styled(Form)`
  width: 610px;
  background-color: #fff;
  box-shadow: 0px 25px 25px rgba(0, 0, 0, 0.1);
  border-radius: 13px;

  padding: 28px 39px;

  .first {
    margin-top: 0;
  }
  .last {
    margin-top: 8px;
  }
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 300;
  letter-spacing: 0.55px;
  color: #222222;
`;

export const Section = styled.section`
  margin-top: 20px;
`;

export const TitleSectionWrapper = styled.div`
  width: 100%;
  height: 24px;
  border-bottom: 1px solid #dddddd;
`;

export const TitleSectionText = styled.span`
  font-size: 10px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 2px;
  text-align: left;
  color: #ff5427;
`;

export const Label = styled.span`
  text-align: left;
  font-size: 9px;
  font-weight: bold;
  letter-spacing: 1.8px;
  color: #888888;
`;

export const InputsWrapper = styled.div<InputsWrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: end;

  flex-direction: ${props => (props.column ? 'column' : 'row')};
  margin-top: 14px;
`;

export const ContainerInputFile = styled.label`
  width: 100%;
  height: 112px;
  background: #f5f5f5;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.05);
  margin-top: 29px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

export const SendImageText = styled.label`
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 1.3px;
  color: #888888;
`;

export const UploadInput = styled.input`
  display: none;
  width: 100%;
  border: 1px solid red;
  height: 100%;
  position: absolute;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  margin-top: 25px;
`;
