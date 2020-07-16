import React, { useRef, useState, useEffect } from "react";

import { apiUrl } from "../../../../utils/constants";

import {
    FormWrapper,
    StatusDiv,
    StatusDivWrapper,
    XButton,
    Wrapper
} from "./style";

interface ComponentProps {
    hidden: boolean;
}

export const ChangePassword = props => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isHidden, setIsHidden] = useState(props.hidden);
    const [propsHidden, setPropsHidden] = useState(props.hidden);
    const [statusDivStatus, setStatusDivStatus] = useState<
        "positive" | "negative"
    >("negative");

    useEffect(() => {
        setIsHidden(propsHidden);
        setPropsHidden(false);
    }, [props.hidden]);

    const statusDiv = useRef(null);

    const validateForm = () => {
        const regexPassword = new RegExp(
            /^((?=.*[a-z])(?=.*[A-Z\d])(?=.*[a-zA-Z]).{8,})$/
        );

        if (
            newPassword === "" ||
            confirmPassword === "" ||
            oldPassword === ""
        ) {
            setStatusDivStatus("negative");
            statusDiv.current.innerHTML = "Fields cannot be empty.";

            return false;
        } else if (newPassword === oldPassword) {
            setStatusDivStatus("negative");
            statusDiv.current.innerHTML =
                "Old password and new password are the same.";

            return false;
        } else if (!regexPassword.test(newPassword)) {
            setStatusDivStatus("negative");
            statusDiv.current.innerHTML =
                "Password must at least 8 characters long and have at least 1 lowercase letter, 1 uppercase letter and 1 number.";
            return false;
        } else if (newPassword != confirmPassword) {
            setStatusDivStatus("negative");
            statusDiv.current.innerHTML = "Passwords do not match.";

            return false;
        } else {
            statusDiv.current.innerHTML = "";
            return true;
        }
    };

    const submitPassword = async () => {
        if (validateForm()) {
            const response = await fetch(`${apiUrl}/users/changePassword`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword
                })
            });

            if (response.status === 200) {
                setStatusDivStatus("positive");
                statusDiv.current.innerHTML = "Succesfully changed password.";
            } else if (response.status === 400) {
                setStatusDivStatus("negative");
                statusDiv.current.innerHTML =
                    "Your current password does not match with the password introduced.";
            } else {
                setStatusDivStatus("negative");
                statusDiv.current.innerHTML =
                    "Oops, looks like something went wrong.";
            }
        }
    };

    return (
        <Wrapper hidden={isHidden}>
            <FormWrapper>
                <XButton
                    onClick={() => {
                        setIsHidden(true);
                    }}
                >
                    &#10006;
                </XButton>
                <form
                    onSubmit={() => {
                        submitPassword();
                    }}
                >
                    <label>
                        <input
                            type="password"
                            placeholder="Old Password"
                            onChange={e => {
                                setOldPassword(e.target.value);
                            }}
                        />
                    </label>

                    <label>
                        <input
                            type="password"
                            placeholder="New Password"
                            onChange={e => {
                                setNewPassword(e.target.value);
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
                            ref={statusDiv}
                            status={statusDivStatus}
                        ></StatusDiv>
                    </StatusDivWrapper>
                    <input type="submit" value="Submit" />
                </form>
            </FormWrapper>
        </Wrapper>
    );
};
