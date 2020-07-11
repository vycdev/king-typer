import request from "supertest";
import { expect } from "chai";

import { server } from "../../index";
import users from "../../../db/seeds/examples/users";
import { createGame } from "./actions/createGame";
import knex from "../../../db/knex";
import Game from "./types/Game";
import { removeOldGame } from "./actions/removeOldGame";

const agent = request.agent(server);

const newGame = {
    userid: 1,
    wpm: 90,
    rawwpm: 100,
    accuracy: 90,
    seconds: 60
};

describe("Game routes", async () => {
    // We don't need to rerun migrations or seeds because we did in the auth route

    it("Creates a game", async function() {
        this.timeout(5000);
        const { email, password } = users[0];

        await agent.post(`/api/auth/login`).send({ email, password });

        const response = await agent
            .post(`/api/games/newGame/`)
            .send(newGame)
            .set("Accept", "application/text")
            .expect("Content-Type", /text/)
            .expect(201);

        expect(response.text).to.deep.equal("Successfully created a game!");
    });

    it("Deletes games past 10 games", async function() {
        this.timeout(5000);

        await createGame(5, 0, 0, 0);
        await createGame(5, 0, 0, 0);
        await createGame(5, 0, 0, 0);
        await createGame(5, 0, 0, 0);
        await createGame(5, 0, 0, 0);
        await createGame(5, 0, 0, 0);
        await createGame(5, 0, 0, 0);
        await createGame(5, 0, 0, 0);
        await createGame(5, 0, 0, 0);
        await createGame(5, 0, 0, 0);
        await createGame(5, 0, 0, 0);
        await createGame(5, 0, 0, 0);

        await Promise.all([
            removeOldGame(5),
            removeOldGame(5),
            removeOldGame(5)
        ]);

        const games = await knex<Game>("games").where({ userid: 5 });

        expect(games.length).to.equal(10);
    });

    it("Checks for achievements", async () => {
        await createGame(5, 32, 40, 80);

        const achievements = await agent.get("/api/users/achievements/5");

        console.log(achievements);

        expect(achievements.body).to.equal(2);
    });
});
