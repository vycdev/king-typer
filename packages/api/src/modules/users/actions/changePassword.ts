import knex from "../../../../db/knex";
import User from "../types/User";
import bcrypt from "bcrypt";

export default async (id: number, oldPassword: string, newPassword: string) => {
    const user = await knex<User>("users")
        .where({ id })
        .first();
    if (!user) {
        return "No user exists";
    }
    const passMatches = await bcrypt.compare(oldPassword, user.password);
    if (!passMatches) {
        return "Password does not match";
    }
    const newEncrypted = await bcrypt.hash(newPassword, 12);
    await knex<User>("users")
        .update({ password: newEncrypted })
        .where({ id });
};
