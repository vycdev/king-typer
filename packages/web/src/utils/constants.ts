import { typingBoxProps } from "../components/common/typingBox/helpers/interfaces";

export type TypingBoxColorCodes = typingBoxProps["colorCodes"];

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
    boxColorCodes: TypingBoxColorCodes;
}
