import User from "../types/User";
import knex from "../../../../db/knex";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const genNewKey = () =>
    Array(16)
        .fill(0)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(_ =>
            Math.random()
                .toString(36)
                .charAt(2)
        )
        .join("");

const sendForgotEmail = async (email: string, id: number, key: string) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "kingtyper.noreply",
            pass: process.env.GMAIL_PASS
        }
    });
    const url = `${process.env.SERVER_URL}/api/users/forgotPassword/${key}`;
    await transporter.sendMail({
        from: '"King typer" <kingtyper.noreply@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Forgot password", // Subject line
        text: `Please click this link to reset your password.
                ${url}

                Not expecting this email?
                If you received this email by mistake or weren't expecting it, please disregard this email.`, // plain text body
        html: `<h2>Please click this link to reset your password.</h2>
                <a href="${url}">${url}</a>
                <br/><br/>
                <h3>Not expecting this email?</h3>
                <p>If you received this email by mistake or weren't expecting it, please disregard this.</p>` // html body
    });
};

export const forgotPassword = async (providedEmail: string) => {
    const user = await knex<User>("users")
        .where({ email: providedEmail })
        .first();

    if (!user) {
        return false;
    }

    const { email } = user;

    const key = genNewKey();
    const expiration = Date.now() + 3600000;

    await knex("forgottenpasswords").insert({ email, key, expiration });

    await sendForgotEmail(email, user.id, key);

    return true;
};

export const keyValid = async (key: string) => {
    const userWithKey = await knex("forgottenpasswords")
        .where({ key })
        .andWhere("expiration", ">", Date.now())
        .first();

    return !!userWithKey;
};

export const resetPassword = async (
    key: string,
    oldPassword: string,
    newPassword: string
) => {
    if (oldPassword !== newPassword) {
        return "The passwords provided do not match";
    }
    if (!(await keyValid(key))) {
        return "The key is no longer valid";
    }
    const { email } = await knex("forgottenpasswords")
        .where({ key })
        .first();

    const hashedPW = await bcrypt.hash(oldPassword, 12);

    await knex<User>("users")
        .update({ password: hashedPW })
        .where({ email });
};
