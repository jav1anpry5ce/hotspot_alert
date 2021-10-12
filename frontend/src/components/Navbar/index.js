import React, { useState, useEffect } from "react";
import { Navbar as NavBar, Item, Dropdown } from "./NavbarElements";
import { Nav } from "rsuite";
import { Container, Grid } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { RiCriminalFill, RiUserAddLine } from "react-icons/ri";
import { FcSettings } from "react-icons/fc";
import { GoSignOut } from "react-icons/go";
import { FaBars } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { setActiveKey } from "../../store/navSlice";

export default function Navbar() {
  const auth = useSelector((state) => state.auth);
  const nav = useSelector((state) => state.navbar);
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [expand, setExpand] = useState(false);
  const [height, setHeight] = useState(39);

  useEffect(() => {
    window.addEventListener("resize", resize);
    if (window.innerWidth <= 760) {
      setShow(false);
    } else {
      setShow(true);
    }
    if (expand) {
      setHeight(215);
    } else {
      setHeight(43);
    }
  }, [expand]);

  const resize = () => {
    if (window.innerWidth <= 760) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const handelSelect = (eventKey) => {
    dispatch(setActiveKey(eventKey));
  };
  return (
    <NavBar>
      <NavBar.Body>
        {show ? (
          <Container maxWidth="xls">
            <Nav
              onSelect={handelSelect}
              activeKey={nav.activeKey}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Item
                style={{ display: "flex", justifyContent: "center" }}
                eventKey="1"
                align="center"
                icon={
                  <AiFillHome
                    style={{ marginRight: 3, fontSize: 16, marginTop: 3 }}
                  />
                }
                onClick={() => history.push("/")}
              >
                Home
              </Item>
              <Item
                style={{ display: "flex", justifyContent: "center" }}
                eventKey="2"
                icon={
                  <RiCriminalFill
                    style={{ marginRight: 3, fontSize: 16, marginTop: 4 }}
                  />
                }
                onClick={() => history.push("/wanted")}
              >
                Wanted
              </Item>
              {auth.is_admin ? (
                <Item
                  eventKey="3"
                  icon={
                    <RiUserAddLine
                      style={{ marginRight: 3, fontSize: 16, marginBottom: -2 }}
                    />
                  }
                  onClick={() => history.push("/add-account")}
                >
                  Add Account
                </Item>
              ) : null}
            </Nav>
            {auth.is_auth ? (
              <div>
                <Nav pullRight>
                  <Item
                    style={{ display: "flex", justifyContent: "center" }}
                    onClick={() => dispatch(logout())}
                    icon={
                      <GoSignOut
                        style={{
                          marginRight: 3,
                          fontSize: 16,
                          marginTop: 5,
                        }}
                      />
                    }
                  >
                    Sign out
                  </Item>
                </Nav>
                <Nav
                  onSelect={handelSelect}
                  pullRight
                  activeKey={nav.activeKey}
                >
                  <Dropdown
                    style={{ display: "flex", justifyContent: "center" }}
                    title="Settings"
                    icon={
                      <FcSettings
                        style={{
                          marginRight: 3,
                          fontSize: 16,
                          marginBottom: -3,
                        }}
                      />
                    }
                  >
                    <Dropdown.Item
                      eventKey="4"
                      onClick={() => history.push("/account/change-password")}
                    >
                      Change password
                    </Dropdown.Item>
                  </Dropdown>
                </Nav>
              </div>
            ) : null}
          </Container>
        ) : (
          <Container
            maxWidth="xsl"
            style={{
              height: height,
              transition: expand ? ".3s ease-in-out" : ".3s ease-out",
            }}
          >
            <FaBars
              style={{
                fontSize: 37,
                marginTop: 3,
                marginBottom: 2,
                color: "white",
              }}
              onClick={() => setExpand(!expand)}
            />
            {expand ? (
              <Grid
                container
                spacing={2}
                style={{
                  animation: expand ? "fadeIn ease 2s" : "fadeOut ease 2s",
                }}
              >
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Nav onSelect={handelSelect} activeKey={nav.activeKey}>
                    <Item
                      eventKey="1"
                      icon={
                        <AiFillHome
                          style={{
                            marginRight: 3,
                            fontSize: 16,
                            marginBottom: -2,
                          }}
                        />
                      }
                      onClick={() => {
                        history.push("/");
                        setExpand(!expand);
                      }}
                    >
                      Home
                    </Item>
                    <Item
                      eventKey="2"
                      icon={
                        <RiCriminalFill
                          style={{
                            marginRight: 3,
                            fontSize: 16,
                            marginBottom: -2,
                          }}
                        />
                      }
                      onClick={() => {
                        history.push("/wanted");
                        setExpand(!expand);
                      }}
                    >
                      Wanted
                    </Item>
                    {auth.is_admin ? (
                      <div>
                        <Item
                          eventKey="3"
                          icon={
                            <RiUserAddLine
                              style={{
                                marginRight: 3,
                                fontSize: 16,
                                marginBottom: -2,
                              }}
                            />
                          }
                          onClick={() => {
                            history.push("/add-account");
                            setExpand(!expand);
                          }}
                        >
                          Add Account
                        </Item>
                        <Item
                          onClick={() => dispatch(logout())}
                          icon={
                            <GoSignOut
                              style={{
                                marginRight: 3,
                                fontSize: 16,
                                marginBottom: -5,
                              }}
                            />
                          }
                        >
                          Sign out
                        </Item>
                        <Nav activeKey={nav.activeKey}>
                          <Dropdown
                            title="Settings"
                            icon={
                              <FcSettings
                                style={{
                                  marginRight: 3,
                                  fontSize: 16,
                                  marginBottom: -3,
                                }}
                              />
                            }
                          >
                            <Dropdown.Item
                              eventKey="4"
                              onClick={() => {
                                history.push("/account/change-password");
                                setExpand(!expand);
                              }}
                            >
                              Change password
                            </Dropdown.Item>
                          </Dropdown>
                        </Nav>
                      </div>
                    ) : null}
                  </Nav>
                </Grid>
              </Grid>
            ) : null}
          </Container>
        )}
      </NavBar.Body>
    </NavBar>
  );
}
