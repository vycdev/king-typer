/*
 *   Credits to Enitoni
 *   https://gitlab.com/enitoni
 *   https://github.com/Enitoni
 */

import { ValueOf } from "../../type/helpers/ValueOf";

const statusCodes = {
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    internalServerError: 500
} as const;

type HttpStatus = ValueOf<typeof statusCodes>;

const reasonToCodeMap: Record<HttpStatus, string> = {
    "400": "Bad Request",
    "401": "Unauthorized",
    "404": "Not Found",
    "500": "Internal Server Error"
};

export class HttpError extends Error {
    public reason: string;

    constructor(
        public status: HttpStatus,
        customReason?: string,
        public details?: object
    ) {
        super();

        this.reason = customReason || reasonToCodeMap[status];
    }

    public toString() {
        return `HTTP Error: ${this.status} — ${this.reason}`;
    }
}
