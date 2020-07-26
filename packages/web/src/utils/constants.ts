import { TypingBoxProps } from "../components/common/typingBox/helpers/interfaces";
import { config } from "dotenv";

config();

export type TypingBoxColorCodes = TypingBoxProps["colorCodes"];

export interface ThemeType {
    primary: string;
    secondary: string;
    tertiary: string;
    background: {
        primary: string;
        secondary: string;
    };
    text: {
        primary: string;
        secondary: string;
    };
    brightness: {
        lighter: number;
        darker: number;
    };
    status: {
        positive: string;
        negative: string;
    };
    boxColorCodes: TypingBoxColorCodes;
}

export const apiUrl =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8090/api"
        : "https://king-typer-api.herokuapp.com/api";

export const wsUrl =
    process.env.NODE_ENV === "development"
        ? "ws://localhost:8090"
        : "wss://king-typer-api.herokuapp.com";
