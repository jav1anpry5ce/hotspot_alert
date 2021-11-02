import Styled from "styled-components";

export const Container = Styled.div`
    width: 100%;
    height: 180px;
    background-color: #131927;
    display: inline-flex;
    flex-direction: row;
    color: #fff;
    
`;

export const Copy = Styled.div`
    width: 100%;
    height: 40px;
    background-color: #696969;
    text-align: center;
    color: #fff;
`;

export const CopyText = Styled.p`
    font-size: 14px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 5px;
`;

export const Title = Styled.p`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: -5px;
    
`;

export const Text = Styled.p`
    font-size: 16px;
    margin-bottom: -3px;
    width: 10%;

    &:hover {
        cursor: pointer;
        color: #d9d9d9;
        text-decoration: underline;
        font-style: italic;
    }
`;
