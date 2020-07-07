import React, { useEffect, useState, useRef } from "react";
import { Link, Route, Switch } from "react-router-dom";

import {
    BackgroundTriangle,
    Wrapper,
    LoginBox,
    LoginLogoBox,
    FixCrown,
    Title,
    FormWrapper,
    Button
} from "./style";
import { LogoSvg } from "../common/logo/logo";

const LoginForm = () => {
    return (
        <FormWrapper>
            <form
                onSubmit={() => {
                    alert("works fine");
                }}
            >
                <label>
                    <input type="text" placeholder="Username" />
                </label>
                <label>
                    <input type="password" placeholder="Password" />
                </label>
                <input type="submit" value="Login" />
            </form>
        </FormWrapper>
    );
};

const RegiserForm = () => {
    return (
        <FormWrapper>
            <form
                onSubmit={() => {
                    alert("works fine");
                }}
            >
                <label>
                    <input type="text" placeholder="Username" />
                </label>
                <label>
                    <input type="email" placeholder="Email" />
                </label>
                <label>
                    <input type="password" placeholder="Password" />
                </label>
                <label>
                    <input type="password" placeholder="Confirm Password" />
                </label>
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
