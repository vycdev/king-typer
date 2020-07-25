import React, { useEffect, useState, useRef } from "react";

import { apiUrl } from "../../utils/constants";

import { User, AllUser, Text, Achievement } from "./helpers/interfaces";
import {
    NotAdmin,
    Wrapper,
    DashBoardHeader,
    Title,
    Name,
    Pannel,
    PannelTitle,
    ListItemWrapper,
    ItemSettings,
    ItemSettingsWrapper,
    XButton,
    StatusDiv,
    StatusDivWrapper,
    Table,
    Button
} from "./style";

const InvalidUserData: User = {
    id: 0,
    role: "unverified",
    name: "invalidUser",
    email: "",
    achievements: [],
    tutorials: [],
    totaltests: 0,
    country: "RO",
    exp: 0
};
const InvalidTextData: Text = {
    id: 0,
    author: 0,
    difficulty: 0,
    ordered: false,
    text: "",
    title: "",
    tutorial: false,
    requirements: {
        acc: 0,
        wpm: 0
    }
};
const InvalidAchievement: Achievement = {
    description: "",
    difficulty: 0,
    id: 0,
    name: "",
    requirements: {
        wpm: 0,
        acc: 0
    }
};

const getUserId = async () => {
    const result = await (
        await fetch(`${apiUrl}/auth/isloggedin`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
    ).json();
    if (result.islogged === false) {
        return "0";
    }
    return result.userid;
};

const getUserData = async (id: string): Promise<User> => {
    if (id === "0") return InvalidUserData;
    const userData = await fetch(`${apiUrl}/users/userData/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return userData.json();
};

const getAllUsers = async (): Promise<Array<AllUser>> => {
    const userData = await fetch(`${apiUrl}/users`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return userData.json();
};

const getAllTexts = async (): Promise<Array<Text>> => {
    const texts = await fetch(`${apiUrl}/texts/getAllTexts`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return texts.json();
};
const getAllAchievements = async (): Promise<Array<Achievement>> => {
    const achievements = await fetch(`${apiUrl}/achievements`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return achievements.json();
};

const UpdateUserData = async (data: AllUser) => {
    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        exp,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tutorials,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        country,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        totaltests,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        achievements,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        emailKey,
        ...deconstructed
    } = data;

    for (const property in deconstructed) {
        await fetch(`${apiUrl}/users/editUser`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                property: property,
                newValue: deconstructed[property]
            })
        });
    }
};

const UpdateTextData = async (data: Text) => {
    const { id, ...deconstructed } = data;

    for (const property in deconstructed) {
        await fetch(`${apiUrl}/texts/editText`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                property: property,
                newValue: deconstructed[property]
            })
        });
    }
};

const UpdateAchievementData = async (data: Achievement) => {
    const { id, ...rest } = data;

    await fetch(`${apiUrl}/achievements/editAchievement`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            details: rest
        })
    });
};

const DeleteUser = async (data: AllUser) => {
    await fetch(`${apiUrl}/users/deleteUser`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: data.id })
    });
};

const DeleteText = async (data: Text) => {
    await fetch(`${apiUrl}/texts/deleteText`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: data.id })
    });
};

const DeleteAchievement = async (data: Achievement) => {
    await fetch(`${apiUrl}/achievements/deleteAchievement`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: data.id })
    });
};
// title, text, difficulty, ordered, tutorial
const PostNewText = async (data: Text) => {
    await fetch(`${apiUrl}/texts/addText`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: data.title,
            text: data.text,
            difficulty: data.difficulty,
            ordered: data.ordered,
            tutorial: data.tutorial,
            requirements: data.requirements
        })
    });
};

const PostNewAchievement = async (data: Achievement) => {
    await fetch(`${apiUrl}/achievements/addAchievement`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: data.name,
            description: data.description,
            difficulty: data.difficulty,
            requirements: data.requirements
        })
    });
};

const AchievementItemSettings = (props: {
    hidden: boolean;
    data: Achievement;
}) => {
    const [propsHidden, setPropsHidden] = useState(props.hidden);
    const [isHidden, setIsHidden] = useState(props.hidden);
    const [data, setData] = useState<Achievement>(InvalidAchievement);
    const [statusDivStatus, setStatusDivStatus] = useState<
        "positive" | "negative"
    >("negative");

    const statusDiv = useRef(null);

    const verifyForm = (): boolean => {
        if (
            isNaN(data.difficulty) ||
            isNaN(data.requirements.acc) ||
            isNaN(data.requirements.wpm)
        ) {
            statusDiv.current.innerHTML =
                "OOPS looks like you did something wrong!";
            setStatusDivStatus("negative");
            return false;
        }
        if (
            data.description.length <= 5 ||
            data.description.length >= 255 ||
            data.name.length < 3
        ) {
            statusDiv.current.innerHTML =
                "OOPS looks like you did something wrong!";
            setStatusDivStatus("negative");
            return false;
        } else {
            statusDiv.current.innerHTML = "Success!";
            setStatusDivStatus("positive");

            return true;
        }
    };

    useEffect(() => {
        setIsHidden(propsHidden);
        setPropsHidden(false);
        setData(props.data);
        statusDiv.current.innerHTML = "";
    }, [props.hidden]);
    return (
        <ItemSettingsWrapper hidden={isHidden}>
            <ItemSettings>
                <XButton
                    onClick={() => {
                        setIsHidden(true);
                    }}
                >
                    &#10006;
                </XButton>
                <form>
                    <label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={data.name ? data.name : ""}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { name, ...rest } = data;
                                const newData = {
                                    name: e.target.value,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />
                    </label>
                    <label>
                        <textarea
                            rows={7}
                            placeholder="Description"
                            value={data.description}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { description, ...rest } = data;
                                const newData = {
                                    description: e.target.value,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="Accuracy"
                            value={
                                !data.requirements
                                    ? 0
                                    : isNaN(data.requirements.acc)
                                    ? ""
                                    : data.requirements.acc
                            }
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { requirements, ...rest } = data;
                                if (requirements) {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    const { acc, wpm } = requirements;
                                    const newData = {
                                        requirements: {
                                            acc: parseInt(e.target.value),
                                            wpm
                                        },
                                        ...rest
                                    };
                                    setData(newData);
                                }
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="WPM"
                            value={
                                !data.requirements
                                    ? 0
                                    : isNaN(data.requirements.wpm)
                                    ? ""
                                    : data.requirements.wpm
                            }
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { requirements, ...rest } = data;

                                if (requirements) {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    const { acc, wpm } = requirements;
                                    const newData = {
                                        requirements: {
                                            wpm: parseInt(e.target.value),
                                            acc
                                        },
                                        ...rest
                                    };
                                    setData(newData);
                                }
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="Difficulty"
                            value={
                                isNaN(data.difficulty) ? "" : data.difficulty
                            }
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { difficulty, ...rest } = data;
                                const newData = {
                                    difficulty: parseInt(e.target.value),
                                    ...rest
                                };

                                setData(newData);
                            }}
                        />
                    </label>
                    <StatusDivWrapper>
                        <StatusDiv
                            ref={statusDiv}
                            status={statusDivStatus}
                        ></StatusDiv>
                    </StatusDivWrapper>
                    <button
                        onClick={() => {
                            DeleteAchievement(data);
                            location.reload();
                            setIsHidden(true);
                        }}
                    >
                        Delete Text
                    </button>
                    <button
                        onClick={() => {
                            if (verifyForm()) {
                                UpdateAchievementData(data);
                                location.reload();
                            }
                        }}
                    >
                        Submit
                    </button>
                </form>
            </ItemSettings>
        </ItemSettingsWrapper>
    );
};

// Text stuff

const TextItemSettings = (props: { hidden: boolean; data: Text }) => {
    const [propsHidden, setPropsHidden] = useState(props.hidden);
    const [isHidden, setIsHidden] = useState(props.hidden);
    const [data, setData] = useState<Text>(InvalidTextData);
    const [statusDivStatus, setStatusDivStatus] = useState<
        "positive" | "negative"
    >("negative");

    const statusDiv = useRef(null);

    const verifyForm = (): boolean => {
        if (isNaN(data.difficulty) || isNaN(data.author)) {
            statusDiv.current.innerHTML =
                "OOPS looks like you did something wrong!";
            setStatusDivStatus("negative");
            return false;
        }
        if (
            data.title.length <= 5 ||
            data.text.length <= 100 ||
            data.text.length >= 1000 ||
            (!data.ordered && data.tutorial) ||
            data.author === 0 ||
            data.difficulty < 1 ||
            data.difficulty > 5
        ) {
            statusDiv.current.innerHTML =
                "OOPS looks like you did something wrong!";
            setStatusDivStatus("negative");
            return false;
        } else {
            statusDiv.current.innerHTML = "Success!";
            setStatusDivStatus("positive");

            return true;
        }
    };

    useEffect(() => {
        setIsHidden(propsHidden);
        setPropsHidden(false);
        setData(props.data);
        statusDiv.current.innerHTML = "";
    }, [props.hidden]);
    return (
        <ItemSettingsWrapper hidden={isHidden}>
            <ItemSettings>
                <XButton
                    onClick={() => {
                        setIsHidden(true);
                    }}
                >
                    &#10006;
                </XButton>
                <form>
                    <label>
                        <input
                            type="text"
                            placeholder="Title"
                            value={data.title}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { title, ...rest } = data;
                                const newData = {
                                    title: e.target.value,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="Author"
                            value={isNaN(data.author) ? "" : data.author}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { author, ...rest } = data;
                                const newData = {
                                    author: parseInt(e.target.value),
                                    ...rest
                                };

                                setData(newData);
                            }}
                        />
                    </label>
                    <label>
                        <textarea
                            rows={7}
                            placeholder="Text"
                            value={data.text}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { text, ...rest } = data;
                                const newData = {
                                    text: e.target.value,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={data.ordered}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { ordered, ...rest } = data;
                                const newData = {
                                    ordered: e.target.checked,
                                    ...rest
                                };

                                setData(newData);
                            }}
                        />{" "}
                        Ordered
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={data.tutorial}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { tutorial, ...rest } = data;
                                const newData = {
                                    tutorial: e.target.checked,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />{" "}
                        Tutorial
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="Accuracy"
                            value={
                                !data.requirements
                                    ? 0
                                    : isNaN(data.requirements.acc)
                                    ? ""
                                    : data.requirements.acc
                            }
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { requirements, ...rest } = data;
                                if (requirements) {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    const { acc, wpm } = requirements;
                                    const newData = {
                                        requirements: {
                                            acc: parseInt(e.target.value),
                                            wpm
                                        },
                                        ...rest
                                    };
                                    setData(newData);
                                }
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="WPM"
                            value={
                                !data.requirements
                                    ? 0
                                    : isNaN(data.requirements.wpm)
                                    ? ""
                                    : data.requirements.wpm
                            }
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { requirements, ...rest } = data;

                                if (requirements) {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    const { acc, wpm } = requirements;
                                    const newData = {
                                        requirements: {
                                            wpm: parseInt(e.target.value),
                                            acc
                                        },
                                        ...rest
                                    };
                                    setData(newData);
                                }
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="Difficulty"
                            value={
                                isNaN(data.difficulty) ? "" : data.difficulty
                            }
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { difficulty, ...rest } = data;
                                const newData = {
                                    difficulty: parseInt(e.target.value),
                                    ...rest
                                };

                                setData(newData);
                            }}
                        />
                    </label>
                    <StatusDivWrapper>
                        <StatusDiv
                            ref={statusDiv}
                            status={statusDivStatus}
                        ></StatusDiv>
                    </StatusDivWrapper>
                    <button
                        onClick={() => {
                            DeleteText(data);
                            location.reload();
                            setIsHidden(true);
                        }}
                    >
                        Delete Text
                    </button>
                    <button
                        onClick={() => {
                            if (verifyForm()) {
                                UpdateTextData(data);
                                location.reload();
                            }
                        }}
                    >
                        Submit
                    </button>
                </form>
            </ItemSettings>
        </ItemSettingsWrapper>
    );
};

const AddNewAchievement = (props: { hidden: boolean }) => {
    const [propsHidden, setPropsHidden] = useState(props.hidden);
    const [isHidden, setIsHidden] = useState(props.hidden);
    const [data, setData] = useState<Achievement>(InvalidAchievement);
    const [statusDivStatus, setStatusDivStatus] = useState<
        "positive" | "negative"
    >("negative");

    const statusDiv = useRef(null);

    const verifyForm = (): boolean => {
        if (
            isNaN(data.difficulty) ||
            isNaN(data.requirements.acc) ||
            isNaN(data.requirements.wpm)
        ) {
            statusDiv.current.innerHTML =
                "OOPS looks like you did something wrong!";
            setStatusDivStatus("negative");
            return false;
        }
        if (
            data.description.length <= 5 ||
            data.description.length >= 255 ||
            data.name.length < 3
        ) {
            statusDiv.current.innerHTML =
                "OOPS looks like you did something wrong!";
            setStatusDivStatus("negative");
            return false;
        } else {
            statusDiv.current.innerHTML = "Success!";
            setStatusDivStatus("positive");

            return true;
        }
    };

    useEffect(() => {
        setIsHidden(propsHidden);
        setPropsHidden(false);
        statusDiv.current.innerHTML = "";
    }, [props.hidden]);
    return (
        <ItemSettingsWrapper hidden={isHidden}>
            <ItemSettings>
                <XButton
                    onClick={() => {
                        setIsHidden(true);
                    }}
                >
                    &#10006;
                </XButton>
                <form>
                    <label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={data.name}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { name, ...rest } = data;
                                const newData = {
                                    name: e.target.value,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />
                    </label>
                    <label>
                        <textarea
                            rows={7}
                            placeholder="Description"
                            value={data.description}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { description, ...rest } = data;
                                const newData = {
                                    description: e.target.value,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="Accuracy"
                            value={
                                !data.requirements
                                    ? 0
                                    : isNaN(data.requirements.acc)
                                    ? ""
                                    : data.requirements.acc
                            }
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { requirements, ...rest } = data;
                                if (requirements) {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    const { acc, wpm } = requirements;
                                    const newData = {
                                        requirements: {
                                            acc: parseInt(e.target.value),
                                            wpm
                                        },
                                        ...rest
                                    };
                                    setData(newData);
                                }
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="WPM"
                            value={
                                !data.requirements
                                    ? 0
                                    : isNaN(data.requirements.wpm)
                                    ? ""
                                    : data.requirements.wpm
                            }
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { requirements, ...rest } = data;

                                if (requirements) {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    const { acc, wpm } = requirements;
                                    const newData = {
                                        requirements: {
                                            wpm: parseInt(e.target.value),
                                            acc
                                        },
                                        ...rest
                                    };
                                    setData(newData);
                                }
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="Difficulty"
                            value={
                                isNaN(data.difficulty) ? "" : data.difficulty
                            }
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { difficulty, ...rest } = data;
                                const newData = {
                                    difficulty: parseInt(e.target.value),
                                    ...rest
                                };

                                setData(newData);
                            }}
                        />
                    </label>
                    <StatusDivWrapper>
                        <StatusDiv
                            ref={statusDiv}
                            status={statusDivStatus}
                        ></StatusDiv>
                    </StatusDivWrapper>
                    <button
                        onClick={() => {
                            if (verifyForm()) {
                                PostNewAchievement(data);
                                location.reload();
                            }
                        }}
                    >
                        Submit
                    </button>
                </form>
            </ItemSettings>
        </ItemSettingsWrapper>
    );
};

const AddNewText = (props: { hidden: boolean }) => {
    const [propsHidden, setPropsHidden] = useState(props.hidden);
    const [isHidden, setIsHidden] = useState(props.hidden);
    const [data, setData] = useState<Text>(InvalidTextData);
    const [statusDivStatus, setStatusDivStatus] = useState<
        "positive" | "negative"
    >("negative");

    const statusDiv = useRef(null);

    const verifyForm = (): boolean => {
        if (isNaN(data.difficulty)) {
            statusDiv.current.innerHTML =
                "OOPS looks like you did something wrong!";
            setStatusDivStatus("negative");
            return false;
        }
        if (
            data.title.length <= 5 ||
            data.text.length <= 100 ||
            data.text.length >= 1000 ||
            (!data.ordered && data.tutorial) ||
            data.difficulty < 1 ||
            data.difficulty > 5
        ) {
            statusDiv.current.innerHTML =
                "OOPS looks like you did something wrong!";
            setStatusDivStatus("negative");
            return false;
        } else {
            statusDiv.current.innerHTML = "Success!";
            setStatusDivStatus("positive");

            return true;
        }
    };

    useEffect(() => {
        setIsHidden(propsHidden);
        setPropsHidden(false);
        statusDiv.current.innerHTML = "";
    }, [props.hidden]);
    return (
        <ItemSettingsWrapper hidden={isHidden}>
            <ItemSettings>
                <XButton
                    onClick={() => {
                        setIsHidden(true);
                    }}
                >
                    &#10006;
                </XButton>
                <form>
                    <label>
                        <input
                            type="text"
                            placeholder="Title"
                            value={data.title}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { title, ...rest } = data;
                                const newData = {
                                    title: e.target.value,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />
                    </label>
                    <label>
                        <textarea
                            rows={7}
                            placeholder="Text"
                            value={data.text}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { text, ...rest } = data;
                                const newData = {
                                    text: e.target.value,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={data.ordered}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { ordered, ...rest } = data;
                                const newData = {
                                    ordered: e.target.checked,
                                    ...rest
                                };

                                setData(newData);
                            }}
                        />{" "}
                        Ordered
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={data.tutorial}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { tutorial, ...rest } = data;
                                const newData = {
                                    tutorial: e.target.checked,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />{" "}
                        Tutorial
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="Accuracy"
                            value={
                                !data.requirements
                                    ? 0
                                    : isNaN(data.requirements.acc)
                                    ? ""
                                    : data.requirements.acc
                            }
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { requirements, ...rest } = data;
                                if (requirements) {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    const { acc, wpm } = requirements;
                                    const newData = {
                                        requirements: {
                                            acc: parseInt(e.target.value),
                                            wpm
                                        },
                                        ...rest
                                    };
                                    setData(newData);
                                }
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="WPM"
                            value={
                                !data.requirements
                                    ? 0
                                    : isNaN(data.requirements.wpm)
                                    ? ""
                                    : data.requirements.wpm
                            }
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { requirements, ...rest } = data;

                                if (requirements) {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    const { acc, wpm } = requirements;
                                    const newData = {
                                        requirements: {
                                            wpm: parseInt(e.target.value),
                                            acc
                                        },
                                        ...rest
                                    };
                                    setData(newData);
                                }
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="Difficulty"
                            value={
                                isNaN(data.difficulty) ? "" : data.difficulty
                            }
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { difficulty, ...rest } = data;
                                const newData = {
                                    difficulty: parseInt(e.target.value),
                                    ...rest
                                };

                                setData(newData);
                            }}
                        />
                    </label>
                    <StatusDivWrapper>
                        <StatusDiv
                            ref={statusDiv}
                            status={statusDivStatus}
                        ></StatusDiv>
                    </StatusDivWrapper>
                    <button
                        onClick={() => {
                            if (verifyForm()) {
                                PostNewText(data);
                                location.reload();
                            }
                        }}
                    >
                        Submit
                    </button>
                </form>
            </ItemSettings>
        </ItemSettingsWrapper>
    );
};

const UserItemSettings = (props: { hidden: boolean; data: AllUser }) => {
    const [propsHidden, setPropsHidden] = useState(props.hidden);
    const [isHidden, setIsHidden] = useState(props.hidden);
    const [data, setData] = useState<AllUser>(InvalidUserData);
    const [statusDivStatus, setStatusDivStatus] = useState<
        "positive" | "negative"
    >("negative");

    const statusDiv = useRef(null);

    const verifyForm = (): boolean => {
        if (
            data.description === null ||
            data.name === "" ||
            data.description === "" ||
            data.email === "" ||
            (data.role != "admin" &&
                data.role != "member" &&
                data.role != "unverified") ||
            data.description.length > 250 ||
            data.name.length <= 3 ||
            data.email.length <= 10
        ) {
            statusDiv.current.innerHTML =
                "OOPS looks like you did something wrong!";
            setStatusDivStatus("negative");
            return false;
        } else {
            statusDiv.current.innerHTML = "Success!";
            setStatusDivStatus("positive");

            return true;
        }
    };

    useEffect(() => {
        setIsHidden(propsHidden);
        setPropsHidden(false);
        setData(props.data);
        statusDiv.current.innerHTML = "";
    }, [props.hidden]);
    return (
        <ItemSettingsWrapper hidden={isHidden}>
            <ItemSettings>
                <XButton
                    onClick={() => {
                        setIsHidden(true);
                    }}
                >
                    &#10006;
                </XButton>
                <form>
                    <label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={data.name}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { name, ...rest } = data;
                                const newData = {
                                    name: e.target.value,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder="Email"
                            value={data.email}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { email, ...rest } = data;
                                const newData = {
                                    email: e.target.value,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />
                    </label>
                    <label>
                        <input
                            list="roles"
                            placeholder="Role"
                            value={data.role}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { role, ...rest } = data;
                                const newData = {
                                    role: e.target.value as
                                        | "admin"
                                        | "member"
                                        | "unverified",
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />
                    </label>
                    <datalist id="roles">
                        <option value="admin"></option>
                        <option value="member"></option>
                        <option value="unverified"></option>
                    </datalist>
                    <label>
                        <textarea
                            rows={10}
                            placeholder="User Description."
                            value={data.description || ""}
                            onChange={e => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { description, ...rest } = data;
                                const newData = {
                                    description: e.target.value,
                                    ...rest
                                };
                                setData(newData);
                            }}
                        />
                    </label>
                    <StatusDivWrapper>
                        <StatusDiv
                            ref={statusDiv}
                            status={statusDivStatus}
                        ></StatusDiv>
                    </StatusDivWrapper>
                    <button
                        onClick={() => {
                            DeleteUser(data);
                            location.reload();
                            setIsHidden(true);
                        }}
                    >
                        Delete Account
                    </button>
                    <button
                        onClick={() => {
                            if (verifyForm()) {
                                UpdateUserData(data);
                                location.reload();
                            }
                        }}
                    >
                        Submit
                    </button>
                </form>
            </ItemSettings>
        </ItemSettingsWrapper>
    );
};

export const Dashboard = () => {
    const [loggedInUserData, setLoggedInUserData] = useState<User>(
        InvalidUserData
    );

    // For users pannel
    const [allUsersList, setAllUsersList] = useState<JSX.Element>(
        <ListItemWrapper key="usersloading"></ListItemWrapper>
    );
    const [getsUserUpdate, setGetsUserUpdate] = useState(-1);
    const [editedUser, setEditedUser] = useState<AllUser>(InvalidUserData);
    const [isBeingEditedUser, setIsBeingEditedUser] = useState(false);

    // For texts pannel
    const [allTextsList, setAllTextsList] = useState<JSX.Element>(
        <ListItemWrapper key="textsloading"></ListItemWrapper>
    );
    const [getsTextUpdate, setGetsTextUpdate] = useState(-1);
    const [editedText, setEditedText] = useState<Text>(InvalidTextData);
    const [isBeingEditedText, setIsBeingEditedText] = useState(false);
    const [addNewText, setAddNewText] = useState(false);

    // For achievements pannel
    const [allAchievementsList, setAllAchievementsList] = useState<JSX.Element>(
        <ListItemWrapper key="textsloading"></ListItemWrapper>
    );
    const [getsAchievementUpdate, setGetsAchievementUpdate] = useState(-1);
    const [editedAchievement, setEditedAchievement] = useState<Achievement>(
        InvalidAchievement
    );
    const [isBeingEditedAchievement, setIsBeingEditedAchievement] = useState(
        false
    );
    const [addNewAchievement, setAddNewAchievement] = useState(false);

    const generateUsersList = async (
        users: Array<AllUser>
    ): Promise<JSX.Element> => {
        const List = users.map((value, index) => {
            return (
                <ListItemWrapper
                    key={index + "user" + value.id}
                    onClick={() => {
                        setEditedUser(value);
                        setGetsUserUpdate(index + Math.random());
                    }}
                >
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>{value.role}</td>
                    <td>{value.email}</td>
                    <td>{value.exp}</td>
                </ListItemWrapper>
            );
        });
        return (
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Experience</th>
                    </tr>
                </thead>
                <tbody>{List}</tbody>
            </Table>
        );
    };

    const generateTextsList = async (
        texts: Array<Text>
    ): Promise<JSX.Element> => {
        const List = texts.map((value, index) => {
            return (
                <ListItemWrapper
                    key={index + "text" + value.id}
                    onClick={() => {
                        setEditedText(value);
                        setGetsTextUpdate(index + Math.random());
                    }}
                >
                    <td>{value.id}</td>
                    <td>{value.title}</td>
                    <td>{value.ordered.toString()}</td>
                    <td>{value.tutorial.toString()}</td>
                    <td>{value.difficulty}</td>
                </ListItemWrapper>
            );
        });
        return (
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Ordered</th>
                        <th>Tutorial</th>
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>{List}</tbody>
            </Table>
        );
    };

    const generateAcheivementsList = async (
        achievements: Array<Achievement>
    ): Promise<JSX.Element> => {
        const List = achievements.map((value, index) => {
            return (
                <ListItemWrapper
                    key={index + "achievement" + value.id}
                    onClick={() => {
                        setEditedAchievement(value);
                        setGetsAchievementUpdate(index + Math.random());
                    }}
                >
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>{value.description}</td>
                    <td>{value.requirements.wpm}</td>
                    <td>{value.requirements.acc}</td>
                    <td>{value.difficulty}</td>
                </ListItemWrapper>
            );
        });
        return (
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Required WPM</th>
                        <th>Required Accuracy</th>
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>{List}</tbody>
            </Table>
        );
    };

    const updateUserData = async () => {
        const userId = await getUserId();
        setLoggedInUserData(await getUserData(userId));
    };

    const updateAllUsers = async () => {
        const users = await getAllUsers();
        setAllUsersList(await generateUsersList(users));
    };
    const updateAllTexts = async () => {
        const texts = await getAllTexts();
        setAllTextsList(await generateTextsList(texts));
    };
    const updateAllAchievements = async () => {
        const achievements = await getAllAchievements();
        setAllAchievementsList(await generateAcheivementsList(achievements));
    };

    useEffect(() => {
        updateUserData();
        updateAllUsers();
        updateAllTexts();
        updateAllAchievements();
    }, []);

    useEffect(() => {
        setIsBeingEditedUser(!isBeingEditedUser);
    }, [getsUserUpdate]);

    useEffect(() => {
        setIsBeingEditedText(!isBeingEditedText);
    }, [getsTextUpdate]);

    useEffect(() => {
        setIsBeingEditedAchievement(!isBeingEditedAchievement);
    }, [getsAchievementUpdate]);

    return (
        <Wrapper>
            {loggedInUserData.role === "admin" ? (
                <>
                    <UserItemSettings
                        hidden={isBeingEditedUser}
                        data={editedUser}
                    ></UserItemSettings>
                    <TextItemSettings
                        hidden={isBeingEditedText}
                        data={editedText}
                    ></TextItemSettings>
                    <AddNewText hidden={!addNewText}></AddNewText>
                    <AchievementItemSettings
                        hidden={isBeingEditedAchievement}
                        data={editedAchievement}
                    ></AchievementItemSettings>
                    <AddNewAchievement
                        hidden={!addNewAchievement}
                    ></AddNewAchievement>
                    <DashBoardHeader>
                        <Name>Logged in as {loggedInUserData.name}</Name>
                        <Title>Dashboard</Title>
                    </DashBoardHeader>
                    <Pannel>
                        <PannelTitle>Users</PannelTitle>
                        {allUsersList}
                    </Pannel>
                    <Pannel>
                        <PannelTitle>Texts</PannelTitle>
                        {allTextsList}
                        <Button
                            onClick={() => {
                                setAddNewText(!addNewText);
                            }}
                        >
                            Add New Text
                        </Button>
                    </Pannel>
                    <Pannel>
                        <PannelTitle>Achievements</PannelTitle>
                        {allAchievementsList}
                        <Button
                            onClick={() => {
                                setAddNewAchievement(!addNewAchievement);
                            }}
                        >
                            Add New Achievement
                        </Button>
                    </Pannel>
                </>
            ) : (
                <NotAdmin>
                    You need to be logged in as an admin to be able to access
                    this page.
                </NotAdmin>
            )}
        </Wrapper>
    );
};
