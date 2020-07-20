import { ThemeType } from "./constants";

const lightTheme: ThemeType = {
    primary: "#198cf6",
    secondary: "#fde400",
    tertiary: "#00a627",
    background: {
        primary: "#f7f7f7",
        secondary: "#111"
    },
    text: {
        primary: "#111",
        secondary: "#f7f7f7"
    },
    brightness: {
        lighter: 1.1,
        darker: 0.9
    },
    boxColorCodes: {
        wrong: "#f54242",
        correct: "#4290f5",
        notTyped: "#111"
    },
    status: {
        positive: "#0f4f00",
        negative: "#cc0000"
    }
};

const darkTheme: ThemeType = {
    primary: "#005299",
    secondary: "#ffb300",
    tertiary: "#00aaff",
    background: {
        primary: "#1D1D1D",
        secondary: "#ffb300"
    },
    text: {
        primary: "#f7f7f7",
        secondary: "#f7f7f7"
    },
    brightness: {
        lighter: 1.1,
        darker: 0.9
    },
    boxColorCodes: {
        wrong: "#f54242",
        correct: "#4290f5",
        notTyped: "#f7f7f7"
    },
    status: {
        positive: "#37ff0a",
        negative: "#ff5252"
    }
};

export const themes = {
    dark: darkTheme,
    light: lightTheme
};

export type themeName = keyof typeof themes;

export const defaultTheme: themeName = localStorage.getItem("theme") as
    | "dark"
    | "light";

export const getTheme = (
    theme: themeName = defaultTheme || "light"
): ThemeType => {
    return themes[theme];
};
