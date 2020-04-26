import koa from "koa";
import serve from "koa-static";

import path from "path";

const app = new koa();
const serverPath = path.resolve(__dirname);

const port = process.env.PORT || 8080;

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err;
        ctx.app.emit("error", err, ctx);
    }
});
app.on("error", (err, ctx) => {
    console.log(err);
});

app.use(serve(serverPath));

app.listen(port, () => {
    console.log(`Wep app started on port ${port}`);
});
