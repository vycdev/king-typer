import findUser from "../../users/actions/findUser";

export default async (userid: number) => {
    const user = await findUser("id", userid);
    if (!user) {
        return null;
    }
    return `${process.env.SERVER_URL}/api/email/verify/${userid}/${user.emailKey}`;
};
