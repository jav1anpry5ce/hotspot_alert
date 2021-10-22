import Styled from "styled-components";
import { MdOutlineArrowBackIos } from "react-icons/md";

export const Conversation = Styled.div`
  display: grid;
  grid-template-columns: 100%;
  margin-bottom: 20px;
`;

export const Message = Styled.div`
  display: flex;
  display: -webkit-flex;
  justify-content: ${(props) => props.justify};
  -webkit-justify-content: ${(props) => props.justify};
  justify-items: ${(props) => props.justify};
`;

export const Time = Styled.p`
  font-size: 1.3rem;
  color: ${(props) => props.color};
`;

export const Text = Styled.p`
  padding: 9px 14px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "0.9rem")};
  margin-bottom: 5px;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: ${(props) => props.radius};
  word-wrap: break-word;
  max-width: 85%;
  margin-right: 15px
`;

export const Back = Styled(MdOutlineArrowBackIos)`
    &:hover {
      cursor: pointer;
    }
`;

// import Styled from "styled-components";

// export const Container = Styled.div`
//   display: flex;
//   justify-content: ${(props) => (props.justify ? "flex-end" : "flex-start")};
//   padding: 0 5%;
//   margin-top: 3px;
// `;

// export const Sender = Styled.p`
//   display: flex;
//   align-items: center;
//   color: #828282;
//   letter-spacing: 0.3px;
//   padding-left: ${(props) => (props.left ? 0 : 10)};
//   padding-right: ${(props) => (props.right ? 10 : 0)};
// `;

// export const Box = Styled.div`
//     background: ${(props) => (props.background ? "#2979FF" : "#F3F3F3")};
//     border-radius: 20px;
//     padding: 1px 20px;
//     color: white;
//     display: inline-block;
//     max-width: 80%;
//     text-align: center;
// `;

// export const Text = Styled.p`
//     width: 100%;
//     letter-spacing: 0;
//     float: left;
//     font-size: 1.1em;
//     word-wrap: break-word;
//     color: ${(props) => (props.color ? "white" : "#353535")}
// `;

// export const MainContainer = Styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
// `;

// export const InnerContainer = Styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     background: #FFFFFF;
//     border-radius: 8px;
//     height: 60%;
//     width: 35%;
// `;
