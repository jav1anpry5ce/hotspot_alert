import styled from "styled-components";

export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #c9c9c9;

  &:hover {
    border: 1px solid #7ac3f0;
  }
  &:focus {
    outline: 0.7px solid #7ac3f0;
    border: 0.7px solid #7ac3f0;
  }
`;
