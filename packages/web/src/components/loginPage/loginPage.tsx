import React, { useState, useRef } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";

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
    StatusDivWrapper,
    ForgotPasswordLink,
    LinkExpiredDiv
} from "./style";
import { LogoSvg } from "../common/logo/logo";
import { apiUrl } from "../../utils/constants";

const LinkExpired = () => {
    return <LinkExpiredDiv>Looks like your link expired.</LinkExpiredDiv>;
};

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [statusDivStatus, setStatusDivStatus] = useState<
        "positive" | "negative"
    >("negative");

    const locatione = useLocation();

    const getUrlKey = () => {
        return locatione.pathname.split("/")[
            locatione.pathname.split("/").length - 1
        ];
    };

    const statusDiv = useRef(null);

    const confirmForm = (): boolean => {
        const regexPassword = new RegExp(
            /^((?=.*[a-z])(?=.*[A-Z\d])(?=.*[a-zA-Z]).{8,})$/
        );

        statusDiv.current.innerHTML = "";
        if (password === "" || confirmPassword === "") {
            setStatusDivStatus("negative");
            statusDiv.current.innerHTML = "Please fill out all the boxes.";
            return false;
        } else if (!regexPassword.test(password)) {
            statusDiv.current.innerHTML =
                "Password must at least 8 characters long and have at least 1 lowercase letter, 1 uppercase letter and 1 number.";
            return false;
        }

        statusDiv.current.innerHTML = "";
        return true;
    };

    const sendResetPassword = async () => {
        if (confirmForm()) {
            const response = await fetch(`${apiUrl}/users/resetPassword`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    key: getUrlKey(),
                    password,
                    confirmPassword
                })
            });
            if (response.status === 200) {
                setStatusDivStatus("positive");
                statusDiv.current.innerHTML =
                    "Sucess, your password has been reset.";
            } else if (response.status === 400) {
                setStatusDivStatus("negative");
                statusDiv.current.innerHTML = "Looks like your key expired.";
            } else {
                setStatusDivStatus("negative");
                statusDiv.current.innerHTML =
                    "Oops, looks like something went wrong.";
            }
        }
    };

    return (
        <FormWrapper>
            <form
                onSubmit={() => {
                    sendResetPassword();
                }}
            >
                <label>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                </label>
                <label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={e => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                </label>
                <StatusDivWrapper>
                    <StatusDiv
                        status={statusDivStatus}
                        ref={statusDiv}
                    ></StatusDiv>
                </StatusDivWrapper>

                <input type="submit" value="Submit" />
            </form>
        </FormWrapper>
    );
};

const ForgotPassword = () => {
    const [resetEmail, setResetEmail] = useState("");
    const [statusDivStatus, setStatusDivStatus] = useState<
        "positive" | "negative"
    >("negative");

    const statusDiv = useRef(null);

    const confirmForm = (): boolean => {
        const regexEmail = new RegExp( // eslint-disable-next-line no-useless-escape
            /[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        );

        statusDiv.current.innerHTML = "";
        if (resetEmail === "") {
            setStatusDivStatus("negative");
            statusDiv.current.innerHTML = "Please fill out all the boxes.";
            return false;
        } else if (!regexEmail.test(resetEmail)) {
            setStatusDivStatus("negative");
            statusDiv.current.innerHTML = "Please enter a valid email adress.";
            return false;
        }

        statusDiv.current.innerHTML = "";
        return true;
    };

    const sendResetEmail = async () => {
        if (confirmForm()) {
            const response = await fetch(
                `${apiUrl}/users/requestForgotPassword`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: resetEmail
                    })
                }
            );
            if (response.status === 200) {
                setStatusDivStatus("positive");
                statusDiv.current.innerHTML =
                    "Sucess, an email has been sent to your email adress.";
            } else if (response.status === 400) {
                setStatusDivStatus("negative");
                statusDiv.current.innerHTML =
                    "The provided email does not have an account.";
            } else {
                setStatusDivStatus("negative");
                statusDiv.current.innerHTML =
                    "Oops, looks like something went wrong.";
            }
        }
    };

    return (
        <FormWrapper>
            <form
                onSubmit={() => {
                    sendResetEmail();
                }}
            >
                <label>
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={e => {
                            setResetEmail(e.target.value);
                        }}
                    />
                </label>
                <StatusDivWrapper>
                    <StatusDiv
                        status={statusDivStatus}
                        ref={statusDiv}
                    ></StatusDiv>
                </StatusDivWrapper>

                <input type="submit" value="Submit" />
            </form>
        </FormWrapper>
    );
};

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
            statusDiv.current.innerHTML = "Invalid email or password.";
        } else {
            statusDiv.current.innerHTML =
                "Oops, looks like something went wrong.";
        }
    };

    return (
        <>
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
                        <StatusDiv
                            ref={statusDiv}
                            status="negative"
                        ></StatusDiv>
                    </StatusDivWrapper>

                    <input type="submit" value="Login" />
                </form>
            </FormWrapper>
            <ForgotPasswordLink>
                <Link to="/loginregister/forgotpassword">
                    Forgot password? Click here
                </Link>
            </ForgotPasswordLink>
        </>
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
        } else if (registerName.length < 2 && registerName.length > 32) {
            statusDiv.current.innerHTML =
                "Username must be between 2 and 32 characters long.";
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
                    method: "PATCH",
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
                    <StatusDiv ref={statusDiv} status="negative"></StatusDiv>
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
                                <Route
                                    exact
                                    path="/loginregister/forgotpassword"
                                >
                                    <Link to="/loginregister/register">
                                        Register
                                    </Link>
                                </Route>
                                <Route exact path="/loginregister/invalidKey">
                                    <Link to="/loginregister/forgotpassword">
                                        Back
                                    </Link>
                                </Route>
                                <Route
                                    exact
                                    path="/loginregister/resetPassword/:key"
                                >
                                    <Link to="/loginregister/login">Login</Link>
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
                    <Route exact path="/loginregister/forgotpassword">
                        <ForgotPassword></ForgotPassword>
                    </Route>
                    <Route exact path="/loginregister/invalidkey">
                        <LinkExpired></LinkExpired>
                    </Route>
                    <Route exact path="/loginregister/resetPassword/:key">
                        <ResetPassword></ResetPassword>
                    </Route>
                </Switch>
            </LoginBox>
        </Wrapper>
    );
};
