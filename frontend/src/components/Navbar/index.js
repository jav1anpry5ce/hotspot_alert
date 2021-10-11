import React from "react";
import { Navbar as NavBar, Item, Dropdown } from "./NavbarElements";
import { Nav } from "rsuite";
import { Container } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { RiCriminalFill } from "react-icons/ri";
import { FcSettings } from "react-icons/fc";
import { GoSignOut } from "react-icons/go";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { setActiveKey } from "../../store/navSlice";

export default function Navbar() {
  const auth = useSelector((state) => state.auth);
  const nav = useSelector((state) => state.navbar);
  const dispatch = useDispatch();
  const history = useHistory();

  const handelSelect = (eventKey) => {
    dispatch(setActiveKey(eventKey));
  };
  return (
    <NavBar>
      <Container maxWidth="xls">
        <Nav onSelect={handelSelect} activeKey={nav.activeKey}>
          <Item
            eventKey="1"
            align="center"
            icon={
              <AiFillHome
                style={{ marginRight: 3, fontSize: 16, marginBottom: -2 }}
              />
            }
            onClick={() => history.push("/")}
          >
            Home
          </Item>
          <Item
            eventKey="2"
            icon={
              <RiCriminalFill
                style={{ marginRight: 3, fontSize: 16, marginBottom: -2 }}
              />
            }
          >
            Wanted
          </Item>
        </Nav>
        {auth.is_auth ? (
          <Container maxWidth="xsl">
            <Nav pullRight>
              <Item
                onClick={() => dispatch(logout())}
                icon={
                  <GoSignOut
                    style={{ marginRight: 3, fontSize: 16, marginBottom: -5 }}
                  />
                }
              >
                Sign out
              </Item>
            </Nav>
            <Nav onSelect={handelSelect} pullRight activeKey={nav.activeKey}>
              <Dropdown
                title="Settings"
                icon={
                  <FcSettings
                    style={{ marginRight: 3, fontSize: 16, marginBottom: -3 }}
                  />
                }
              >
                <Dropdown.Item
                  eventKey="3"
                  onClick={() => history.push("/account/change-password")}
                >
                  Change password
                </Dropdown.Item>
              </Dropdown>
            </Nav>
          </Container>
        ) : null}
      </Container>
    </NavBar>
  );
}
