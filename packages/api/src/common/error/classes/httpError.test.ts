import { expect } from "chai";

import { HttpError } from "./httpError";

const error = new HttpError(400);

describe("HTTP Error Class", () => {
    it("Returns the string form", done => {
        expect(error.toString()).to.deep.equal(
            `HTTP Error: ${error.status} — ${error.reason}`
        );
        done();
    });
});
