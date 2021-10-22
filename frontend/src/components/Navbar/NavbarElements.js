import styled from "styled-components";
import { keyframes } from "styled-components";
import { Navbar as NavBar, Nav as N, Dropdown as D } from "rsuite";
import { Grid as G } from "@mui/material";

const fadeIn = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;

export const Navbar = styled(NavBar)`
  background-color: #12142b;
`;

export const Nav = styled(N)``;

export const Item = styled(N.Item)`
  color: white;
`;

export const Dropdown = styled(D)`
  color: white;
`;

export const Grid = styled(G)`
  display: inline-flex;
  justify-content: center;
  -webkit-animation: ${fadeIn} 2s;
  -moz-animation: ${fadeIn} 2s;
  -ms-animation: ${fadeIn} 2s;
  -o-animation: ${fadeIn} 2s;
  animation: ${fadeIn} 2s;
`;
