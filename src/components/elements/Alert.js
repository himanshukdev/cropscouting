import styled from "styled-components";

export const AlertMain = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  position: fixed;
  left: 0px;
  top: 0px;
`;

export const AlertBody = styled.div`
  width: 384px;
  background-color: #ffffff;
  border-radius: 12px;
  position: relative;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export const AlertTitle = styled.div`
  font-size: 20px;
  margin-bottom: 0.5em;
  text-align: center;
  background: #f7f7f7;
  border-radius: 12px 12px 0px 0px;
  padding: ${props =>
    props.customPadding ? props.customPadding : "15px 10px;"};
  display: flex;
  justify-content: center;
`;

export const AlertMessage = styled.div`
  color: #999;
  margin: ${props => (props.customMargin ? props.customMargin : "20px;")};
  padding: ${props => (props.customPadding ? props.customPadding : " 0px;")};
  text-align: center;
  font-size: ${props =>
    props.customFontSize ? props.customFontSize : " 15px;"};
`;

export const AlertButtonSection = styled.div`
  padding: 10px 10px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
`;
