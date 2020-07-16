import nodemailer from "nodemailer";

export default async (location: string, url: string) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "kingtyper.noreply",
            pass: process.env.GMAIL_PASS
        }
    });
    await transporter.sendMail({
        from: '"King typer" <kingtyper.noreply@gmail.com>', // sender address
        to: location, // list of receivers
        subject: "Verification email", // Subject line
        text: `Thank you for signing up with King Typer!
        Please confirm that you are the owner of this account by clicking the link below:
        ${url}

        Not expecting this email?
        If you received this email by mistake or weren't expecting it, please disregard this email.`, // plain text body
        html: `<h2>Thank you for signing up with King Typer!</h2>
        <p>Please confirm that you are the owner of this account by clicking the link below:
            <a href="${url}">${url}</a>
        </p>
        <br/><br/>
        <h3>Not expecting this email?</h3>
        <p>If you received this email by mistake or weren't expecting it, please disregard this email.</p>` // html body
    });
};
