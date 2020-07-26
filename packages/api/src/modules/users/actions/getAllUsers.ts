import User from "../types/User";
import knex from "../../../../db/knex";

export default async () => {
    const users = await knex<User>("users");
    return users.map(l => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...data } = l;
        return data;
    });
};
