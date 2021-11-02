import React, { useState, useEffect } from "react";
import { Navbar as NavBar, Item, Dropdown, Grid } from "./NavbarElements";
import { Nav } from "rsuite";
import { Container } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { RiCriminalFill, RiUserAddLine } from "react-icons/ri";
import { FcSettings } from "react-icons/fc";
import { GoSignOut } from "react-icons/go";
import { FaBars } from "react-icons/fa";
import { BsPersonXFill } from "react-icons/bs";
import { MdMessage } from "react-icons/md";
import { CgFeed } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { setActiveKey } from "../../store/navSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = (
  <LoadingOutlined
    style={{ fontSize: 16, marginRight: 3, marginTop: 3 }}
    spin
  />
);

export default function Navbar() {
  const auth = useSelector((state) => state.auth);
  const nav = useSelector((state) => state.navbar);
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [expand, setExpand] = useState(false);
  const [height, setHeight] = useState(43);

  useEffect(() => {
    window.addEventListener("resize", resize);
    if (window.innerWidth <= 1055) {
      setShow(false);
    } else {
      setShow(true);
    }
    if (expand) {
      setHeight("100vh");
    } else {
      setHeight(43);
    }
    if (auth.is_auth && expand) {
      setHeight("100vh");
    }
  }, [expand, auth.is_auth]);

  const resize = () => {
    if (window.innerWidth <= 1055) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const handelSelect = (eventKey) => {
    dispatch(setActiveKey(eventKey));
  };

  if (nav.hide) {
    return null;
  }

  return (
    <NavBar
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 2,
      }}
    >
      <div>
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
                eventKey="2"
                align="center"
                style={{ display: "flex", justifyContent: "center" }}
                icon={
                  <MdMessage
                    style={{ marginRight: 3, fontSize: 16, marginTop: 5 }}
                  />
                }
                onClick={() => history.push("/chats")}
              >
                Emergency Chat
              </Item>
              <Item
                eventKey="3"
                align="center"
                style={{ display: "flex", justifyContent: "center" }}
                icon={
                  <CgFeed
                    style={{ marginRight: 3, fontSize: 16, marginTop: 4 }}
                  />
                }
                onClick={() => history.push("/posts")}
              >
                Posts
              </Item>
              <Item
                eventKey="4"
                style={{ display: "flex", justifyContent: "center" }}
                icon={
                  <BsPersonXFill
                    style={{ marginRight: 3, fontSize: 16, marginTop: 3 }}
                  />
                }
                onClick={() => history.push("/missing-persons")}
              >
                Missing Persons
              </Item>
              <Item
                style={{ display: "flex", justifyContent: "center" }}
                eventKey="5"
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
                  eventKey="6"
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
                      auth.lLoading ? (
                        <Spin indicator={Loading} />
                      ) : (
                        <GoSignOut
                          style={{
                            marginRight: 3,
                            fontSize: 16,
                            marginTop: 5,
                          }}
                        />
                      )
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
                      eventKey="7"
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
              transition: expand ? ".5s ease-in-out" : ".5s ease-out",
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
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={5}
                  style={{
                    marginTop: "10%",
                  }}
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
                      align="center"
                      style={{ display: "flex", justifyContent: "center" }}
                      icon={
                        <MdMessage
                          style={{ marginRight: 3, fontSize: 16, marginTop: 5 }}
                        />
                      }
                      onClick={() => {
                        history.push("/chats");
                        setExpand(!expand);
                      }}
                    >
                      Emergency Chat
                    </Item>
                    <Item
                      eventKey="3"
                      align="center"
                      style={{ display: "flex", justifyContent: "center" }}
                      icon={
                        <CgFeed
                          style={{ marginRight: 3, fontSize: 16, marginTop: 4 }}
                        />
                      }
                      onClick={() => {
                        history.push("/posts");
                        setExpand(!expand);
                      }}
                    >
                      Posts
                    </Item>
                    <Item
                      eventKey="4"
                      style={{ display: "flex", justifyContent: "center" }}
                      icon={
                        <BsPersonXFill
                          style={{
                            marginRight: 3,
                            fontSize: 16,
                            marginTop: 3,
                          }}
                        />
                      }
                      onClick={() => {
                        history.push("/missing-persons");
                        setExpand(!expand);
                      }}
                    >
                      Missing Persons
                    </Item>
                    <Item
                      eventKey="5"
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
                          eventKey="6"
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
                            auth.lLoading ? (
                              <Spin indicator={Loading} />
                            ) : (
                              <GoSignOut
                                style={{
                                  marginRight: 3,
                                  fontSize: 16,
                                  marginBottom: -5,
                                }}
                              />
                            )
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
                              eventKey="7"
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
      </div>
    </NavBar>
  );
}
