import Styled from "styled-components";
import { Button as B } from "antd";

export const CustomButton = Styled(B)`
    z-index: 1;
    background-color: rgba(31,31,31,0.6);
    border: none;
    &:hover {
        background-color: rgba(31,31,31,0.9);
    }
    &:focus{
        background-color: rgba(31,31,31,0.6);
    }
`;
