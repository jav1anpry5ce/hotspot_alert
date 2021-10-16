import Styled from "styled-components";
import { keyframes } from "styled-components";

export const Image = Styled.img`
    width: 365px;
    height: 295px;

`;

const fadeIn = keyframes`
    from {
        opacity: 0; 
    } 
    to {
        opacity: 1; 
    }
`;

export const Text = Styled.p`
    font-size: 22;
    animation: ${fadeIn} 6s both;
`;

export const Paragraph = Styled.p`
    margin-bottom: 15px
`;

export const Title = Styled.h3`
    animation: ${fadeIn} 3s both;
    font-weight: bold;
    text-align: center;
`;
