import React, { useState, useRef } from "react";
import { Link, Route, Switch } from "react-router-dom";

import {
    BackgroundTriangle,
    Wrapper,
    LoginBox,
    LoginLogoBox,
    FixCrown,
    Title,
    FormWrapper,
    Button,
    StatusDiv,
    StatusDivWrapper
} from "./style";
import { LogoSvg } from "../common/logo/logo";
import { apiUrl } from "../../utils/constants";

const LoginForm = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const statusDiv = useRef(null);

    const login = async (email: string, password: string) => {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (response.status === 200) {
            location.replace("");

            localStorage.setItem("userid", (await response.json()).user.id);
        } else if (response.status === 401) {
            statusDiv.current.innerHTML = "You are already logged in.";
        } else if (response.status === 400) {
            statusDiv.current.innerHTML = "Invalid user or password.";
        } else {
            statusDiv.current.innerHTML =
                "Oops, looks like something went wrong.";
        }
    };

    return (
        <FormWrapper>
            <form
                onSubmit={() => {
                    login(loginEmail, loginPassword);
                }}
            >
                <label>
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={e => {
                            setLoginEmail(e.target.value);
                        }}
                    />
                </label>
                <label>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => {
                            setLoginPassword(e.target.value);
                        }}
                    />
                </label>
                <StatusDivWrapper>
                    <StatusDiv ref={statusDiv}></StatusDiv>
                </StatusDivWrapper>

                <input type="submit" value="Login" />
            </form>
        </FormWrapper>
    );
};

const RegiserForm = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

    const statusDiv = useRef(null);

    const getCountry = (): string => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async pos => {
                const response = await (
                    await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`,
                        {
                            method: "GET",
                            headers: { "Content-Type": "application/json" }
                        }
                    )
                ).json();
                return response.countryCode;
            });
        } else {
            statusDiv.current.innerHTML =
                "Geolocation is not supported by this browser.";
        }
        return "us";
    };

    const checkRegisterFields = (): boolean => {
        const regexPassword = new RegExp(
            /^((?=.*[a-z])(?=.*[A-Z\d])(?=.*[a-zA-Z]).{8,})$/
        );

        const regexEmail = new RegExp( // eslint-disable-next-line no-useless-escape
            /[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        );

        statusDiv.current.innerHTML = "";
        if (
            registerEmail === "" ||
            registerName === "" ||
            registerPassword === "" ||
            registerConfirmPassword === ""
        ) {
            statusDiv.current.innerHTML = "Please fill out all the boxes.";
            return false;
        } else if (!regexEmail.test(registerEmail)) {
            statusDiv.current.innerHTML = "Please enter a valid email adress.";
            return false;
        } else if (registerPassword != registerConfirmPassword) {
            statusDiv.current.innerHTML = "The two passwords do not match.";
            return false;
        } else if (!regexPassword.test(registerPassword)) {
            statusDiv.current.innerHTML =
                "Password must at least 8 characters long and have at least 1 lowercase letter, 1 uppercase letter and 1 number.";
            return false;
        }

        statusDiv.current.innerHTML = "";
        return true;
    };

    const register = async (email: string, name: string, password: string) => {
        if (checkRegisterFields()) {
            const response = await fetch(`${apiUrl}/users/createuser`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    name,
                    country: getCountry()
                })
            });
            if (response.status === 201) {
                location.replace("");
                localStorage.setItem("userid", (await response.json()).id);
                await fetch(`${apiUrl}/users/updateCountry`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ country: getCountry() })
                });
            } else if (response.status === 400) {
                statusDiv.current.innerHTML =
                    "Username or Email already taken.";
            } else if (response.status === 401) {
                statusDiv.current.innerHTML =
                    "You can't register while you are logged in.";
            } else {
                statusDiv.current.innerHTML =
                    "Oops, looks like something went wrong.";
            }
        }
    };
    return (
        <FormWrapper>
            <form
                onSubmit={() => {
                    register(registerEmail, registerName, registerPassword);
                }}
            >
                <label>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={e => {
                            setRegisterName(e.target.value);
                        }}
                    />
                </label>
                <label>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={e => {
                            setRegisterEmail(e.target.value);
                        }}
                    />
                </label>
                <label>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => {
                            setRegisterPassword(e.target.value);
                        }}
                    />
                </label>
                <label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={e => {
                            setRegisterConfirmPassword(e.target.value);
                        }}
                    />
                </label>
                <StatusDivWrapper>
                    <StatusDiv ref={statusDiv}></StatusDiv>
                </StatusDivWrapper>
                <input type="submit" value="Register" />
            </form>
        </FormWrapper>
    );
};

export const LoginRegisterPage = () => {
    return (
        <Wrapper>
            <BackgroundTriangle></BackgroundTriangle>
            <LoginBox>
                <LoginLogoBox>
                    <FixCrown>
                        <LogoSvg viewBox="0 0 522 400"></LogoSvg>
                        <Title>King Typer</Title>
                        <Button>
                            <Switch>
                                <Route exact path="/loginregister/register">
                                    <Link to="/loginregister/login">Login</Link>
                                </Route>
                                <Route exact path="/loginregister/login">
                                    <Link to="/loginregister/register">
                                        Register
                                    </Link>
                                </Route>
                            </Switch>
                        </Button>
                    </FixCrown>
                </LoginLogoBox>
                <Switch>
                    <Route exact path="/loginregister/register">
                        <RegiserForm></RegiserForm>
                    </Route>
                    <Route exact path="/loginregister/login">
                        <LoginForm></LoginForm>
                    </Route>
                </Switch>
            </LoginBox>
        </Wrapper>
    );
};
